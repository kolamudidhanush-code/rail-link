import express from 'express';
import cors from 'cors';
import Database from 'better-sqlite3';

const app = express();
const db = new Database('./server/rail-link.db');

app.use(cors());
app.use(express.json());

db.exec(`
  CREATE TABLE IF NOT EXISTS demo_bookings (
    pnr TEXT PRIMARY KEY,
    status TEXT NOT NULL DEFAULT 'CONFIRMED',
    booking_json TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  )
`);

app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'RAIL LINK backend is running!'
  });
});

app.get('/api/bookings', (req, res) => {
  const rows = db.prepare(
    'SELECT booking_json FROM demo_bookings ORDER BY created_at DESC'
  ).all();

  res.json(rows.map(row => JSON.parse(row.booking_json)));
});

app.post('/api/bookings', (req, res) => {
  const booking = req.body;

  if (!booking.pnr || !booking.passengers || !booking.seats) {
    return res.status(400).json({
      success: false,
      message: 'Booking information is incomplete.'
    });
  }

  try {
    const saved = { ...booking, status: 'CONFIRMED' };

    db.prepare(`
      INSERT INTO demo_bookings (pnr, status, booking_json)
      VALUES (?, ?, ?)
    `).run(saved.pnr, saved.status, JSON.stringify(saved));

    res.status(201).json({
      success: true,
      booking: saved
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: 'Could not save booking.'
    });
  }
});

app.patch('/api/bookings/:pnr/cancel', (req, res) => {
  const row = db.prepare(
    'SELECT booking_json FROM demo_bookings WHERE pnr = ?'
  ).get(req.params.pnr);

  if (!row) {
    return res.status(404).json({
      success: false,
      message: 'Booking not found.'
    });
  }

  const booking = JSON.parse(row.booking_json);

  booking.status = 'CANCELLED';
  booking.refund = Math.round(Number(booking.total || 0) * 0.8);

  db.prepare(`
    UPDATE demo_bookings
    SET status = ?, booking_json = ?
    WHERE pnr = ?
  `).run('CANCELLED', JSON.stringify(booking), req.params.pnr);

  res.json({
    success: true,
    booking
  });
});

app.listen(3000, () => {
  console.log('RAIL LINK backend running at http://localhost:3000');
});
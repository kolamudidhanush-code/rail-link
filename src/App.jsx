import React, { useEffect, useMemo, useState } from 'react';
import {
  Activity, ArrowLeft, ArrowRight, ArrowDownUp, Check, CheckCircle2, ChevronDown,
  Clock3, CreditCard, HeartPulse, LogIn, LogOut, Mail, Menu, Search, ShieldCheck,
  Ticket, TrainFront, UserRound, Wallet, Accessibility, Printer, AlertCircle, Sparkles,
  QrCode, MapPin, CalendarDays, CircleHelp, User, X, RefreshCw
} from 'lucide-react';

const STATIONS = [
  { code: 'MAS', name: 'Chennai Central', city: 'Chennai' },
  { code: 'SBC', name: 'KSR Bengaluru', city: 'Bengaluru' },
  { code: 'MYS', name: 'Mysuru Jn', city: 'Mysuru' },
  { code: 'HAS', name: 'Hassan Jn', city: 'Hassan' },
  { code: 'MAQ', name: 'Mangaluru Central', city: 'Mangaluru' },
  { code: 'MMCT', name: 'Mumbai Central', city: 'Mumbai' },
  { code: 'ADI', name: 'Ahmedabad Jn', city: 'Ahmedabad' },
  { code: 'CSMT', name: 'Chhatrapati Shivaji Maharaj Terminus', city: 'Mumbai' },
  { code: 'FZR', name: 'Firozpur Cantt', city: 'Firozpur' },
];
const CLASSES = [
  { code: 'SL', name: 'Sleeper', multiplier: 1.5 }, { code: '3A', name: 'AC 3 Tier', multiplier: 2.2 },
  { code: '2A', name: 'AC 2 Tier', multiplier: 3.1 }, { code: '1A', name: 'First AC', multiplier: 4.6 },
  { code: 'CC', name: 'Chair Car', multiplier: 1.6 }, { code: 'EC', name: 'Executive Chair Car', multiplier: 3.0 },
  { code: '2S', name: 'Second Sitting', multiplier: 0.8 },
];
const SAMPLE_TRAIN = {
  number: '12627', name: 'Karnataka Express', type: 'Superfast', stops: 5, distance: 620,
  depart: '06:00', arrive: '17:10', duration: '11h 10m', stations: ['MAS','SBC','MYS','HAS','MAQ'], baseFare: 372, capacity: 288,
};
const INITIAL_SEARCH = { from: 'MAS', to: 'HAS', date: '2026-11-03', passengers: 1, classCode: 'SL' };
const money = n => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n || 0);
const fmtDate = date => date ? new Date(`${date}T00:00:00`).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '—';
const station = code => STATIONS.find(s => s.code === code) || { code, name: code, city: code };
const classInfo = code => CLASSES.find(c => c.code === code) || CLASSES[0];
const fromStore = (key, fallback) => {
  try { const saved = localStorage.getItem(key); return saved ? JSON.parse(saved) : fallback; } catch { return fallback; }
};
const writeStore = (key, value) => { try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* storage may be disabled */ } };

function RailLogo({ onClick }) {
  return <button className="brand" onClick={onClick} aria-label="Rail Link home"><span className="brand-mark"><TrainFront size={25} strokeWidth={2.5}/></span><span>RAIL <b>LINK</b></span></button>;
}
function Topbar({ page, setPage, onLogout, loggedIn }) {
  const [time, setTime] = useState(new Date());
  const [mobileMenu, setMobileMenu] = useState(false);
  useEffect(() => { const id = setInterval(() => setTime(new Date()), 1000); return () => clearInterval(id); }, []);
  const nav = [
    { key: 'search', label: 'Search', Icon: Search }, { key: 'bookings', label: 'My Bookings', Icon: Ticket },
    { key: 'assistance', label: 'Assistance', Icon: HeartPulse }, { key: 'profile', label: 'Profile', Icon: UserRound },
  ];
  return <>
    <header className="topbar">
      <div className="topbar-inner">
        <RailLogo onClick={() => setPage('search')} />
        <button className="mobile-menu" aria-label="Toggle navigation" onClick={() => setMobileMenu(!mobileMenu)}><Menu size={21}/></button>
        <nav className={`main-nav ${mobileMenu ? 'nav-open' : ''}`}>
          {nav.map(({ key, label, Icon }) => <button key={key} className={`nav-link ${page === key ? 'nav-active' : ''}`} onClick={() => { setPage(key); setMobileMenu(false); }}><Icon size={17}/>{label}</button>)}
        </nav>
        <div className="time-wrap"><span className="live-dot"/><strong>{time.toLocaleTimeString('en-GB', { hour12: false, timeZone: 'Asia/Kolkata' })}</strong><span className="timezone">STN TIME</span></div>
        <button className="icon-button logout" onClick={onLogout} aria-label={loggedIn ? 'Log out' : 'Log in'} title={loggedIn ? 'Log out' : 'Log in'}>{loggedIn ? <LogOut size={17}/> : <LogIn size={17}/>}</button>
      </div>
    </header>
    <div className="demo-strip">DEMO DATA — schedules, fares and train records are for demonstration only, not live railway information</div>
  </>;
}
function SectionLabel({ children }) { return <div className="section-label">{children}</div>; }
function Panel({ children, className = '' }) { return <section className={`panel ${className}`}>{children}</section>; }
function PrimaryButton({ children, onClick, disabled = false, type = 'button', className = '' }) { return <button type={type} disabled={disabled} onClick={onClick} className={`btn btn-primary ${className}`}>{children}</button>; }
function StationSelect({ label, value, onChange, exclude }) {
  return <label className="field"><span>{label}</span><div className="select-wrap"><select value={value} onChange={e => onChange(e.target.value)}>
    {STATIONS.filter(s => s.code !== exclude || s.code === value).map(s => <option key={s.code} value={s.code}>{s.code} — {s.name} · {s.city}</option>)}
  </select><ChevronDown size={16}/></div></label>;
}
function JourneyForm({ search, setSearch, onSearch }) {
  return <Panel className="journey-panel"><div className="panel-heading"><h3>Plan your journey</h3><span className="pulse-dot"/></div>
    <StationSelect label="FROM" value={search.from} exclude={search.to} onChange={from => setSearch(s => ({ ...s, from, to: from === s.to ? s.from : s.to }))}/>
    <button className="swap-btn" title="Swap stations" aria-label="Swap stations" onClick={() => setSearch(s => ({ ...s, from: s.to, to: s.from }))}><ArrowDownUp size={18}/></button>
    <StationSelect label="TO" value={search.to} exclude={search.from} onChange={to => setSearch(s => ({ ...s, to }))}/>
    <div className="field-row">
      <label className="field"><span>JOURNEY DATE</span><input type="date" min="2026-01-01" value={search.date} onChange={e => setSearch(s => ({ ...s, date: e.target.value }))}/></label>
      <label className="field passenger-count"><span>PASSENGERS</span><input type="number" min="1" max="6" value={search.passengers} onChange={e => setSearch(s => ({ ...s, passengers: Math.max(1, Math.min(6, Number(e.target.value) || 1)) }))}/></label>
    </div>
    <div className="field"><span>CLASS</span><div className="class-options">{CLASSES.map(c => <button key={c.code} className={`class-chip ${search.classCode === c.code ? 'chosen' : ''}`} onClick={() => setSearch(s => ({ ...s, classCode: c.code }))}>{c.code}</button>)}</div></div>
    <PrimaryButton className="full-width search-submit" onClick={onSearch}><Search size={19}/> Search trains &amp; check seats</PrimaryButton>
  </Panel>;
}
function SegmentDemo() {
  const rows = [
    { seat: 'S1-25', legs: ['PAX A','PAX B','PAX B'] }, { seat: 'S1-26', legs: ['PAX C','PAX C','FREE'] },
    { seat: 'S1-27', legs: ['FREE','FREE','FREE'] }, { seat: 'S1-28', legs: ['FREE','FREE','PAX D'] },
  ];
  return <Panel className="segment-demo"><div className="panel-heading"><h3>How segment booking works</h3><span className="tag tag-blue">Live demo</span></div>
    <p className="muted">A seat is occupied only between boarding and destination. The same physical seat serves multiple passengers on non-overlapping legs.</p>
    <div className="segment-table-wrap"><div className="segment-table">
      <div className="segment-head"><span></span><span>CHE → BEN</span><span>BEN → MYS</span><span>MYS → HAS</span></div>
      {rows.map(row => <div className="segment-row" key={row.seat}><strong>{row.seat}</strong>{row.legs.map((leg, i) => <div key={i} className={`segment-cell ${leg === 'FREE' ? 'free' : 'occupied'} ${i === 2 ? 'focus-cell' : ''}`}><span className="status-dot"/>{leg}</div>)}</div>)}
    </div></div>
    <div className="demo-note"><b>S1-25:</b> Passenger A rides Chennai → Bengaluru, then Passenger B takes the same physical seat Bengaluru → Hassan. No overlap, no conflict.</div>
  </Panel>;
}
function HomePage({ search, setSearch, onSearch }) {
  return <main className="container home-page"><section className="hero"><h1>Book the seat, <span>not the whole route.</span></h1><p>Seat availability is calculated per station segment. When one passenger gets off, the<br className="desktop-break"/> same seat opens up for the next — so trains run fuller and you find seats others can't.</p></section>
    <div className="home-grid"><JourneyForm search={search} setSearch={setSearch} onSearch={onSearch}/><SegmentDemo/></div>
  </main>;
}
function JourneySummary({ search, train = SAMPLE_TRAIN, selectedSeats = [], step = 1, total }) {
  const from = station(search.from), to = station(search.to), fare = total ?? Math.round(train.baseFare * classInfo(search.classCode).multiplier * search.passengers);
  return <Panel className="journey-summary"><SectionLabel>JOURNEY CONTEXT</SectionLabel><h2 className="train-name"><span>{train.number}</span> {train.name}</h2>
    <div className="journey-time"><div><strong>{train.depart}</strong><span>{from.city} · {from.code}</span></div><div className="arrival"><strong>{train.arrive}</strong><span>{to.city} · {to.code}</span></div></div>
    <div className="summary-meta"><div><SectionLabel>DATE</SectionLabel><b>{fmtDate(search.date)}</b></div><div><SectionLabel>CLASS</SectionLabel><b>{search.classCode} <span className="muted">· {classInfo(search.classCode).name}</span></b></div><div><SectionLabel>DURATION</SectionLabel><b>{train.duration}</b></div></div>
    <div className="summary-seats"><SectionLabel>SEATS ({selectedSeats.length}/{search.passengers})</SectionLabel><div>{selectedSeats.length ? selectedSeats.map(n => <span key={n} className="seat-pill">{n}</span>) : <span className="muted">None selected</span>}</div></div>
    <div className="fare-section"><SectionLabel>FARE (DEMO)</SectionLabel><div className="fare-line"><span>Base fare · {train.distance} km</span><b>{money(train.baseFare)}</b></div><div className="fare-line"><span>Class fare · ×{classInfo(search.classCode).multiplier}</span><b>{money(Math.round(train.baseFare * classInfo(search.classCode).multiplier))}</b></div><div className="fare-line"><span>Passengers</span><b>× {search.passengers}</b></div><div className="total-line"><b>Total</b><strong>{money(fare)}</strong></div></div>
    <div className="stepper">{['1. SEATS','2. PASSENGERS','3. PAYMENT'].map((s, i) => <div className={step >= i + 1 ? 'step-active' : ''} key={s}>{s}</div>)}</div>
  </Panel>;
}
function ResultsPage({ search, setSearch, onBack, onCheckSeats }) {
  const from = station(search.from), to = station(search.to), fare = Math.round(SAMPLE_TRAIN.baseFare * classInfo(search.classCode).multiplier);
  return <main className="container results-layout"><div className="results-side"><JourneyForm search={search} setSearch={setSearch} onSearch={onBack} /></div><div className="results-main"><SectionLabel>SEARCH RESULTS · {fmtDate(search.date)} · {search.classCode} · {search.passengers} PAX</SectionLabel><h1 className="results-title">{from.city} → {to.city} <small>1 train</small></h1>
    <Panel className="train-card"><div className="train-card-top"><div><strong className="train-number">{SAMPLE_TRAIN.number}</strong><h2>{SAMPLE_TRAIN.name}</h2><p>{SAMPLE_TRAIN.type} · {SAMPLE_TRAIN.stops} stops · {SAMPLE_TRAIN.distance} km</p></div><div className="class-badges">{['SL','3A','2A'].map(c => <span className={search.classCode === c ? 'selected' : ''} key={c}>{c}</span>)}</div></div>
      <div className="train-times"><div><strong>{SAMPLE_TRAIN.depart}</strong><span>{from.city} · {from.code}</span></div><div className="duration-line">{SAMPLE_TRAIN.duration}</div><div className="arrival"><strong>{SAMPLE_TRAIN.arrive}</strong><span>{to.city} · {to.code}</span></div></div>
      <div className="route-line">{[from, station('SBC'), station('MYS'), to, station('MAQ')].map((s, i) => <div key={`${s.code}-${i}`} className={`route-stop ${i < 4 ? 'route-passed' : ''}`}><i/><b>{s.code}</b></div>)}</div>
      <div className="train-card-bottom"><div><SectionLabel>{search.classCode} FARE</SectionLabel><strong>{money(fare)}</strong></div><div><SectionLabel>SEGMENT AVAILABILITY</SectionLabel><strong className="available-text">AVL {SAMPLE_TRAIN.capacity} <span className="muted">/ {SAMPLE_TRAIN.capacity}</span></strong></div><PrimaryButton onClick={onCheckSeats}>Check seats <ArrowRight size={18}/></PrimaryButton></div>
    </Panel><p className="notice-text"><AlertCircle size={15}/> Demo schedules and seat counts are illustrative, not live railway data.</p>
  </div></main>;
}
function SeatPage({ search, setSearch, selectedSeats, setSelectedSeats, onContinue, onBack }) {
  const [coach, setCoach] = useState('S1'); const [filter, setFilter] = useState('ANY'); const [activeSeat, setActiveSeat] = useState(null);
  const seatData = useMemo(() => Array.from({ length: 72 }, (_, i) => {
    const n = i + 1; const hash = (n * 13 + coach.charCodeAt(1) * 7 + search.from.charCodeAt(0)) % 11;
    let status = hash < 2 ? 'occupied' : hash === 2 ? 'other' : 'free';
    if (n === 1 || n === 12 || n === 25 || n === 36 || n === 48 || n === 65) status = 'free';
    return { n, status, berth: ['Lower','Middle','Upper','Lower','Middle','Upper','Side Lower','Side Upper'][(n - 1) % 8] };
  }), [coach, search.from]);
  const filteredSeatData = seatData.filter(s => filter === 'ANY' || (filter === 'FREE' ? s.status === 'free' : filter === 'LOWER' ? s.berth.toLowerCase().includes('lower') : s.status === filter.toLowerCase()));
  const toggleSeat = seat => {
    if (seat.status === 'occupied' && !selectedSeats.includes(`${coach}-${seat.n}`)) return;
    const key = `${coach}-${seat.n}`;
    setSelectedSeats(prev => prev.includes(key) ? prev.filter(s => s !== key) : (prev.length < search.passengers ? [...prev, key] : [...prev.slice(1), key]));
    setActiveSeat(seat);
  };
  const autoAllocate = () => { const free = seatData.filter(s => s.status !== 'occupied').slice(0, search.passengers).map(s => `${coach}-${s.n}`); setSelectedSeats(free); setActiveSeat(seatData.find(s => s.n === Number(free[0]?.split('-')[1])) || null); };
  const seatStatus = s => selectedSeats.includes(`${coach}-${s.n}`) ? 'selected' : s.status;
  return <main className="container booking-layout"><JourneySummary search={search} selectedSeats={selectedSeats} step={1}/><div className="booking-main"><Panel className="seat-controls"><div className="controls-line"><div className="inline-options">{['SL','3A','2A'].map(c => <button key={c} className={`class-chip ${search.classCode === c ? 'chosen' : ''}`} onClick={() => setSearch(s => ({ ...s, classCode: c }))}>{c}</button>)}</div><div className="controls-right"><label className="select-wrap compact-select"><select value={filter} onChange={e => setFilter(e.target.value)}><option value="ANY">ANY</option><option value="FREE">FREE ONLY</option><option value="LOWER">LOWER BERTH</option><option value="OCCUPIED">OCCUPIED</option></select><ChevronDown size={15}/></label><button className="btn btn-outline" onClick={autoAllocate}><Sparkles size={17}/> Auto-allocate</button></div></div>
    <div className="coach-tabs">{['S1','S2','S3','S4'].map(c => <button key={c} className={coach === c ? 'chosen' : ''} onClick={() => { setCoach(c); setActiveSeat(null); }}>{`COACH ${c}`}</button>)}</div>
    <div className="legend"><span><i className="free-dot"/> Free</span><span><i className="occ-dot"/> Occupied for your journey</span><span><i className="other-dot"/> Free for you · booked on other segments</span><span><i className="sel-dot"/> Selected</span></div></Panel>
    <div className="seat-content"><Panel className="seat-map-panel"><div className="coach-title">COACH {coach} · ENGINE THIS WAY ↑</div><div className="berth-labels"><span>LB</span><span>MB</span><span>UB</span><span>LB</span><span>MB</span><span>UB</span><span>SL</span><span>SU</span></div><div className="seat-grid">{filteredSeatData.map(s => <button key={s.n} onClick={() => toggleSeat(s)} className={`seat ${seatStatus(s)}`} disabled={s.status === 'occupied'} title={`${coach}-${s.n} · ${s.berth}`} aria-label={`Seat ${coach}-${s.n}, ${s.status}`}>{String(s.n).padStart(2,'0')}</button>)}</div></Panel>
      <div className="seat-detail">{activeSeat ? <Panel><div className="detail-head"><h2>{coach}-{activeSeat.n}</h2><span>{activeSeat.berth}</span></div><p className="available-text">{selectedSeats.includes(`${coach}-${activeSeat.n}`) ? 'SELECTED' : 'AVAILABLE'}</p><SectionLabel>SEGMENT AVAILABILITY</SectionLabel>{[search.from,'SBC','MYS',search.to].filter((x,i,a) => a.indexOf(x) === i).map((code, i, arr) => i < arr.length - 1 ? <div className="occupancy-row" key={`${code}-${i}`}><span>{station(code).city} → {station(arr[i+1]).city}</span><b className="available-text"><i className="status-dot"/> AVAILABLE</b></div> : null)}<p className="tiny-muted">Highlighted rows are your journey.</p></Panel> : <div className="empty-tip"><Sparkles size={18}/><span>Tap any seat to see its station-by-station occupancy.</span></div>}</div>
    </div>
    <PrimaryButton className="full-width continue-button" disabled={selectedSeats.length !== search.passengers} onClick={onContinue}>CONTINUE TO PASSENGERS <ArrowRight size={18}/></PrimaryButton>
    <button className="back-link" onClick={onBack}><ArrowLeft size={16}/> Back to search results</button>
  </div></main>;
}
function PassengerPage({ search, selectedSeats, passengers, setPassengers, onNext, onBack }) {
  const update = (index, key, value) => setPassengers(old => old.map((p, i) => i === index ? { ...p, [key]: value } : p));
  return <main className="container booking-layout"><JourneySummary search={search} selectedSeats={selectedSeats} step={2}/><div className="booking-main"><Panel className="passenger-panel"><SectionLabel>PASSENGER MANIFEST</SectionLabel><h1>Who is travelling?</h1>{passengers.map((p, i) => <div className="passenger-card" key={i}><div className="passenger-title"><b>Passenger {i + 1}</b><span className="seat-pill">{selectedSeats[i] || 'Seat pending'}</span></div><div className="passenger-fields"><label className="field field-name"><input value={p.name} onChange={e => update(i,'name',e.target.value)} placeholder="Full name" required /></label><label className="field"><input type="number" min="1" max="120" value={p.age} onChange={e => update(i,'age',e.target.value)} placeholder="Age" required /></label><label className="field"><select value={p.gender} onChange={e => update(i,'gender',e.target.value)}><option>MALE</option><option>FEMALE</option><option>OTHER</option></select></label><label className="field"><input value={p.mobile} onChange={e => update(i,'mobile',e.target.value)} placeholder="Mobile (optional)" /></label><label className="field"><select value={p.idType} onChange={e => update(i,'idType',e.target.value)}><option value="">ID type (optional)</option><option>PAN</option><option>AADHAAR</option><option>PASSPORT</option><option>DRIVING LICENCE</option></select></label><label className="field"><input value={p.idNumber} onChange={e => update(i,'idNumber',e.target.value)} placeholder="ID number (optional)" /></label></div></div>)}</Panel><div className="action-row"><button className="btn btn-outline square-back" onClick={onBack}><ArrowLeft size={18}/></button><PrimaryButton className="full-width" onClick={onNext}>REVIEW &amp; PAY <ArrowRight size={18}/></PrimaryButton></div><p className="notice-text"><ShieldCheck size={15}/> Demo only. Do not enter real identity document numbers.</p></div></main>;
}
function PaymentPage({ search, selectedSeats, passengers, onBack, onPay }) {
  const [method, setMethod] = useState('UPI'); const [handle, setHandle] = useState('demo@upi'); const [card, setCard] = useState(''); const [bank, setBank] = useState('');
  const total = Math.round(SAMPLE_TRAIN.baseFare * classInfo(search.classCode).multiplier * search.passengers);
  const doPay = () => onPay({ method, handle: method === 'UPI' ? handle : method === 'Card' ? card : bank, fail: (method === 'UPI' && handle.toLowerCase().includes('fail')) || (method === 'Card' && card.endsWith('0000')) || (method === 'Net Banking' && bank === 'FAIL') });
  return <main className="container booking-layout"><JourneySummary search={search} selectedSeats={selectedSeats} step={3}/><div className="booking-main"><Panel className="payment-panel"><SectionLabel>SIMULATED PAYMENT · NO REAL MONEY</SectionLabel><h1>Pay {money(total)}</h1><div className="payment-tabs">{[{ label:'UPI', Icon: Wallet },{ label:'Card', Icon: CreditCard },{ label:'Net Banking', Icon: Activity }].map(({label,Icon}) => <button key={label} className={method === label ? 'chosen' : ''} onClick={() => setMethod(label)}><Icon size={17}/>{label}</button>)}</div>
    {method === 'UPI' ? <div className="payment-input-row"><label className="field"><input value={handle} onChange={e => setHandle(e.target.value)} placeholder="yourname@upi"/></label><div className="fake-qr"><QrCode size={78}/></div></div> : method === 'Card' ? <div className="payment-fields"><label className="field"><span>Card number (demo)</span><input value={card} onChange={e => setCard(e.target.value)} placeholder="4242 4242 4242 4242" maxLength={23}/></label><div className="field-row"><label className="field"><span>Expiry</span><input placeholder="MM/YY" maxLength={5}/></label><label className="field"><span>CVV</span><input placeholder="123" maxLength={4}/></label></div></div> : <label className="field"><span>Select bank</span><select value={bank} onChange={e => setBank(e.target.value)}><option value="">Choose a demo bank</option><option>State Bank of India</option><option>HDFC Bank</option><option>ICICI Bank</option><option>FAIL</option></select></label>}
    <p className="muted payment-tip">Demo tip: simulate a failed payment using UPI <b>fail@upi</b>, a card ending in <b>0000</b>, or bank <b>FAIL</b>.</p></Panel><div className="action-row"><button className="btn btn-outline square-back" onClick={onBack}><ArrowLeft size={18}/></button><PrimaryButton className="full-width" onClick={doPay}><ShieldCheck size={17}/> PAY {money(total)} &amp; BOOK</PrimaryButton></div><p className="notice-text"><AlertCircle size={15}/> No money will be charged. This is a simulated checkout.</p></div></main>;
}
function FakeQR({ value = 'RAILLINK-DEMO' }) {
  const cells = useMemo(() => { let seed = [...String(value)].reduce((n,c) => n + c.charCodeAt(0), 0); return Array.from({ length: 225 }, (_, i) => { seed = (seed * 9301 + 49297) % 233280; const x = i % 15, y = Math.floor(i / 15); const finder = (x < 5 && y < 5) || (x > 9 && y < 5) || (x < 5 && y > 9); const edge = finder && (x % 10 === 0 || y % 10 === 0 || x % 10 === 4 || y % 10 === 4); return { i, on: finder ? edge || (x % 10 === 2 && y % 10 === 2) : seed % 3 !== 0 }; }); }, [value]);
  return <div className="qr-grid" aria-label="Demo QR code">{cells.map(c => <i key={c.i} className={c.on ? 'qr-on' : ''}/>)}</div>;
}
function TicketCard({ booking }) {
  const passenger = booking.passengers?.[0] || { name: 'Demo traveller', age: '—', gender: '—' };
  const from = station(booking.from), to = station(booking.to);
  return <div className="ticket-card" id="print-ticket"><div className="ticket-top"><div><SectionLabel>DIGITAL BOARDING PASS · DEMO</SectionLabel><h2>{booking.trainNumber || SAMPLE_TRAIN.number} {booking.trainName || SAMPLE_TRAIN.name}</h2></div><div className="pnr-block"><SectionLabel>PNR</SectionLabel><strong>{booking.pnr}</strong></div></div>
    <div className="ticket-route"><div><h3>{from.code}</h3><span>{from.name}</span><b>{booking.depart || SAMPLE_TRAIN.depart}</b></div><div className="ticket-distance"><span>{booking.distance || SAMPLE_TRAIN.distance} km</span><i/><span>{booking.date}</span></div><div className="arrival"><h3>{to.code}</h3><span>{to.name}</span><b>{booking.arrive || SAMPLE_TRAIN.arrive}</b></div></div>
    <div className="ticket-passenger-head"><span>PASSENGER</span><span>AGE/SEX</span><span>COACH</span><span>SEAT</span><span>BERTH</span></div>{(booking.passengers || []).map((p,i) => <div className="ticket-passenger" key={i}><span>{p.name}</span><span>{p.age} / {p.gender?.[0]}</span><b>{(booking.seats?.[i] || 'S1-1').split('-')[0]}</b><b>{(booking.seats?.[i] || 'S1-1').split('-')[1]}</b><span>{p.berth || 'Lower'}</span></div>)}
    <div className="ticket-footer"><div><SectionLabel>CLASS</SectionLabel><b>{booking.classCode} · {classInfo(booking.classCode).name}</b></div><div><SectionLabel>FARE</SectionLabel><b>{money(booking.total)}</b></div><div><SectionLabel>PAYMENT</SectionLabel><b>{booking.paymentMethod} · <span className="available-text">SUCCESS</span></b></div><div><SectionLabel>STATUS</SectionLabel><b className={booking.status === 'CONFIRMED' ? 'available-text' : 'danger-text'}>{booking.status}</b></div><div className="ticket-qr"><FakeQR value={booking.pnr}/><small>{booking.pnr}</small></div></div></div>;
}
function ConfirmationPage({ booking, setPage, onBookAnother }) {
  return <main className="container confirmation-page"><div className="success-banner"><CheckCircle2 size={23}/><div><b>Booking confirmed · payment successful</b><span>PNR {booking.pnr} generated. Your seat is reserved only for {station(booking.from).code} → {station(booking.to).code} in this demo.</span></div></div><TicketCard booking={booking}/><div className="ticket-actions"><button className="btn btn-outline" onClick={() => window.print()}><Printer size={17}/> Print ticket</button><button className="btn btn-outline" onClick={() => setPage('bookings')}>My bookings</button><PrimaryButton onClick={onBookAnother}>BOOK ANOTHER</PrimaryButton></div><p className="notice-text"><AlertCircle size={15}/> This is a demonstration ticket and is not valid for travel.</p></main>;
}
function BookingsPage({ bookings, setPage, setActiveTicket, onCancel }) {
  const [filter, setFilter] = useState('ALL'); const visible = bookings.filter(b => filter === 'ALL' || b.status === filter);
  return <main className="container narrow-page"><SectionLabel>BOOKING HISTORY</SectionLabel><h1 className="page-title">My bookings</h1><div className="filter-tabs">{['ALL','CONFIRMED','CANCELLED'].map(f => <button key={f} onClick={() => setFilter(f)} className={filter === f ? 'chosen' : ''}>{f}</button>)}</div>
    {visible.length ? <div className="booking-cards">{visible.map(b => <Panel className="history-card" key={b.pnr}><div className="history-card-top"><div><SectionLabel>PNR</SectionLabel><strong className="pnr-number">{b.pnr}</strong></div><span className={`status-tag ${b.status.toLowerCase()}`}>{b.status}</span></div><h3>{b.trainNumber} {b.trainName}</h3><p>{station(b.from).city} ({b.from}) → {station(b.to).city} ({b.to}) · {b.date} · {b.classCode}</p><div className="history-seats">{(b.seats || []).map((seat, i) => <span key={seat}><b>{seat}</b> · {b.passengers?.[i]?.name || 'Passenger'}</span>)}</div><div className="history-bottom"><strong>{money(b.total)}</strong><div>{b.status === 'CONFIRMED' && <button className="btn btn-danger-outline" onClick={() => onCancel(b.pnr)}>Cancel</button>}<PrimaryButton onClick={() => { setActiveTicket(b); setPage('ticketView'); }}>VIEW TICKET</PrimaryButton></div></div></Panel>)}</div> : <Panel className="empty-state"><Ticket size={32}/><h2>No {filter === 'ALL' ? '' : filter.toLowerCase()} bookings yet</h2><p className="muted">Your demo bookings will appear here after you complete a booking.</p><PrimaryButton onClick={() => setPage('search')}>Search trains <ArrowRight size={16}/></PrimaryButton></Panel>}
  </main>;
}
function TicketViewPage({ booking, setPage }) { return <main className="container confirmation-page"><button className="back-link" onClick={() => setPage('bookings')}><ArrowLeft size={16}/> Back to my bookings</button>{booking ? <><TicketCard booking={booking}/><div className="ticket-actions"><button className="btn btn-outline" onClick={() => window.print()}><Printer size={17}/> Print ticket</button></div></> : <Panel className="empty-state"><p>No ticket selected.</p><PrimaryButton onClick={() => setPage('bookings')}>View bookings</PrimaryButton></Panel>}</main>; }
function AssistancePage({ assistance, setAssistance, bookings }) {
  const [form, setForm] = useState({ pnr: '', passengerName: '', type: 'MEDICAL', priority: 'MEDIUM', description: '' }); const [message, setMessage] = useState('');
  const submit = e => { e.preventDefault(); const req = { ...form, id: `AR-${Date.now().toString().slice(-6)}`, status: 'SUBMITTED', createdAt: new Date().toISOString() }; setAssistance(prev => [req, ...prev]); setMessage(`Request ${req.id} submitted in demo mode.`); setForm({ pnr:'', passengerName:'', type:'MEDICAL', priority:'MEDIUM', description:'' }); };
  return <main className="container assistance-page"><SectionLabel>ON-BOARD SUPPORT</SectionLabel><h1 className="big-page-title">Medical / Emergency Assistance</h1><p className="page-subtitle">Request medical, elderly, Accessibility or emergency assistance for your journey.</p><Panel className="assistance-panel"><div className="assistance-heading"><span><HeartPulse size={21}/></span><SectionLabel>NEW ASSISTANCE REQUEST</SectionLabel></div><form onSubmit={submit}><div className="form-grid"><label className="field"><span>PNR (optional)</span><input value={form.pnr} onChange={e => setForm(s=>({...s,pnr:e.target.value}))} placeholder="10-digit PNR" maxLength={10}/></label><label className="field"><span>Passenger Name</span><input required value={form.passengerName} onChange={e => setForm(s=>({...s,passengerName:e.target.value}))} placeholder="Passenger name"/></label><label className="field"><span>Request Type</span><select value={form.type} onChange={e => setForm(s=>({...s,type:e.target.value}))}><option>MEDICAL</option><option>ELDERLY ASSISTANCE</option><option>Accessibility</option><option>EMERGENCY</option><option>OTHER</option></select></label><label className="field"><span>Priority</span><select value={form.priority} onChange={e => setForm(s=>({...s,priority:e.target.value}))}><option>LOW</option><option>MEDIUM</option><option>HIGH</option><option>URGENT</option></select></label><label className="field full-span"><span>Description</span><textarea required rows="4" value={form.description} onChange={e => setForm(s=>({...s,description:e.target.value}))} placeholder="Describe the assistance required..."/></label></div><button className="btn btn-primary" type="submit"><Activity size={17}/> Submit Request</button>{message && <p className="form-success"><CheckCircle2 size={16}/>{message}</p>}</form></Panel><div className="requests-section"><SectionLabel>YOUR REQUESTS</SectionLabel>{assistance.length ? assistance.map(r => <Panel className="request-card" key={r.id}><div><b>{r.type}</b><span className="muted"> · {r.priority} priority</span><p>{r.description}</p><small>{r.id} · {new Date(r.createdAt).toLocaleString()}</small></div><span className="status-tag confirmed">{r.status}</span></Panel>) : <Panel className="empty-state small-empty"><p className="muted">No assistance requests submitted yet.</p></Panel>}</div></main>;
}
function ProfilePage({ bookings, mobile, setMobile, onSaveMobile, setPage, profile }) {
  const confirmed = bookings.filter(b => b.status === 'CONFIRMED').length, cancelled = bookings.filter(b => b.status === 'CANCELLED').length;
  const spent = bookings.filter(b => b.status === 'CONFIRMED').reduce((n,b) => n + b.total, 0);
  return <main className="container profile-page"><SectionLabel>PASSENGER PROFILE</SectionLabel><h1 className="big-page-title">Traveller</h1><div className="stats-grid"><Panel><SectionLabel>TOTAL BOOKINGS</SectionLabel><strong>{bookings.length}</strong></Panel><Panel><SectionLabel>CONFIRMED</SectionLabel><strong>{confirmed}</strong></Panel><Panel><SectionLabel>CANCELLED</SectionLabel><strong>{cancelled}</strong></Panel><Panel><SectionLabel>SPENT</SectionLabel><strong>{money(spent)}</strong></Panel></div><Panel className="contact-panel"><SectionLabel>CONTACT DETAILS</SectionLabel><form className="contact-form" onSubmit={e => { e.preventDefault(); onSaveMobile(); }}><input value={mobile} onChange={e => setMobile(e.target.value.replace(/\D/g,'').slice(0,10))} placeholder="10-digit mobile number" inputMode="numeric" maxLength={10}/><PrimaryButton type="submit">Save mobile</PrimaryButton></form></Panel><button className="btn btn-outline view-history" onClick={() => setPage('bookings')}>View booking history</button><p className="muted tiny-muted">Signed in as {profile?.email || 'demo traveller'} · Profile details are stored locally in this browser.</p></main>;
}
function AuthPage({ onLogin, onBack }) {
  const [mode, setMode] = useState('login'); const [email, setEmail] = useState(''); const [password, setPassword] = useState(''); const [message, setMessage] = useState('');
  const submit = e => { e.preventDefault(); if (!email.includes('@')) { setMessage('Enter a valid email address.'); return; } if (mode === 'forgot') { setMessage('Demo reset instructions are ready. No email was sent.'); return; } if (password.length < 4) { setMessage('Enter a password of at least 4 characters for this demo.'); return; } onLogin({ email, mode }); };
  return <main className="auth-page"><div className="auth-heading"><span className="auth-icon"><LogIn size={31}/></span><h1>{mode === 'login' ? 'Welcome back' : mode === 'signup' ? 'Create account' : 'Reset password'}</h1><p>{mode === 'login' ? 'Log in to your account' : mode === 'signup' ? 'Create your demo traveller account' : 'We will simulate a password reset'}</p></div><Panel className="auth-card"><button className="google-button" onClick={() => setMessage('Google sign-in is not configured in this demo. Use email below.')}>🌐 <b>Continue with Google</b></button><div className="or-divider"><span>OR</span></div><form onSubmit={submit}><label className="field"><span>Email</span><div className="input-with-icon"><Mail size={17}/><input type="email" value={email} required onChange={e => setEmail(e.target.value)} placeholder="you@example.com" autoComplete="email"/></div></label>{mode !== 'forgot' && <label className="field"><div className="password-label"><span>Password</span>{mode === 'login' && <button type="button" onClick={() => { setMode('forgot'); setMessage(''); }}>Forgot password?</button>}</div><div className="input-with-icon"><ShieldCheck size={17}/><input type="password" value={password} required onChange={e => setPassword(e.target.value)} placeholder="Enter password" autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}/></div></label>}<PrimaryButton type="submit" className="full-width">{mode === 'login' ? 'Log in' : mode === 'signup' ? 'Create account' : 'Send reset instructions'}</PrimaryButton>{message && <p className="auth-message">{message}</p>}</form></Panel><p className="auth-bottom">{mode === 'login' ? "Don't have an account?" : 'Already have an account?'} <button onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setMessage(''); }}>{mode === 'login' ? 'Create one' : 'Log in'}</button></p><button className="auth-back" onClick={onBack}><ArrowLeft size={16}/> Back to Rail Link</button></main>;
}
function App() {
  const [search, setSearch] = useState(INITIAL_SEARCH);
  const [page, setPage] = useState('search');
  const [previousPage, setPreviousPage] = useState('search');
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [passengers, setPassengers] = useState([{ name:'', age:'', gender:'MALE', mobile:'', idType:'', idNumber:'' }]);
  const [bookings, setBookings] = useState(() => fromStore('raillink_bookings', []));
  const [backendConnected, setBackendConnected] = useState(false);
  const [assistance, setAssistance] = useState(() => fromStore('raillink_assistance', []));
  const [mobile, setMobile] = useState(() => fromStore('raillink_mobile', ''));
  const [profile, setProfile] = useState(() => fromStore('raillink_profile', null));
  const [activeBooking, setActiveBooking] = useState(null); const [paymentError, setPaymentError] = useState(''); const [toast, setToast] = useState('');
  // Load booking records from the backend database when the app starts.
  useEffect(() => {
    fetch('http://localhost:3000/api/bookings')
      .then(response => {
        if (!response.ok) throw new Error('Could not load bookings');
        return response.json();
      })
      .then(savedBookings => {
        setBookings(savedBookings);
        setBackendConnected(true);
      })
      .catch(() => {
        setBackendConnected(false);
        console.warn('RAIL LINK backend is unavailable; booking history may be local only.');
      });
  }, []);
  useEffect(() => writeStore('raillink_assistance', assistance), [assistance]);
  useEffect(() => writeStore('raillink_mobile', mobile), [mobile]);
  useEffect(() => writeStore('raillink_profile', profile), [profile]);
  const fare = Math.round(SAMPLE_TRAIN.baseFare * classInfo(search.classCode).multiplier * search.passengers);
  const notify = message => { setToast(message); window.setTimeout(() => setToast(''), 3500); };
  const setNavigation = next => { setPage(next); setPaymentError(''); };
  const handleSearch = () => {
    if (search.from === search.to) { notify('Choose two different stations.'); return; }
    if (!search.date) { notify('Choose a journey date.'); return; }
    if (['MAS','SBC','MYS','HAS','MAQ'].includes(search.from) && ['MAS','SBC','MYS','HAS','MAQ'].includes(search.to)) setSearch(s=>({...s}));
    setSelectedSeats([]); setPassengers(Array.from({ length: search.passengers }, () => ({ name:'', age:'', gender:'MALE', mobile:'', idType:'', idNumber:'' }))); setNavigation('results');
  };
  const startBooking = () => { setSelectedSeats([]); setPassengers(Array.from({ length: search.passengers }, () => ({ name:'', age:'', gender:'MALE', mobile:'', idType:'', idNumber:'' }))); setNavigation('seats'); };
  const continuePassengers = () => { if (selectedSeats.length !== search.passengers) { notify(`Select ${search.passengers} seat${search.passengers > 1 ? 's' : ''} to continue.`); return; } setNavigation('passengers'); };
  const reviewPay = () => {
    const incomplete = passengers.some(p => !p.name.trim() || !p.age || Number(p.age) < 1 || Number(p.age) > 120);
    if (incomplete) { notify('Enter each passenger’s name and a valid age.'); return; }
    setNavigation('payment');
  };
  const makeBooking = async payment => {
    if (payment.fail) { setPaymentError('Payment failed in the demo. Check the test values and try again.'); notify('Demo payment failed.'); return; }
    const pnr = String(Math.floor(1000000000 + Math.random() * 9000000000));
    const booked = { pnr, status:'CONFIRMED', from:search.from, to:search.to, date:search.date, classCode:search.classCode, passengers:passengers.map((p,i)=>({...p, berth:['Lower','Middle','Upper','Side Lower'][i%4]})), seats:selectedSeats, trainNumber:SAMPLE_TRAIN.number, trainName:SAMPLE_TRAIN.name, depart:SAMPLE_TRAIN.depart, arrive:SAMPLE_TRAIN.arrive, distance:SAMPLE_TRAIN.distance, total:fare, paymentMethod:payment.method, paymentReference: payment.handle || 'DEMO', createdAt:new Date().toISOString() };
    try {
      const response = await fetch('http://localhost:3000/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(booked)
      });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.message || 'Booking could not be saved');
      const savedBooking = result.booking || booked;
      setBookings(old => [savedBooking, ...old.filter(b => b.pnr !== savedBooking.pnr)]);
      setActiveBooking(savedBooking);
      setBackendConnected(true);
      setPaymentError('');
      setNavigation('confirmation');
      notify('Demo booking saved to the database.');
    } catch (error) {
      setPaymentError('Could not save your booking. Check that the backend is running, then try again.');
      notify('Backend connection failed; booking was not saved.');
      console.error(error);
    }
  };
  const cancelBooking = async pnr => {
    const ok = window.confirm(`Cancel demo booking ${pnr}?`); if (!ok) return;
    try {
      const response = await fetch(`http://localhost:3000/api/bookings/${encodeURIComponent(pnr)}/cancel`, { method: 'PATCH' });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.message || 'Cancellation failed');
      const updated = { ...bookings.find(b => b.pnr === pnr), status:'CANCELLED', refund:Math.round((bookings.find(b => b.pnr === pnr)?.total || 0) * 0.8) };
      setBookings(old => old.map(b => b.pnr === pnr ? updated : b));
      if (activeBooking?.pnr === pnr) setActiveBooking(updated);
      notify('Demo booking cancelled and database updated.');
    } catch (error) {
      notify('Could not cancel booking. Check that the backend is running.');
      console.error(error);
    }
  };
  const logout = () => { if (profile) { setProfile(null); setPreviousPage(page === 'login' ? 'search' : page); setNavigation('login'); } else { setPreviousPage(page); setNavigation('login'); } };
  const login = ({ email }) => { setProfile({ email }); setNavigation(previousPage === 'login' ? 'search' : previousPage); notify('Signed in to the local demo.'); };
  const saveMobile = () => { if (!/^\d{10}$/.test(mobile)) { notify('Enter a valid 10-digit mobile number.'); return; } notify('Mobile number saved locally.'); };
  const shared = page !== 'login';
  return <div className="app-shell">{shared && <Topbar page={page === 'results' || page === 'seats' || page === 'passengers' || page === 'payment' || page === 'confirmation' || page === 'ticketView' ? 'search' : page} setPage={setNavigation} onLogout={logout} loggedIn={!!profile}/>}
    {page === 'search' && <HomePage search={search} setSearch={setSearch} onSearch={handleSearch}/>}
    {page === 'results' && <ResultsPage search={search} setSearch={setSearch} onBack={() => setNavigation('search')} onCheckSeats={startBooking}/>}
    {page === 'seats' && <SeatPage search={search} setSearch={setSearch} selectedSeats={selectedSeats} setSelectedSeats={setSelectedSeats} onContinue={continuePassengers} onBack={() => setNavigation('results')}/>}
    {page === 'passengers' && <PassengerPage search={search} selectedSeats={selectedSeats} passengers={passengers} setPassengers={setPassengers} onNext={reviewPay} onBack={() => setNavigation('seats')}/>}
    {page === 'payment' && <><PaymentPage search={search} selectedSeats={selectedSeats} passengers={passengers} onBack={() => setNavigation('passengers')} onPay={makeBooking}/>{paymentError && <div className="floating-error"><AlertCircle size={18}/>{paymentError}<button onClick={()=>setPaymentError('')}><X size={15}/></button></div>}</>}
    {page === 'confirmation' && activeBooking && <ConfirmationPage booking={activeBooking} setPage={setNavigation} onBookAnother={() => { setSearch(INITIAL_SEARCH); setNavigation('search'); }}/>}
    {page === 'bookings' && <BookingsPage bookings={bookings} setPage={setNavigation} setActiveTicket={setActiveBooking} onCancel={cancelBooking}/>}
    {page === 'ticketView' && <TicketViewPage booking={activeBooking} setPage={setNavigation}/>}
    {page === 'assistance' && <AssistancePage assistance={assistance} setAssistance={setAssistance} bookings={bookings}/>}
    {page === 'profile' && <ProfilePage bookings={bookings} mobile={mobile} setMobile={setMobile} onSaveMobile={saveMobile} setPage={setNavigation} profile={profile}/>}
    {page === 'login' && <AuthPage onLogin={login} onBack={() => setNavigation(previousPage === 'login' ? 'search' : previousPage)}/>}
    {toast && <div className="toast"><CheckCircle2 size={17}/>{toast}<button onClick={() => setToast('')}><X size={14}/></button></div>}
    <footer className="site-footer">RAIL LINK <span>·</span> Segment booking demo <span>·</span> Not affiliated with Indian Railways</footer>
  </div>;
}

export default App;

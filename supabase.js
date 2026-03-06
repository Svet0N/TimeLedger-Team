/* ================================================================
   supabase.js — TimeLedger Team  Data layer + SQL schema
   ================================================================ */

const SUPABASE_URL = 'YOUR_SUPABASE_URL';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';
const DEMO_MODE = (!SUPABASE_URL || SUPABASE_URL === 'YOUR_SUPABASE_URL');

let supabaseClient = null;
if (!DEMO_MODE && window.supabase) {
  supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

// ── helpers ──────────────────────────────────────────────────
function _d(n = 0) {
  const d = new Date(); d.setDate(d.getDate() + n);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}
function _t(h, m = '00') { return `${String(h).padStart(2, '0')}:${m}`; }

// ── DEMO DATA INIT ────────────────────────────────────────────
function initDemoData() {
  // v4: re-init with restaurants & superadmin
  if (localStorage.getItem('sf_v4_init')) return;
  // Clear old data so structure is upgraded cleanly
  ['sf_v3_init', 'sf_restaurants_v3'].forEach(k => localStorage.removeItem(k));

  const users = [
    { id: 'sadmin-1', username: 'superadmin', password: 'admin123', role: 'superadmin', name: 'Super Admin', hourly_rate: 0, status: 'active', restaurantId: null },
    { id: 'mgr-1', username: 'manager1', password: '1234', role: 'manager', name: 'Главен Мениджър', hourly_rate: 0, status: 'active', restaurantId: 'rest-1' },
    { id: 'mgr-2', username: 'manager2', password: '1234', role: 'manager', name: 'Втори Мениджър', hourly_rate: 0, status: 'active', restaurantId: 'rest-2' },
    { id: 'emp-1', username: 'emp1', password: '1234', role: 'employee', name: 'Иван Петров', hourly_rate: 9, status: 'active', restaurantId: 'rest-1' },
    { id: 'emp-2', username: 'emp2', password: '1234', role: 'employee', name: 'Мария Иванова', hourly_rate: 8.5, status: 'active', restaurantId: 'rest-1' },
    { id: 'emp-3', username: 'emp3', password: '1234', role: 'employee', name: 'Георги Стоев', hourly_rate: 10, status: 'active', restaurantId: 'rest-1' },
    { id: 'emp-4', username: 'emp4', password: '1234', role: 'employee', name: 'Елена Николова', hourly_rate: 9.5, status: 'active', restaurantId: 'rest-1' },
    { id: 'emp-5', username: 'emp5', password: '1234', role: 'employee', name: 'Петър Димитров', hourly_rate: 8, status: 'active', restaurantId: 'rest-2' },
  ];

  const restaurants = [
    { id: 'rest-1', name: 'Ресторант Централ', address: 'бул. Витоша 12, София', photo: null, subscriptionPlan: 'pro', managerId: 'mgr-1', createdAt: _d(-60) },
    { id: 'rest-2', name: 'Кафе Морски бриз', address: 'ул. Черноморска 5, Варна', photo: null, subscriptionPlan: 'starter', managerId: 'mgr-2', createdAt: _d(-30) },
  ];
  localStorage.setItem('sf_restaurants_v3', JSON.stringify(restaurants));

  const TYPES = ['regular', '6h', '12h', 'weekend', 'overtime'];
  const HOURS = { regular: 8, '6h': 6, '12h': 12, weekend: 8, overtime: 10, dayoff: 0 };
  const empIds = ['emp-1', 'emp-2', 'emp-3', 'emp-4'];

  const schedules = [], shifts = [];
  let si = 1, hi = 1;

  // Past 20 days
  for (let off = 20; off >= 1; off--) {
    const date = _d(-off);
    const dow = new Date(date + 'T00:00:00').getDay();
    const isWk = dow === 0 || dow === 6;

    empIds.forEach((eid, idx) => {
      if (isWk && idx > 1) return;
      if (!isWk && Math.random() < 0.12) return;
      const type = isWk ? 'weekend' : TYPES[Math.floor(Math.random() * 3)];
      const planned = HOURS[type] || 8;
      schedules.push({ id: `s${si++}`, employee_id: eid, date, planned_hours: planned, shift_type: type, note: '' });

      const noShow = Math.random() < 0.08;
      const workedH = noShow ? 0 : Math.max(0, planned - Math.floor(Math.random() * 2));
      const status = noShow ? 'absent' : workedH < planned * 0.75 ? 'partial' : 'present';
      const checkin = noShow ? null : _t(8 + Math.floor(Math.random() * 2), Math.random() < 0.5 ? '00' : '30');
      shifts.push({ id: `h${hi++}`, employee_id: eid, date, worked_hours: workedH, status, note: '', checkin_time: checkin });
    });
  }

  // Today
  empIds.forEach((eid, idx) => {
    const types = ['regular', '6h', '12h', 'regular'];
    const type = types[idx] || 'regular';
    schedules.push({ id: `s${si++}`, employee_id: eid, date: _d(0), planned_hours: HOURS[type] || 8, shift_type: type, note: idx === 2 ? 'Сутринна смяна' : '' });
  });

  // Next 7 days
  for (let off = 1; off <= 7; off++) {
    const date = _d(off);
    const dow = new Date(date + 'T00:00:00').getDay();
    const isWk = dow === 0 || dow === 6;
    empIds.forEach((eid, idx) => {
      if (isWk && idx > 1) return;
      const type = isWk ? 'weekend' : 'regular';
      schedules.push({ id: `s${si++}`, employee_id: eid, date, planned_hours: 8, shift_type: type, note: '' });
    });
  }

  const penalties = [
    { id: 'p1', employee_id: 'emp-1', amount: 15, note: 'Закъснение 30 мин.', date: _d(-8) },
    { id: 'p2', employee_id: 'emp-2', amount: 20, note: 'Неуведомено отсъствие', date: _d(-5) },
    { id: 'p3', employee_id: 'emp-3', amount: 10, note: 'Ранно напускане', date: _d(-3) },
    { id: 'p4', employee_id: 'emp-1', amount: 25, note: 'Повреда на инвентар', date: _d(-12) },
  ];

  const notifications = [
    { id: 'n1', from_id: 'mgr-1', from_name: 'Мениджър', title: 'Промяна в графика', message: 'Утре всички идват в 9:00. Моля потвърдете.', date: _d(-1), read_by: [] },
    { id: 'n2', from_id: 'mgr-1', from_name: 'Мениджър', title: 'Среща на персонала', message: 'Петък в 14:00 задължителна среща на целия персонал в ресторанта.', date: _d(-3), read_by: ['emp-1', 'emp-2'] },
    { id: 'n3', from_id: 'mgr-1', from_name: 'Мениджър', title: 'Нов дрес код', message: 'От следващия месец влиза в сила нов дрес код. Детайли в офиса.', date: _d(-7), read_by: ['emp-1', 'emp-2', 'emp-3', 'emp-4'] },
  ];

  localStorage.setItem('sf_users_v3', JSON.stringify(users));
  localStorage.setItem('sf_schedules_v3', JSON.stringify(schedules));
  localStorage.setItem('sf_shifts_v3', JSON.stringify(shifts));
  localStorage.setItem('sf_penalties_v3', JSON.stringify(penalties));
  localStorage.setItem('sf_notifs_v3', JSON.stringify(notifications));
  localStorage.setItem('sf_v4_init', '1');
}

// Always ensure superadmin exists regardless of init state
function ensureSuperAdmin() {
  const users = JSON.parse(localStorage.getItem('sf_users_v3') || '[]');
  const hasSA = users.find(u => u.role === 'superadmin');
  if (!hasSA) {
    users.unshift({ id: 'sadmin-1', username: 'superadmin', password: 'admin123', role: 'superadmin', name: 'Super Admin', hourly_rate: 0, status: 'active', restaurantId: null });
    localStorage.setItem('sf_users_v3', JSON.stringify(users));
  }
  // Ensure restaurants collection exists
  if (!localStorage.getItem('sf_restaurants_v3')) {
    const restaurants = [
      { id: 'rest-1', name: 'Ресторант Централ', address: 'бул. Витоша 12, София', photo: null, subscriptionPlan: 'pro', managerId: 'mgr-1', createdAt: '2025-01-05' },
      { id: 'rest-2', name: 'Кафе Морски бриз', address: 'ул. Черноморска 5, Варна', photo: null, subscriptionPlan: 'starter', managerId: 'mgr-2', createdAt: '2025-01-15' },
    ];
    localStorage.setItem('sf_restaurants_v3', JSON.stringify(restaurants));
  }
}

// ── AUTH ──────────────────────────────────────────────────────
const Auth = {
  async login(username, password) {
    if (DEMO_MODE) {
      initDemoData();       // full init if first time
      ensureSuperAdmin();   // ALWAYS ensure superadmin exists
      const users = JSON.parse(localStorage.getItem('sf_users_v3') || '[]');
      const user = users.find(u => u.username === username && u.password === password);
      if (!user) throw new Error(I18N.t('err_wrong_creds'));
      if (user.status === 'inactive') throw new Error(I18N.t('err_deactivated'));
      localStorage.setItem('sf_session', JSON.stringify({ user, expires: Date.now() + 8 * 3600 * 1000 }));
      return user;
    }
    throw new Error('Supabase не е конфигуриран.');
  },
  logout() {
    localStorage.removeItem('sf_session');
    window.location.href = 'index.html';
  },
  getUser() {
    const raw = localStorage.getItem('sf_session');
    if (!raw) return null;
    const s = JSON.parse(raw);
    if (Date.now() > s.expires) { this.logout(); return null; }
    return s.user;
  },
  requireRole(role) {
    const user = this.getUser();
    if (!user) { window.location.href = 'index.html'; return null; }
    if (user.role !== role) {
      if (user.role === 'superadmin') window.location.href = 'superadmin.html';
      else if (user.role === 'manager') window.location.href = 'manager.html';
      else window.location.href = 'employee.html';
      return null;
    }
    return user;
  }
};

// ── DB ────────────────────────────────────────────────────────
const DB = {
  // Restaurants
  getRestaurants() {
    return JSON.parse(localStorage.getItem('sf_restaurants_v3') || '[]');
  },
  getRestaurant(id) {
    return this.getRestaurants().find(r => r.id === id) || null;
  },
  createRestaurant(data) {
    const arr = this.getRestaurants();
    data.id = 'rest-' + Date.now();
    data.createdAt = new Date().toISOString().split('T')[0];
    arr.push(data);
    localStorage.setItem('sf_restaurants_v3', JSON.stringify(arr));
    return data;
  },
  updateRestaurant(id, data) {
    const arr = this.getRestaurants();
    const idx = arr.findIndex(r => r.id === id);
    if (idx >= 0) arr[idx] = { ...arr[idx], ...data };
    localStorage.setItem('sf_restaurants_v3', JSON.stringify(arr));
  },
  deleteRestaurant(id) {
    // Remove restaurant and re-assign users
    const arr = this.getRestaurants().filter(r => r.id !== id);
    localStorage.setItem('sf_restaurants_v3', JSON.stringify(arr));
    // Clean up users belonging to this restaurant
    const users = JSON.parse(localStorage.getItem('sf_users_v3') || '[]').map(u =>
      u.restaurantId === id ? { ...u, restaurantId: null } : u
    );
    localStorage.setItem('sf_users_v3', JSON.stringify(users));
  },

  // Users
  getEmployees(restaurantId = null) {
    const all = JSON.parse(localStorage.getItem('sf_users_v3') || '[]').filter(u => u.role === 'employee');
    return restaurantId ? all.filter(u => u.restaurantId === restaurantId) : all;
  },
  getManagers(restaurantId = null) {
    const all = JSON.parse(localStorage.getItem('sf_users_v3') || '[]').filter(u => u.role === 'manager');
    return restaurantId ? all.filter(u => u.restaurantId === restaurantId) : all;
  },
  getEmployee(id) {
    return JSON.parse(localStorage.getItem('sf_users_v3') || '[]').find(u => u.id === id);
  },
  createEmployee(emp) {
    const users = JSON.parse(localStorage.getItem('sf_users_v3') || '[]');
    if (users.find(u => u.username === emp.username)) throw new Error('Потребителското име вече съществува.');
    emp.id = 'emp-' + Date.now(); emp.role = 'employee'; emp.status = 'active';
    users.push(emp);
    localStorage.setItem('sf_users_v3', JSON.stringify(users));
    return emp;
  },
  updateEmployee(id, data) {
    const users = JSON.parse(localStorage.getItem('sf_users_v3') || '[]');
    const idx = users.findIndex(u => u.id === id);
    if (idx >= 0) users[idx] = { ...users[idx], ...data };
    localStorage.setItem('sf_users_v3', JSON.stringify(users));
    const sess = localStorage.getItem('sf_session');
    if (sess) {
      const s = JSON.parse(sess);
      if (s.user.id === id) { s.user = { ...s.user, ...data }; localStorage.setItem('sf_session', JSON.stringify(s)); }
    }
  },
  createManager(data) {
    const users = JSON.parse(localStorage.getItem('sf_users_v3') || '[]');
    if (users.find(u => u.username === data.username)) throw new Error('Потребителското име вече съществува.');
    data.id = 'mgr-' + Date.now(); data.role = 'manager'; data.status = 'active'; data.hourly_rate = 0;
    users.push(data);
    localStorage.setItem('sf_users_v3', JSON.stringify(users));
    return data;
  },
  removeManagerFromRestaurant(mgrId, restId) {
    const users = JSON.parse(localStorage.getItem('sf_users_v3') || '[]');
    const idx = users.findIndex(u => u.id === mgrId);
    if (idx >= 0 && users[idx].restaurantId === restId) users[idx].restaurantId = null;
    localStorage.setItem('sf_users_v3', JSON.stringify(users));
  },

  // Admin logs
  getAdminLogs() {
    return JSON.parse(localStorage.getItem('sf_admin_logs') || '[]');
  },
  addAdminLog(action, detail = '') {
    const logs = this.getAdminLogs();
    logs.unshift({ id: Date.now(), action, detail, ts: new Date().toISOString() });
    if (logs.length > 100) logs.length = 100;
    localStorage.setItem('sf_admin_logs', JSON.stringify(logs));
  },

  // System metrics
  getTotalShifts() { return JSON.parse(localStorage.getItem('sf_shifts_v3') || '[]').length; },
  getTotalHours() {
    return JSON.parse(localStorage.getItem('sf_shifts_v3') || '[]')
      .reduce((s, sh) => s + parseFloat(sh.worked_hours || 0), 0);
  },
  getLastActivity(restaurantId) {
    const empIds = this.getEmployees(restaurantId).map(e => e.id);
    const shifts = JSON.parse(localStorage.getItem('sf_shifts_v3') || '[]')
      .filter(s => empIds.includes(s.employee_id) && s.worked_hours > 0)
      .map(s => s.date).sort().reverse();
    return shifts[0] || null;
  },

  // Schedule
  getSchedules(from, to) {
    return JSON.parse(localStorage.getItem('sf_schedules_v3') || '[]')
      .filter(s => (!from || s.date >= from) && (!to || s.date <= to));
  },
  getSchedulesByDate(date) {
    return JSON.parse(localStorage.getItem('sf_schedules_v3') || '[]').filter(s => s.date === date);
  },
  getSchedulesForEmployee(empId, from, to) {
    return this.getSchedules(from, to).filter(s => s.employee_id === empId);
  },
  addSchedule(sched) {
    const arr = JSON.parse(localStorage.getItem('sf_schedules_v3') || '[]');
    sched.id = 'sched-' + Date.now(); arr.push(sched);
    localStorage.setItem('sf_schedules_v3', JSON.stringify(arr));
    return sched;
  },
  deleteSchedule(id) {
    const arr = JSON.parse(localStorage.getItem('sf_schedules_v3') || '[]').filter(s => s.id !== id);
    localStorage.setItem('sf_schedules_v3', JSON.stringify(arr));
  },

  // Shifts
  getShifts(empId, from, to) {
    let a = JSON.parse(localStorage.getItem('sf_shifts_v3') || '[]');
    if (empId) a = a.filter(s => s.employee_id === empId);
    if (from) a = a.filter(s => s.date >= from);
    if (to) a = a.filter(s => s.date <= to);
    return a;
  },
  getShiftsByDate(date) {
    return JSON.parse(localStorage.getItem('sf_shifts_v3') || '[]').filter(s => s.date === date);
  },
  upsertShift(shift) {
    const arr = JSON.parse(localStorage.getItem('sf_shifts_v3') || '[]');
    const idx = arr.findIndex(s => s.employee_id === shift.employee_id && s.date === shift.date);
    if (idx >= 0) arr[idx] = { ...arr[idx], ...shift };
    else { shift.id = 'shift-' + Date.now(); arr.push(shift); }
    localStorage.setItem('sf_shifts_v3', JSON.stringify(arr));
    return shift;
  },
  updateShift(id, data) {
    const arr = JSON.parse(localStorage.getItem('sf_shifts_v3') || '[]');
    const idx = arr.findIndex(s => s.id === id);
    if (idx >= 0) arr[idx] = { ...arr[idx], ...data };
    localStorage.setItem('sf_shifts_v3', JSON.stringify(arr));
  },

  // Penalties
  getPenalties(empId) {
    const a = JSON.parse(localStorage.getItem('sf_penalties_v3') || '[]');
    return empId ? a.filter(p => p.employee_id === empId) : a;
  },
  addPenalty(pen) {
    const arr = JSON.parse(localStorage.getItem('sf_penalties_v3') || '[]');
    pen.id = 'pen-' + Date.now(); arr.push(pen);
    localStorage.setItem('sf_penalties_v3', JSON.stringify(arr));
    return pen;
  },
  deletePenalty(id) {
    const arr = JSON.parse(localStorage.getItem('sf_penalties_v3') || '[]').filter(p => p.id !== id);
    localStorage.setItem('sf_penalties_v3', JSON.stringify(arr));
  },

  // Notifications
  getNotifications(userId = null) {
    const arr = JSON.parse(localStorage.getItem('sf_notifs_v3') || '[]').sort((a, b) => b.date.localeCompare(a.date));
    if (!userId) return arr;
    return arr.filter(n => n.target === 'all' || n.target === userId);
  },
  addNotification(notif) {
    const arr = JSON.parse(localStorage.getItem('sf_notifs_v3') || '[]');
    notif.id = 'notif-' + Date.now(); notif.date = new Date().toISOString().split('T')[0]; notif.read_by = [];
    arr.push(notif);
    localStorage.setItem('sf_notifs_v3', JSON.stringify(arr));
    return notif;
  },
  markNotifRead(notifId, userId) {
    const arr = JSON.parse(localStorage.getItem('sf_notifs_v3') || '[]');
    const n = arr.find(x => x.id === notifId);
    if (n && !n.read_by.includes(userId)) n.read_by.push(userId);
    localStorage.setItem('sf_notifs_v3', JSON.stringify(arr));
  },
  markAllNotifsRead(userId) {
    const arr = JSON.parse(localStorage.getItem('sf_notifs_v3') || '[]');
    arr.forEach(n => {
      if ((n.target === 'all' || n.target === userId) && !n.read_by.includes(userId)) {
        n.read_by.push(userId);
      }
    });
    localStorage.setItem('sf_notifs_v3', JSON.stringify(arr));
  },
  getUnreadCount(userId) {
    return this.getNotifications(userId).filter(n => !n.read_by.includes(userId)).length;
  },
};

/* ================================================================
   SUPABASE SQL SCHEMA
   Run in: Supabase → SQL Editor
   ================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Restaurants (multi-tenant support)
CREATE TABLE restaurants (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name        TEXT NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Users
CREATE TABLE users (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  username      TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role          TEXT NOT NULL CHECK (role IN ('manager','employee')),
  name          TEXT NOT NULL,
  hourly_rate   NUMERIC(8,2) DEFAULT 0,
  status        TEXT DEFAULT 'active' CHECK (status IN ('active','inactive')),
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- Restaurant ↔ User mapping (supports multiple restaurants)
CREATE TABLE restaurant_users (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  restaurant_id UUID REFERENCES restaurants(id) ON DELETE CASCADE,
  user_id       UUID REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE(restaurant_id, user_id)
);

-- Schedule
CREATE TABLE schedule (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  employee_id   UUID REFERENCES users(id) ON DELETE CASCADE,
  date          DATE NOT NULL,
  planned_hours NUMERIC(4,1) NOT NULL,
  shift_type    TEXT DEFAULT 'regular',
  note          TEXT DEFAULT '',
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- Shifts (actual worked hours)
CREATE TABLE shifts (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  employee_id   UUID REFERENCES users(id) ON DELETE CASCADE,
  date          DATE NOT NULL,
  worked_hours  NUMERIC(4,1) DEFAULT 0,
  status        TEXT DEFAULT 'present' CHECK (status IN ('present','absent','partial','penalty')),
  note          TEXT DEFAULT '',
  checkin_time  TIME,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(employee_id, date)
);

-- Fines / Penalties
CREATE TABLE fines (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  employee_id   UUID REFERENCES users(id) ON DELETE CASCADE,
  amount        NUMERIC(8,2) NOT NULL,
  note          TEXT DEFAULT '',
  date          DATE NOT NULL,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- Notifications (manager → all employees)
CREATE TABLE notifications (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  from_id       UUID REFERENCES users(id),
  from_name     TEXT NOT NULL,
  title         TEXT NOT NULL,
  message       TEXT NOT NULL,
  target        TEXT DEFAULT 'all',  -- 'all' or specific employee_id
  date          DATE NOT NULL,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE notification_reads (
  notification_id UUID REFERENCES notifications(id) ON DELETE CASCADE,
  user_id         UUID REFERENCES users(id) ON DELETE CASCADE,
  read_at         TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY(notification_id, user_id)
);

-- Check-ins (QR scan based — for future QR feature)
CREATE TABLE checkins (
  id             UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  employee_id    UUID REFERENCES users(id),
  restaurant_id  UUID REFERENCES restaurants(id),
  check_in_time  TIMESTAMPTZ DEFAULT NOW(),
  date           DATE NOT NULL,
  token_used     TEXT
);

-- QR tokens (refreshed every 30s)
CREATE TABLE qr_tokens (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  restaurant_id UUID REFERENCES restaurants(id),
  token         TEXT UNIQUE NOT NULL,
  date          DATE NOT NULL,
  expires_at    TIMESTAMPTZ NOT NULL,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security
ALTER TABLE shifts            ENABLE ROW LEVEL SECURITY;
ALTER TABLE schedule          ENABLE ROW LEVEL SECURITY;
ALTER TABLE fines             ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications     ENABLE ROW LEVEL SECURITY;
ALTER TABLE notification_reads ENABLE ROW LEVEL SECURITY;
ALTER TABLE checkins          ENABLE ROW LEVEL SECURITY;

-- Employees see only own data
CREATE POLICY emp_own_shifts  ON shifts    FOR SELECT USING (employee_id = auth.uid());
CREATE POLICY emp_own_sched   ON schedule  FOR SELECT USING (employee_id = auth.uid());
CREATE POLICY emp_own_fines   ON fines     FOR SELECT USING (employee_id = auth.uid());
CREATE POLICY emp_see_notifs  ON notifications FOR SELECT USING (target='all' OR target=auth.uid()::text);

-- Managers full access
CREATE POLICY mgr_all_shifts ON shifts    FOR ALL USING (EXISTS(SELECT 1 FROM users WHERE id=auth.uid() AND role='manager'));
CREATE POLICY mgr_all_sched  ON schedule  FOR ALL USING (EXISTS(SELECT 1 FROM users WHERE id=auth.uid() AND role='manager'));
CREATE POLICY mgr_all_fines  ON fines     FOR ALL USING (EXISTS(SELECT 1 FROM users WHERE id=auth.uid() AND role='manager'));
CREATE POLICY mgr_all_notifs ON notifications FOR ALL USING (EXISTS(SELECT 1 FROM users WHERE id=auth.uid() AND role='manager'));

================================================================ */

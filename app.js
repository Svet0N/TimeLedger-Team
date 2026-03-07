/* ================================================================
   app.js — TimeLedger Team  Full Application Logic
   ================================================================ */
'use strict';

// ============================================================
// i18n — BG / EN / RU
// ============================================================
const TRANSLATIONS = {
  bg: {
    login_sub: 'Управление на работни смени', lbl_username: 'Потребителско име',
    lbl_password: 'Парола', btn_login: 'Вход', hint_manager: 'Мениджър',
    hint_employees: 'Служители', role_manager: 'Мениджър', role_employee: 'Служител',
    btn_logout: 'Изход', tab_today: 'Днес', tab_schedule: 'График',
    tab_employees: 'Служители', tab_fines: 'Наказания', tab_reports: 'Отчети',
    tab_notifs: 'Известия', tab_profile: 'Профил', tab_dashboard: 'Табло',
    tab_calendar: 'Календар', tab_history: 'История',
    today_title: '📋 Днешен изглед', cal_monthly: '📅 Месечен График',
    cal_weekly: '📅 Седмичен изглед', stat_scheduled: 'Насрочени',
    stat_arrived: 'Дошли', stat_absent: 'Отсъстващи', stat_pending: 'Неотбелязани',
    btn_add: 'Добави', btn_new_emp: 'Нов служител', btn_cancel: 'Отказ',
    btn_create: 'Създай', btn_save: 'Запази', btn_change: 'Промени',
    filter_type: 'Вид смяна:', filter_all: 'Всички', filter_all_emp: 'Всички служители',
    lbl_period: 'Период:', lbl_filter: 'Филтър:', lbl_employee: 'Служител',
    lbl_hours: 'Часове', lbl_days: 'Дни', lbl_salary: 'Заплата', lbl_net: 'Нето',
    lbl_fullname: 'Пълно име', lbl_rate: 'Часова ставка (лв./ч)',
    rep_active_emp: 'Активни служители', rep_total_hours: 'Общо часове',
    rep_total_salary: 'Общи заплати', export_title: '⬇️ Изтегли отчет',
    kpi_hours: 'Работни часове', kpi_month: 'за месеца', kpi_salary: 'Заплата (лв.)',
    kpi_avg: 'Средно / ден', kpi_avg_sub: 'часа на работен ден',
    kpi_fines: 'Наказания (лв.)', goal_title: '🎯 Месечна цел',
    goal_desc: 'Целеви часове за месеца', goal_label: 'Целеви часове',
    this_week: '⚡ Тази седмица', upcoming_shifts: '🗓️ Предстоящи смени',
    no_shifts_week: 'Няма смени тази седмица.', no_upcoming: 'Няма планирани смени.',
    no_history: 'Няма данни за избрания месец.', legend_worked: 'Пълна смяна',
    legend_partial: 'Частична', legend_fine: 'Наказание', legend_planned: 'Планирана',
    legend_today: 'Днес', sched_days: 'Насрочени дни', sched_hours: 'Планирани часа',
    sched_worked: 'Отработени дни', stats_month: '📊 Статистика за месеца',
    settings_title: '⚙️ Настройки', setting_lang: 'Език',
    setting_lang_desc: 'Смяна на езика на приложението', setting_theme: '🌙 Тъмна тема',
    setting_theme_desc: 'Превключи тема', setting_notifs: '🔔 Дневни известия',
    notifs_desc: 'Напомняне за часовете', notif_time: '⏰ Час за напомняне',
    rate_desc: 'Зададена от мениджъра', lbl_work_days: 'Работни дни',
    err_wrong_creds: 'Грешно потребителско име или парола.',
    err_deactivated: 'Акаунтът е деактивиран. Свържете се с мениджъра.',
    arrived: '✓ Дошъл', absent: '✗ Отсъства', fined: '⚠ Наказан',
    btn_edit: '✏️', btn_delete: '🗑',
    status_present: '✓ Дошъл', status_absent: '✗ Отсъства',
    status_penalty: '⚠ Наказание', status_partial: '◑ Частично', status_pending: '— Неотбелязан',
  },
  en: {
    login_sub: 'Workforce Management', lbl_username: 'Username', lbl_password: 'Password',
    btn_login: 'Login', hint_manager: 'Manager', hint_employees: 'Employees',
    role_manager: 'Manager', role_employee: 'Employee', btn_logout: 'Logout',
    tab_today: 'Today', tab_schedule: 'Schedule', tab_employees: 'Employees',
    tab_fines: 'Fines', tab_reports: 'Reports', tab_notifs: 'Notifications',
    tab_profile: 'Profile', tab_dashboard: 'Dashboard', tab_calendar: 'Calendar',
    tab_history: 'History', today_title: '📋 Today\'s View', cal_monthly: '📅 Monthly Schedule',
    cal_weekly: '📅 Weekly View', stat_scheduled: 'Scheduled', stat_arrived: 'Arrived',
    stat_absent: 'Absent', stat_pending: 'Unmarked', btn_add: 'Add', btn_new_emp: 'New Employee',
    btn_cancel: 'Cancel', btn_create: 'Create', btn_save: 'Save', btn_change: 'Change',
    filter_type: 'Shift type:', filter_all: 'All', filter_all_emp: 'All employees',
    lbl_period: 'Period:', lbl_filter: 'Filter:', lbl_employee: 'Employee',
    lbl_hours: 'Hours', lbl_days: 'Days', lbl_salary: 'Salary', lbl_net: 'Net',
    lbl_fullname: 'Full name', lbl_rate: 'Hourly rate (BGN/h)',
    rep_active_emp: 'Active employees', rep_total_hours: 'Total hours',
    rep_total_salary: 'Total salaries', export_title: '⬇️ Download report',
    kpi_hours: 'Working hours', kpi_month: 'this month', kpi_salary: 'Salary (BGN)',
    kpi_avg: 'Avg / day', kpi_avg_sub: 'hours per working day',
    kpi_fines: 'Fines (BGN)', goal_title: '🎯 Monthly Goal',
    goal_desc: 'Target hours for the month', goal_label: 'Target hours',
    this_week: '⚡ This week', upcoming_shifts: '🗓️ Upcoming shifts',
    no_shifts_week: 'No shifts this week.', no_upcoming: 'No planned shifts.',
    no_history: 'No data for selected month.', legend_worked: 'Full shift',
    legend_partial: 'Partial', legend_fine: 'Fine', legend_planned: 'Planned',
    legend_today: 'Today', sched_days: 'Scheduled days', sched_hours: 'Planned hours',
    sched_worked: 'Worked days', stats_month: '📊 Monthly stats',
    settings_title: '⚙️ Settings', setting_lang: 'Language',
    setting_lang_desc: 'Change app language', setting_theme: '🌙 Dark theme',
    setting_theme_desc: 'Toggle theme', setting_notifs: '🔔 Daily notifications',
    notifs_desc: 'Reminder to log hours', notif_time: '⏰ Reminder time',
    rate_desc: 'Set by manager', lbl_work_days: 'Working days',
    err_wrong_creds: 'Wrong username or password.',
    err_deactivated: 'Account is deactivated. Contact your manager.',
    arrived: '✓ Arrived', absent: '✗ Absent', fined: '⚠ Fined',
    btn_edit: '✏️', btn_delete: '🗑',
    status_present: '✓ Arrived', status_absent: '✗ Absent',
    status_penalty: '⚠ Fine', status_partial: '◑ Partial', status_pending: '— Unmarked',
  },
  ru: {
    login_sub: 'Управление персоналом', lbl_username: 'Логин', lbl_password: 'Пароль',
    btn_login: 'Войти', hint_manager: 'Менеджер', hint_employees: 'Сотрудники',
    role_manager: 'Менеджер', role_employee: 'Сотрудник', btn_logout: 'Выйти',
    tab_today: 'Сегодня', tab_schedule: 'График', tab_employees: 'Сотрудники',
    tab_fines: 'Штрафы', tab_reports: 'Отчёты', tab_notifs: 'Уведомления',
    tab_profile: 'Профиль', tab_dashboard: 'Панель', tab_calendar: 'Календарь',
    tab_history: 'История', today_title: '📋 Сегодняшний вид', cal_monthly: '📅 Месячный график',
    cal_weekly: '📅 Недельный вид', stat_scheduled: 'Запланировано',
    stat_arrived: 'Пришли', stat_absent: 'Отсутствуют', stat_pending: 'Не отмечены',
    btn_add: 'Добавить', btn_new_emp: 'Новый сотрудник', btn_cancel: 'Отмена',
    btn_create: 'Создать', btn_save: 'Сохранить', btn_change: 'Изменить',
    filter_type: 'Тип смены:', filter_all: 'Все', filter_all_emp: 'Все сотрудники',
    lbl_period: 'Период:', lbl_filter: 'Фильтр:', lbl_employee: 'Сотрудник',
    lbl_hours: 'Часы', lbl_days: 'Дни', lbl_salary: 'Зарплата', lbl_net: 'Нетто',
    lbl_fullname: 'Полное имя', lbl_rate: 'Часовая ставка',
    rep_active_emp: 'Активные сотрудники', rep_total_hours: 'Всего часов',
    rep_total_salary: 'Общая зарплата', export_title: '⬇️ Скачать отчёт',
    kpi_hours: 'Рабочие часы', kpi_month: 'за месяц', kpi_salary: 'Зарплата (лв.)',
    kpi_avg: 'Среднее / день', kpi_avg_sub: 'часов в рабочий день',
    kpi_fines: 'Штрафы (лв.)', goal_title: '🎯 Месячная цель',
    goal_desc: 'Целевые часы за месяц', goal_label: 'Целевые часы',
    this_week: '⚡ Эта неделя', upcoming_shifts: '🗓️ Предстоящие смены',
    no_shifts_week: 'Нет смен на этой неделе.', no_upcoming: 'Нет запланированных смен.',
    no_history: 'Нет данных за выбранный месяц.', legend_worked: 'Полная смена',
    legend_partial: 'Частичная', legend_fine: 'Штраф', legend_planned: 'Запланирована',
    legend_today: 'Сегодня', sched_days: 'Запланированные дни', sched_hours: 'Плановые часы',
    sched_worked: 'Отработанные дни', stats_month: '📊 Статистика за месяц',
    settings_title: '⚙️ Настройки', setting_lang: 'Язык',
    setting_lang_desc: 'Изменить язык приложения', setting_theme: '🌙 Тёмная тема',
    setting_theme_desc: 'Переключить тему', setting_notifs: '🔔 Ежедневные уведомления',
    notifs_desc: 'Напоминание о часах', notif_time: '⏰ Время напоминания',
    rate_desc: 'Задано менеджером', lbl_work_days: 'Рабочие дни',
    err_wrong_creds: 'Неверный логин или пароль.',
    err_deactivated: 'Аккаунт деактивирован. Обратитесь к менеджеру.',
    arrived: '✓ Пришёл', absent: '✗ Отсутствует', fined: '⚠ Штраф',
    btn_edit: '✏️', btn_delete: '🗑',
    status_present: '✓ Пришёл', status_absent: '✗ Отсутствует',
    status_penalty: '⚠ Штраф', status_partial: '◑ Частично', status_pending: '— Не отмечен',
  }
};

const I18N = {
  lang: 'bg',
  t(key) { return (TRANSLATIONS[this.lang] || TRANSLATIONS.bg)[key] || key; },
  apply() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const k = el.dataset.i18n;
      el.textContent = this.t(k);
    });
    // Sync lang buttons
    document.querySelectorAll('.lang-btn').forEach(b => {
      const code = b.textContent.toLowerCase().trim();
      const fullMap = { bg: 'bg', en: 'en', ru: 'ru', 'български': 'bg', english: 'en', 'русский': 'ru' };
      b.classList.toggle('active', fullMap[code] === this.lang);
    });
  }
};

function setLang(lang, btn) {
  I18N.lang = lang;
  localStorage.setItem('sf_lang', lang);
  I18N.apply();
}
function applyLang() {
  I18N.lang = localStorage.getItem('sf_lang') || 'bg';
  I18N.apply();
}

// ============================================================
// CONSTANTS
// ============================================================
const MONTHS_BG = ['Януари', 'Февруари', 'Март', 'Април', 'Май', 'Юни', 'Юли', 'Август', 'Септември', 'Октомври', 'Ноември', 'Декември'];
const MONTHS_EN = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const MONTHS_RU = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
const DAYS_BG = ['Неделя', 'Понеделник', 'Вторник', 'Сряда', 'Четвъртък', 'Петък', 'Събота'];

const SHIFT_TYPE_MAP = {
  regular: { label: 'Обичайна', cls: 'shift-reg', icon: '🔵' },
  '6h': { label: '6 часа', cls: 'shift-6h', icon: '🟢' },
  '12h': { label: '12 часа', cls: 'shift-12h', icon: '🟠' },
  weekend: { label: 'Уикенд', cls: 'shift-wknd', icon: '🟣' },
  overtime: { label: 'Извънреден', cls: 'shift-ot', icon: '🔴' },
  dayoff: { label: 'Почивен', cls: 'shift-off', icon: '⭕' },
};

function monthsArr() {
  if (I18N.lang === 'en') return MONTHS_EN;
  if (I18N.lang === 'ru') return MONTHS_RU;
  return MONTHS_BG;
}

// ── Date helpers ──────────────────────────────────────────────
function fmtDate(d) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}
function fmtDateBG(s) {
  const d = new Date(s + 'T00:00:00'); const M = monthsArr();
  return `${d.getDate()} ${M[d.getMonth()]} ${d.getFullYear()}`;
}
function fmtDayBG(s) {
  const d = new Date(s + 'T00:00:00');
  return `${DAYS_BG[d.getDay()]}, ${d.getDate()} ${monthsArr()[d.getMonth()]}`;
}
function fmtMonth(y, m) { return `${monthsArr()[m]} ${y}`; }
function getMonthRange(y, m) {
  return { from: `${y}-${String(m + 1).padStart(2, '0')}-01`, to: `${y}-${String(m + 1).padStart(2, '0')}-${new Date(y, m + 1, 0).getDate()}` };
}
function getWeekRange(base) {
  const d = new Date(base), day = d.getDay();
  const mon = new Date(d); mon.setDate(d.getDate() - (day === 0 ? 6 : day - 1));
  const sun = new Date(mon); sun.setDate(mon.getDate() + 6);
  return { from: fmtDate(mon), to: fmtDate(sun), monday: mon, sunday: sun };
}
function initials(name) { return (name || '?').split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase(); }
function isWeekend(s) { const d = new Date(s + 'T00:00:00').getDay(); return d === 0 || d === 6; }

// ── Animated counter ─────────────────────────────────────────
function animateCounter(el, target, suffix = '') {
  if (!el) return;
  const start = parseFloat(el.textContent) || 0, dur = 600, t0 = performance.now();
  const step = now => {
    const p = Math.min((now - t0) / dur, 1), e = 1 - Math.pow(1 - p, 3);
    const v = start + (target - start) * e;
    el.textContent = Number.isInteger(target) ? Math.round(v) + suffix : v.toFixed(1) + suffix;
    p < 1 ? requestAnimationFrame(step) : (el.textContent = target + suffix);
  };
  requestAnimationFrame(step);
}

// ── Toast / Modal ─────────────────────────────────────────────
function showToast(msg, type = 'success') {
  const t = document.getElementById('toast'); if (!t) return;
  t.textContent = msg; t.className = `toast ${type}`;
  clearTimeout(t._t); t._t = setTimeout(() => t.classList.add('hidden'), 3200);
}
function openModal(id) { document.getElementById(id)?.classList.remove('hidden'); }
function closeModal(id) { document.getElementById(id)?.classList.add('hidden'); }
function logout() { Auth.logout(); }

document.addEventListener('click', e => { if (e.target.classList.contains('modal-overlay')) e.target.classList.add('hidden'); });

// ── Theme ────────────────────────────────────────────────────
function toggleTheme() {
  document.body.classList.toggle('light');
  const L = document.body.classList.contains('light');
  localStorage.setItem('sf_theme', L ? 'light' : 'dark');
  const btn = document.getElementById('theme-btn'); if (btn) btn.textContent = L ? '☀️' : '🌙';
  ['theme-toggle', 'mgr-theme-toggle'].forEach(id => { const t = document.getElementById(id); if (t) t.checked = L; });
}
function toggleThemeSwitch(cb) {
  document.body.classList.toggle('light', cb.checked);
  localStorage.setItem('sf_theme', cb.checked ? 'light' : 'dark');
  const btn = document.getElementById('theme-btn'); if (btn) btn.textContent = cb.checked ? '☀️' : '🌙';
}
function applyTheme() {
  const L = localStorage.getItem('sf_theme') === 'light';
  if (L) document.body.classList.add('light');
  const btn = document.getElementById('theme-btn'); if (btn) btn.textContent = L ? '☀️' : '🌙';
  ['theme-toggle', 'mgr-theme-toggle'].forEach(id => { const t = document.getElementById(id); if (t) t.checked = L; });
}

// ── Tab switch ────────────────────────────────────────────────
function switchTab(name) {
  document.querySelectorAll('.tab-section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.toggle('active', b.dataset.tab === name));
  const sec = document.getElementById('tab-' + name); if (sec) sec.classList.add('active');
  // Lazy renders
  if (name === 'emp-schedule') renderEmpSchedule();
  if (name === 'profile') renderProfile();
  if (name === 'mgr-profile') renderMgrProfile();
  if (name === 'reports') renderReports();
  if (name === 'emp-notifs') renderEmpNotifs();
  if (name === 'mgr-notifs') renderMgrNotifs();
  if (name === 'mgr-schedule') { renderMgrCalendar(); renderScheduleTab(); }
}

// ── Status / badge ────────────────────────────────────────────
function statusPill(status) {
  const map = {
    present: ['present', I18N.t('status_present')],
    absent: ['absent', I18N.t('status_absent')],
    penalty: ['penalty', I18N.t('status_penalty')],
    partial: ['penalty', I18N.t('status_partial')],
    pending: ['pending', I18N.t('status_pending')],
  };
  const [cls, label] = map[status] || map.pending;
  return `<span class="status-pill ${cls}">${label}</span>`;
}
function shiftBadge(type) {
  const info = SHIFT_TYPE_MAP[type] || SHIFT_TYPE_MAP.regular;
  return `<span class="shift-badge ${info.cls}">${info.icon} ${info.label}</span>`;
}

// ============================================================
// LOGIN
// ============================================================
async function handleLogin() {
  const username = document.getElementById('username')?.value.trim();
  const password = document.getElementById('password')?.value.trim();
  const errEl = document.getElementById('login-error');
  const btn = document.getElementById('login-btn');
  const btnText = document.getElementById('login-btn-text');
  const spinner = document.getElementById('login-spinner');
  if (!username || !password) { errEl.textContent = I18N.t('err_wrong_creds'); errEl.classList.remove('hidden'); return; }
  errEl.classList.add('hidden');
  btnText.textContent = '...'; spinner?.classList.remove('hidden'); btn.disabled = true;
  try {
    const user = await Auth.login(username, password);
    if (user.role === 'superadmin') window.location.href = 'superadmin.html';
    else if (user.role === 'manager') window.location.href = 'manager.html';
    else window.location.href = 'employee.html';
  } catch (err) {
    errEl.textContent = err.message; errEl.classList.remove('hidden');
    btnText.textContent = I18N.t('btn_login'); spinner?.classList.add('hidden'); btn.disabled = false;
  }
}

// ============================================================
// MANAGER STATE
// ============================================================
let mgr = {
  employees: [],
  weekBase: new Date(),
  viewDate: fmtDate(new Date()),
  shiftTypeFilter: 'all',
  reportYear: new Date().getFullYear(),
  reportMonth: new Date().getMonth(),
  calYear: new Date().getFullYear(),
  calMonth: new Date().getMonth(),
};

function initManagerDashboard() {
  applyTheme(); applyLang();
  const user = Auth.requireRole('manager'); if (!user) return;
  document.getElementById('nav-username').textContent = user.name || user.username;
  // Scope all data to user's restaurant
  mgr.restaurantId = user.restaurantId || null;
  mgr.employees = DB.getEmployees(mgr.restaurantId);
  const dp = document.getElementById('view-date-picker'); if (dp) dp.value = mgr.viewDate;
  renderTodayView();
  renderScheduleTab();
  renderMgrCalendar();
  renderEmployeesTab();
  renderPenaltiesTab();
  populateManagerSelects();
  updateMgrNotifBadge();
}

// ── TODAY VIEW ────────────────────────────────────────────────
function onDatePickerChange(val) {
  mgr.viewDate = val;
  document.getElementById('today-date-label').textContent = fmtDayBG(val);
  renderTodayView();
}

function renderTodayView() {
  const dateStr = mgr.viewDate;
  document.getElementById('today-date-label').textContent = fmtDayBG(dateStr);
  const scheduled = DB.getSchedulesByDate(dateStr).sort((a, b) => (DB.getEmployee(a.employee_id)?.name || '').localeCompare(DB.getEmployee(b.employee_id)?.name || ''));
  const shifts = DB.getShiftsByDate(dateStr);
  const shiftMap = {}; shifts.forEach(s => shiftMap[s.employee_id] = s);
  let arrived = 0, noshow = 0, pending = 0;
  const list = document.getElementById('today-list');
  list.innerHTML = '';

  if (scheduled.length === 0) {
    list.innerHTML = `<div class="glass-card"><div class="empty-state">Няма насрочени служители за тази дата.<br>Добави ги от таба „График".</div></div>`;
  }

  document.getElementById('stat-scheduled').textContent = scheduled.length;

  scheduled.forEach(sched => {
    const emp2 = DB.getEmployee(sched.employee_id); if (!emp2) return;
    const shift = shiftMap[emp2.id];
    const status = shift ? shift.status : 'pending';
    if (status === 'present' || status === 'partial') arrived++;
    else if (status === 'absent') noshow++;
    else pending++;

    // Mobile-card style row
    const card = document.createElement('div');
    card.className = 'today-emp-card glass-card';
    card.innerHTML = `
      <div class="today-card-top">
        <div class="today-emp-info">
          <div class="today-avatar">${initials(emp2.name)}</div>
          <div>
            <div class="today-emp-name">${emp2.name}</div>
            <div class="today-emp-meta">${shiftBadge(sched.shift_type || 'regular')} <span class="today-hours">${sched.planned_hours}ч</span></div>
          </div>
        </div>
        <div>${statusPill(status)}</div>
      </div>
      ${shift?.checkin_time ? `<div class="today-checkin">🕐 Check-in: ${shift.checkin_time}</div>` : ''}
      <div class="today-card-actions">
        ${buildTodayCardActions(emp2.id, sched, shift)}
      </div>
      <div class="quick-fine-inline hidden" id="qfi-${emp2.id}">
        <div style="display:flex;gap:6px;margin-bottom:6px;">
          <input type="number" id="qfi-amt-${emp2.id}" class="form-input" placeholder="Сума лв." step="0.5" style="flex:0.4;min-width:80px;" />
          <input type="text" id="qfi-reason-${emp2.id}" class="form-input" placeholder="Причина..." style="flex:1;" />
        </div>
        <div style="display:flex;gap:6px;justify-content:flex-end;">
          <button class="btn btn-ghost btn-sm" onclick="hideInlineFine('${emp2.id}')">Отказ</button>
          <button class="btn btn-danger btn-sm" onclick="submitInlineFine('${emp2.id}','${dateStr}')">⚠️ Запиши</button>
        </div>
      </div>
    `;
    list.appendChild(card);
  });

  document.getElementById('stat-arrived').textContent = arrived;
  document.getElementById('stat-noshow').textContent = noshow;
  document.getElementById('stat-pending').textContent = pending;
}

function buildTodayCardActions(empId, sched, shift) {
  if (shift && (shift.status === 'present' || shift.status === 'partial')) {
    return `<button class="btn btn-outline btn-sm" onclick="openEditHours('${shift.id}','${empId}','${shift.worked_hours}','${shift.status}','${shift.note || ''}','${shift.checkin_time || ''}')">✏️ Редактирай</button>
            <button class="btn btn-warn btn-sm" onclick="showInlineFine('${empId}')">⚠ Наказание</button>`;
  }
  if (shift && shift.status === 'absent') {
    return `<button class="btn btn-outline btn-sm" onclick="openEditHours('${shift.id}','${empId}','0','absent','','')">✏️ Редактирай</button>`;
  }
  return `
    <button class="btn btn-success btn-sm" onclick="markArrived('${empId}','${sched.planned_hours}')">✓ ${I18N.t('arrived')}</button>
    <button class="btn btn-warn btn-sm" onclick="markNoShow('${empId}')">✗ ${I18N.t('absent')}</button>
    <button class="btn btn-danger btn-sm" onclick="showInlineFine('${empId}')">⚠ ${I18N.t('fined')}</button>
  `;
}

function markArrived(empId, hours) {
  const now = new Date();
  const checkin = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  DB.upsertShift({ employee_id: empId, date: mgr.viewDate, worked_hours: parseFloat(hours), status: 'present', note: '', checkin_time: checkin });
  showToast('Отбелязан като „Дошъл" ✓');
  renderTodayView();
}
function markNoShow(empId) {
  DB.upsertShift({ employee_id: empId, date: mgr.viewDate, worked_hours: 0, status: 'absent', note: 'Не се е явил', checkin_time: null });
  showToast('Отбелязан като „Отсъства"', 'error');
  renderTodayView();
}

// Inline fine
function showInlineFine(empId) {
  document.querySelectorAll('.quick-fine-inline').forEach(el => el.classList.add('hidden'));
  document.getElementById(`qfi-${empId}`)?.classList.remove('hidden');
}
function hideInlineFine(empId) {
  document.getElementById(`qfi-${empId}`)?.classList.add('hidden');
}
function submitInlineFine(empId, date) {
  const amt = parseFloat(document.getElementById(`qfi-amt-${empId}`)?.value);
  const reason = document.getElementById(`qfi-reason-${empId}`)?.value.trim();
  if (isNaN(amt) || amt <= 0) { showToast('Въведи сума', 'error'); return; }
  DB.addPenalty({ employee_id: empId, amount: amt, note: reason || 'Наказание', date });
  DB.upsertShift({ employee_id: empId, date, worked_hours: 0, status: 'penalty', note: reason || '' });
  hideInlineFine(empId);
  showToast(`Наказанието е записано (-${amt} лв.)`, 'error');
  renderTodayView();
  renderPenaltiesTab();
}

// Quick fine modal (from penalty button in modal)
function openQuickFine(empId) {
  const emp2 = DB.getEmployee(empId);
  document.getElementById('quick-fine-emp-name').textContent = emp2 ? emp2.name : '—';
  document.getElementById('qf-emp-id').value = empId;
  document.getElementById('qf-amount').value = '';
  document.getElementById('qf-reason').value = '';
  openModal('modal-quick-fine');
}
function saveQuickFine() {
  const empId = document.getElementById('qf-emp-id').value;
  const amt = parseFloat(document.getElementById('qf-amount').value);
  const reason = document.getElementById('qf-reason').value.trim();
  if (isNaN(amt) || amt <= 0) { showToast('Въведи сума', 'error'); return; }
  DB.addPenalty({ employee_id: empId, amount: amt, note: reason || 'Наказание', date: mgr.viewDate });
  closeModal('modal-quick-fine');
  showToast(`Наказание добавено: -${amt} лв.`, 'error');
  renderPenaltiesTab(); renderTodayView();
}

// Edit shift modal
function openEditHours(shiftId, empId, hours, status, note, checkin) {
  const emp2 = DB.getEmployee(empId);
  document.getElementById('edit-emp-name').value = emp2 ? emp2.name : empId;
  document.getElementById('edit-hours').value = hours;
  document.getElementById('edit-status').value = status === 'pending' ? 'present' : status;
  document.getElementById('edit-note').value = note || '';
  document.getElementById('edit-checkin-time').value = checkin || '';
  document.getElementById('edit-shift-id').value = shiftId;
  document.getElementById('edit-shift-id').dataset.empId = empId;
  openModal('modal-edit-hours');
}
function saveEditedHours() {
  const shiftId = document.getElementById('edit-shift-id').value;
  const empId = document.getElementById('edit-shift-id').dataset.empId;
  const hours = parseFloat(document.getElementById('edit-hours').value);
  const status = document.getElementById('edit-status').value;
  const note = document.getElementById('edit-note').value.trim();
  const checkin = document.getElementById('edit-checkin-time').value || null;
  if (isNaN(hours) || hours < 0) { showToast('Невалидни часове', 'error'); return; }
  if (shiftId) DB.updateShift(shiftId, { worked_hours: hours, status, note, checkin_time: checkin });
  else DB.upsertShift({ employee_id: empId, date: mgr.viewDate, worked_hours: hours, status, note, checkin_time: checkin });
  closeModal('modal-edit-hours');
  showToast('Смяната е записана ✓');
  renderTodayView();
}

// ── MANAGER CALENDAR ──────────────────────────────────────────
function renderMgrCalendar() {
  const y = mgr.calYear, m = mgr.calMonth;
  const el = document.getElementById('mgr-cal-month-label');
  if (el) el.textContent = fmtMonth(y, m);
  const grid = document.getElementById('mgr-cal-grid'); if (!grid) return;
  grid.innerHTML = '';
  const { from, to } = getMonthRange(y, m);
  const schedules = DB.getSchedules(from, to);
  const shifts = DB.getShifts(null, from, to);

  const schedByDate = {};
  schedules.forEach(s => { if (!schedByDate[s.date]) schedByDate[s.date] = []; schedByDate[s.date].push(s); });
  const shiftsByDate = {};
  shifts.forEach(s => { if (!shiftsByDate[s.date]) shiftsByDate[s.date] = []; shiftsByDate[s.date].push(s); });

  let startOff = new Date(y, m, 1).getDay() - 1; if (startOff < 0) startOff = 6;
  for (let i = 0; i < startOff; i++) { const e = document.createElement('div'); e.className = 'cal-day empty'; grid.appendChild(e); }

  const days = new Date(y, m + 1, 0).getDate();
  const todayStr = fmtDate(new Date());

  for (let day = 1; day <= days; day++) {
    const dateStr = `${y}-${String(m + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const dayScheds = schedByDate[dateStr] || [];
    const dayShifts = shiftsByDate[dateStr] || [];
    const isToday = dateStr === todayStr;
    const wknd = isWeekend(dateStr);

    let cls = 'cal-day';
    if (isToday) cls += ' today';
    if (wknd) cls += ' weekend';
    if (dayShifts.some(s => s.status === 'absent')) cls += ' absent';
    else if (dayShifts.some(s => s.worked_hours > 0)) cls += ' worked';
    else if (dayScheds.length > 0 && dateStr > todayStr) cls += ' scheduled';

    const el = document.createElement('div');
    el.className = cls;
    el.innerHTML = `<span>${day}</span>${dayScheds.length > 0 ? `<span class="cal-hours">${dayScheds.length}👤</span>` : ''}`;
    el.onclick = () => {
      showMgrDayDetail(dateStr, dayScheds, dayShifts);
      document.getElementById('sched-date').value = dateStr;
      openModal('modal-add-schedule');
    };
    grid.appendChild(el);
  }
}

function showMgrDayDetail(dateStr, dayScheds, dayShifts) {
  const detail = document.getElementById('mgr-day-detail');
  const title = document.getElementById('mgr-day-detail-title');
  const content = document.getElementById('mgr-day-detail-content');
  if (!detail) return;
  title.textContent = fmtDateBG(dateStr);
  const shiftMap = {}; dayShifts.forEach(s => shiftMap[s.employee_id] = s);

  let html = '';
  if (dayScheds.length === 0) { html = '<p style="color:var(--text-faint);font-size:0.82rem;">Няма насрочени служители.</p>'; }
  dayScheds.forEach(sc => {
    const emp2 = DB.getEmployee(sc.employee_id);
    const shift = shiftMap[sc.employee_id];
    html += `<div class="shift-item">
      <div class="shift-left">
        <span class="shift-name">${emp2?.name || '—'}</span>
        <span class="shift-date">${shiftBadge(sc.shift_type || 'regular')} ${sc.planned_hours}ч</span>
      </div>
      <div class="shift-right">
        ${shift ? `<span class="shift-hours">${shift.worked_hours}ч</span>${statusPill(shift.status)}` : statusPill('pending')}
      </div>
    </div>`;
  });
  content.innerHTML = html;
  detail.classList.remove('hidden');
}

function changeMgrCalMonth(dir) {
  mgr.calMonth += dir;
  if (mgr.calMonth < 0) { mgr.calMonth = 11; mgr.calYear--; }
  if (mgr.calMonth > 11) { mgr.calMonth = 0; mgr.calYear++; }
  document.getElementById('mgr-day-detail')?.classList.add('hidden');
  renderMgrCalendar();
}

// ── SCHEDULE TAB ──────────────────────────────────────────────
function renderScheduleTab() {
  const { from, to, monday, sunday } = getWeekRange(mgr.weekBase);
  const monL = `${monday.getDate()} ${monthsArr()[monday.getMonth()]}`;
  const sunL = `${sunday.getDate()} ${monthsArr()[sunday.getMonth()]}`;
  document.getElementById('week-label').textContent = `${monL} — ${sunL}`;

  let scheds = DB.getSchedules(from, to);
  if (mgr.shiftTypeFilter !== 'all') scheds = scheds.filter(s => (s.shift_type || 'regular') === mgr.shiftTypeFilter);

  const grid = document.getElementById('schedule-grid'); grid.innerHTML = '';
  const todayStr = fmtDate(new Date());

  for (let i = 0; i < 7; i++) {
    const d = new Date(monday); d.setDate(monday.getDate() + i);
    const dateStr = fmtDate(d);
    const dayScheds = scheds.filter(s => s.date === dateStr)
      .sort((a, b) => (DB.getEmployee(a.employee_id)?.name || '').localeCompare(DB.getEmployee(b.employee_id)?.name || ''));
    const group = document.createElement('div'); group.className = 'sched-day-group';
    const isToday = dateStr === todayStr;
    group.innerHTML = `<div class="sched-day-title${isToday ? ' today-label' : ''}">${DAYS_BG[d.getDay()]} ${d.getDate()} ${monthsArr()[d.getMonth()]}${isToday ? ' — Днес' : ''}</div>`;
    if (dayScheds.length === 0) { group.innerHTML += `<div style="font-size:0.72rem;color:var(--text-faint);padding:4px 6px;">Почивен ден</div>`; }
    dayScheds.forEach(s => {
      const emp2 = DB.getEmployee(s.employee_id);
      const row = document.createElement('div'); row.className = 'sched-row';
      row.innerHTML = `
        <span class="sched-emp-name">${emp2 ? emp2.name : '—'}</span>
        <div class="sched-meta">
          ${shiftBadge(s.shift_type || 'regular')}
          ${s.note ? `<span class="sched-note">${s.note}</span>` : ''}
          <span class="sched-hours-badge">${s.planned_hours}ч</span>
          <button class="icon-btn" style="font-size:0.8rem" onclick="deleteScheduleEntry('${s.id}')" title="Изтрий">🗑</button>
        </div>`;
      group.appendChild(row);
    });
    grid.appendChild(group);
  }
}

function changeWeek(dir) { mgr.weekBase.setDate(mgr.weekBase.getDate() + dir * 7); renderScheduleTab(); }

function filterShiftType(type, btn) {
  mgr.shiftTypeFilter = type;
  document.querySelectorAll('.shift-filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderScheduleTab();
}
function selectShiftType(type, btn) {
  document.querySelectorAll('.stype-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('sched-type').value = type;
  const hm = { regular: 8, '6h': 6, '12h': 12, weekend: 8, overtime: 10, dayoff: 0 };
  if (hm[type] !== undefined) document.getElementById('sched-hours').value = hm[type];
}
function setHours(h) { document.getElementById('sched-hours').value = h; }
function addSchedule() {
  const empId = document.getElementById('sched-emp').value;
  const date = document.getElementById('sched-date').value;
  const hours = parseFloat(document.getElementById('sched-hours').value);
  const type = document.getElementById('sched-type').value || 'regular';
  const note = document.getElementById('sched-note').value.trim();
  if (!empId || !date || isNaN(hours) || hours < 0) { showToast('Попълни всички полета', 'error'); return; }
  DB.addSchedule({ employee_id: empId, date, planned_hours: hours, shift_type: type, note });
  closeModal('modal-add-schedule');
  showToast('Добавено в графика ✓');
  document.getElementById('sched-hours').value = ''; document.getElementById('sched-note').value = '';
  renderScheduleTab(); renderTodayView(); renderMgrCalendar();
}
function deleteScheduleEntry(id) {
  DB.deleteSchedule(id);
  showToast('Изтрито от графика');
  renderScheduleTab(); renderTodayView(); renderMgrCalendar();
}

// ── EMPLOYEES TAB ─────────────────────────────────────────────
function renderEmployeesTab() {
  const emps = DB.getEmployees(mgr.restaurantId).sort((a, b) => a.name.localeCompare(b.name));
  const grid = document.getElementById('employees-grid'); grid.innerHTML = '';
  if (emps.length === 0) { grid.innerHTML = '<div class="empty-state">Няма служители.</div>'; return; }
  const { from, to } = getMonthRange(new Date().getFullYear(), new Date().getMonth());
  emps.forEach(emp2 => {
    const shifts = DB.getShifts(emp2.id, from, to);
    const totalH = shifts.reduce((s, sh) => s + parseFloat(sh.worked_hours || 0), 0);
    const penSum = DB.getPenalties(emp2.id).filter(p => p.date >= from && p.date <= to).reduce((s, p) => s + parseFloat(p.amount || 0), 0);
    const salary = Math.max(0, totalH * parseFloat(emp2.hourly_rate || 0) - penSum);
    const inactive = emp2.status === 'inactive';
    const card = document.createElement('div');
    card.className = `emp-card glass-card${inactive ? ' emp-inactive' : ''}`;
    card.innerHTML = `
      <div class="emp-card-header">
        <div class="emp-avatar" style="${inactive ? 'opacity:0.5' : ''}'">${initials(emp2.name)}</div>
        <div>
          <div class="emp-card-name">${emp2.name}${inactive ? ' <span style="font-size:0.65rem;color:var(--red)">[Деактивиран]</span>' : ''}</div>
          <div class="emp-card-user">@${emp2.username}</div>
        </div>
      </div>
      <div class="emp-card-stats">
        <div class="emp-stat"><span class="emp-stat-val">${totalH}ч</span><span class="emp-stat-lbl">Часове</span></div>
        <div class="emp-stat"><span class="emp-stat-val">${salary.toFixed(0)} лв.</span><span class="emp-stat-lbl">Заплата</span></div>
        <div class="emp-stat"><span class="emp-stat-val">${emp2.hourly_rate} лв.</span><span class="emp-stat-lbl">на час</span></div>
      </div>
      <div class="emp-card-footer">
        <button class="btn btn-ghost btn-xs" onclick="openEditEmployee('${emp2.id}');event.stopPropagation()">✏️ Редактирай</button>
        <button class="btn btn-ghost btn-xs" onclick="openEmpDetail('${emp2.id}');event.stopPropagation()">📊 Детайли</button>
      </div>`;
    grid.appendChild(card);
  });
}

function openEditEmployee(empId) {
  const emp2 = DB.getEmployee(empId); if (!emp2) return;
  document.getElementById('edit-emp-id-field').value = empId;
  document.getElementById('edit-emp-name-field').value = emp2.name;
  document.getElementById('edit-emp-rate-field').value = emp2.hourly_rate;
  document.getElementById('edit-emp-pass-field').value = '';
  document.getElementById('edit-emp-status-field').value = emp2.status || 'active';
  openModal('modal-edit-employee');
}
function saveEditEmployee() {
  const id = document.getElementById('edit-emp-id-field').value;
  const name = document.getElementById('edit-emp-name-field').value.trim();
  const rate = parseFloat(document.getElementById('edit-emp-rate-field').value);
  const pass = document.getElementById('edit-emp-pass-field').value.trim();
  const status = document.getElementById('edit-emp-status-field').value;
  if (!name || isNaN(rate)) { showToast('Попълни полетата', 'error'); return; }
  const upd = { name, hourly_rate: rate, status };
  if (pass) upd.password = pass;
  DB.updateEmployee(id, upd);
  closeModal('modal-edit-employee');
  showToast('Служителят е обновен ✓');
  renderEmployeesTab(); populateManagerSelects();
}

function openEmpDetail(empId) {
  const emp2 = DB.getEmployee(empId); if (!emp2) return;
  const { from, to } = getMonthRange(new Date().getFullYear(), new Date().getMonth());
  const shifts = DB.getShifts(emp2.id, from, to);
  const pens = DB.getPenalties(emp2.id).filter(p => p.date >= from && p.date <= to);
  const totalH = shifts.reduce((s, sh) => s + parseFloat(sh.worked_hours || 0), 0);
  const penSum = pens.reduce((s, p) => s + parseFloat(p.amount || 0), 0);
  const salary = Math.max(0, totalH * parseFloat(emp2.hourly_rate || 0) - penSum);
  document.getElementById('emp-detail-title').textContent = emp2.name;
  document.getElementById('emp-detail-content').innerHTML = `
    <div class="profile-stats-grid" style="margin-bottom:1rem;">
      <div class="p-stat"><span class="p-val">${totalH}</span><span class="p-lbl">Часа</span></div>
      <div class="p-stat"><span class="p-val green">${salary.toFixed(0)} лв.</span><span class="p-lbl">Нето</span></div>
      <div class="p-stat"><span class="p-val red">${penSum.toFixed(0)} лв.</span><span class="p-lbl">Наказания</span></div>
      <div class="p-stat"><span class="p-val">${emp2.hourly_rate} лв.</span><span class="p-lbl">на час</span></div>
    </div>
    <div class="card-title" style="margin-bottom:0.5rem;">Последни смени</div>
    <div class="shifts-list">
      ${shifts.length ? shifts.sort((a, b) => b.date.localeCompare(a.date)).slice(0, 6).map(s => `
        <div class="shift-item">
          <div class="shift-left"><span class="shift-date">${fmtDateBG(s.date)}</span>${s.checkin_time ? `<span class="shift-note">🕐 ${s.checkin_time}</span>` : ''}</div>
          <div class="shift-right"><span class="shift-hours">${s.worked_hours}ч</span>${statusPill(s.status)}</div>
        </div>`).join('') : '<div class="empty-state">Няма данни</div>'}
    </div>`;
  openModal('modal-emp-detail');
}

function createEmployee() {
  const name = document.getElementById('new-emp-name').value.trim();
  const username = document.getElementById('new-emp-username').value.trim();
  const password = document.getElementById('new-emp-password').value.trim();
  const rate = parseFloat(document.getElementById('new-emp-rate').value);
  if (!name || !username || !password) { showToast('Попълни всички полета', 'error'); return; }
  try {
    DB.createEmployee({ name, username, password, hourly_rate: rate || 0, restaurantId: mgr.restaurantId });
    mgr.employees = DB.getEmployees(mgr.restaurantId);
    closeModal('modal-add-employee');
    showToast(`Служителят ${name} е създаден ✓`);
    ['new-emp-name', 'new-emp-username', 'new-emp-password', 'new-emp-rate'].forEach(id => document.getElementById(id).value = '');
    renderEmployeesTab(); populateManagerSelects();
  } catch (err) { showToast(err.message, 'error'); }
}

// ── PENALTIES TAB ─────────────────────────────────────────────
function renderPenaltiesTab() {
  const filterEmpId = document.getElementById('pen-filter-emp')?.value || '';
  let pens = DB.getPenalties(filterEmpId || null).sort((a, b) => b.date.localeCompare(a.date));
  const list = document.getElementById('penalties-list'); list.innerHTML = '';
  if (pens.length === 0) { list.innerHTML = '<div class="empty-state">Няма добавени наказания.</div>'; return; }
  pens.forEach(p => {
    const emp2 = DB.getEmployee(p.employee_id);
    const row = document.createElement('div'); row.className = 'penalty-row';
    row.innerHTML = `
      <div class="penalty-info">
        <div class="penalty-emp">${emp2 ? emp2.name : '—'}</div>
        <div class="penalty-note">${p.note || '—'}</div>
        <div class="penalty-date">${fmtDateBG(p.date)}</div>
      </div>
      <div class="penalty-right">
        <span class="penalty-amount">-${p.amount} лв.</span>
        <button class="btn btn-outline btn-xs" onclick="removePenalty('${p.id}')">🗑 Изтрий</button>
      </div>`;
    list.appendChild(row);
  });
}

function addPenalty() {
  const empId = document.getElementById('pen-emp').value;
  const amount = parseFloat(document.getElementById('pen-amount').value);
  const date = document.getElementById('pen-date').value;
  const note = document.getElementById('pen-note').value.trim();
  if (!empId || isNaN(amount) || !date) { showToast('Попълни всички полета', 'error'); return; }
  DB.addPenalty({ employee_id: empId, amount, date, note });
  closeModal('modal-add-penalty');
  showToast('Наказанието е добавено');
  document.getElementById('pen-amount').value = ''; document.getElementById('pen-note').value = '';
  renderPenaltiesTab();
}
function removePenalty(id) {
  DB.deletePenalty(id);
  showToast('Наказанието е премахнато');
  renderPenaltiesTab();
}

// ── REPORTS ───────────────────────────────────────────────────
function renderReports() {
  const { from, to } = getMonthRange(mgr.reportYear, mgr.reportMonth);
  document.getElementById('report-month-label').textContent = fmtMonth(mgr.reportYear, mgr.reportMonth);
  const emps = DB.getEmployees();
  let totH = 0, totSal = 0, totPen = 0;
  const tb = document.getElementById('report-table'); tb.innerHTML = '';
  emps.forEach(emp2 => {
    const shifts = DB.getShifts(emp2.id, from, to);
    const pens = DB.getPenalties(emp2.id).filter(p => p.date >= from && p.date <= to);
    const h = shifts.reduce((s, sh) => s + parseFloat(sh.worked_hours || 0), 0);
    const days = shifts.filter(s => s.worked_hours > 0).length;
    const penSum = pens.reduce((s, p) => s + parseFloat(p.amount || 0), 0);
    const sal = Math.max(0, h * parseFloat(emp2.hourly_rate || 0) - penSum);
    totH += h; totSal += sal; totPen += penSum;
    if (h === 0 && penSum === 0) return;
    const row = document.createElement('div'); row.className = 'table-row rep-cols';
    row.innerHTML = `<div class="emp-name">${emp2.name}</div><div class="emp-hours">${h}ч</div><div class="emp-hours">${days}</div>
      <div style="color:var(--red);font-family:monospace">${penSum > 0 ? '-' + penSum.toFixed(0) + ' лв.' : '—'}</div>
      <div class="emp-hours green">${sal.toFixed(0)} лв.</div>`;
    tb.appendChild(row);
  });
  if (!tb.innerHTML) tb.innerHTML = '<div class="empty-state">Няма данни за избрания месец.</div>';
  document.getElementById('rep-employees').textContent = emps.filter(e => DB.getShifts(e.id, from, to).length > 0).length;
  document.getElementById('rep-hours').textContent = totH + 'ч';
  document.getElementById('rep-salary').textContent = totSal.toFixed(0) + ' лв.';
  document.getElementById('rep-penalties').textContent = totPen.toFixed(0) + ' лв.';
}
function changeReportMonth(dir) {
  mgr.reportMonth += dir;
  if (mgr.reportMonth < 0) { mgr.reportMonth = 11; mgr.reportYear--; }
  if (mgr.reportMonth > 11) { mgr.reportMonth = 0; mgr.reportYear++; }
  renderReports();
}

// ── EXPORT ────────────────────────────────────────────────────
function buildExportData() {
  const { from, to } = getMonthRange(mgr.reportYear, mgr.reportMonth);
  const rows = [];
  DB.getEmployees().forEach(emp2 => {
    DB.getShifts(emp2.id, from, to).forEach(s => {
      const pens = DB.getPenalties(emp2.id).filter(p => p.date === s.date);
      const penSum = pens.reduce((sum, p) => sum + parseFloat(p.amount || 0), 0);
      rows.push({
        'Служител': emp2.name, 'Дата': s.date, 'Часове': s.worked_hours, 'Check-in': s.checkin_time || '',
        'Статус': s.status, 'Наказания': penSum || '', 'Причина': pens.map(p => p.note).join('; '), 'Заплата (лв.)': (s.worked_hours * parseFloat(emp2.hourly_rate || 0)).toFixed(2)
      });
    });
  });
  return rows;
}
function exportCSV() {
  const rows = buildExportData(); if (!rows.length) { showToast('Няма данни', 'error'); return; }
  const h = Object.keys(rows[0]);
  const csv = [h.join(','), ...rows.map(r => h.map(k => `"${r[k]}"`).join(','))].join('\n');
  dlFile(csv, `TimeLedger_Team_${mgr.reportYear}-${String(mgr.reportMonth + 1).padStart(2, '0')}.csv`, 'text/csv;charset=utf-8;');
  showToast('CSV изтеглен ✓');
}
function exportExcel() {
  const rows = buildExportData(); if (!rows.length) { showToast('Няма данни', 'error'); return; }
  const h = Object.keys(rows[0]);
  const html = `<html><head><meta charset="UTF-8"></head><body><table><tr>${h.map(x => `<th>${x}</th>`).join('')}</tr>${rows.map(r => `<tr>${h.map(k => `<td>${r[k]}</td>`).join('')}</tr>`).join('')}</table></body></html>`;
  dlFile(html, `TimeLedger_Team_${mgr.reportYear}-${String(mgr.reportMonth + 1).padStart(2, '0')}.xls`, 'application/vnd.ms-excel');
  showToast('Excel изтеглен ✓');
}
function exportPDF() {
  const rows = buildExportData(); if (!rows.length) { showToast('Няма данни', 'error'); return; }
  const h = Object.keys(rows[0]);
  const ml = fmtMonth(mgr.reportYear, mgr.reportMonth);
  const empSummary = {};
  DB.getEmployees().forEach(e => { empSummary[e.id] = { name: e.name, hours: 0, salary: 0, pens: 0, rate: e.hourly_rate }; });
  rows.forEach(r => {
    const e = Object.values(empSummary).find(x => x.name === r['Служител']);
    if (e) { e.hours += parseFloat(r['Часове'] || 0); e.salary += parseFloat(r['Заплата (лв.)'] || 0); e.pens += parseFloat(r['Наказания'] || 0); }
  });
  const win = window.open('', '_blank');
  win.document.write(`<!DOCTYPE html><html><head><meta charset="UTF-8"><title>TimeLedger Team — ${ml}</title>
  <style>*{box-sizing:border-box;margin:0;padding:0;font-family:Arial,sans-serif;}body{background:#0d1117;color:#e2e8f0;padding:2rem;}h1{color:#63b3ed;font-size:1.6rem;margin-bottom:0.25rem;}.sub{color:#8892a4;margin-bottom:2rem;font-size:0.85rem;}table{width:100%;border-collapse:collapse;margin-bottom:2rem;}th{background:#161b22;color:#63b3ed;padding:8px 10px;text-align:left;font-size:0.75rem;text-transform:uppercase;}td{padding:7px 10px;border-bottom:1px solid rgba(99,179,237,0.1);font-size:0.82rem;}.green{color:#68d391;}.red{color:#fc8181;}@media print{body{background:white;color:black;}th{background:#eee;color:#333;}}</style>
  </head><body><h1>⏱ TimeLedger Team — Отчет</h1><div class="sub">${ml} · ${new Date().toLocaleDateString('bg-BG')}</div>
  <table><tr><th>Служител</th><th>Часове</th><th>Ставка</th><th>Наказания</th><th>Нето</th></tr>
  ${Object.values(empSummary).filter(e => e.hours > 0).map(e => `<tr><td><strong>${e.name}</strong></td><td>${e.hours}ч</td><td>${e.rate} лв./ч</td><td class="red">${e.pens > 0 ? '-' + e.pens.toFixed(0) + ' лв.' : '—'}</td><td class="green">${Math.max(0, e.salary - e.pens).toFixed(0)} лв.</td></tr>`).join('')}
  </table><table><tr>${h.map(x => `<th>${x}</th>`).join('')}</tr>${rows.slice(0, 50).map(r => `<tr>${h.map(k => `<td>${r[k] || ''}</td>`).join('')}</tr>`).join('')}</table>
  <script>window.onload=()=>window.print();<\/script></body></html>`);
  win.document.close();
  showToast('PDF отворен за печат ✓');
}
function dlFile(content, filename, mime) {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([content], { type: mime }));
  a.download = filename; a.click();
}

// ── NOTIFICATIONS (MANAGER) ───────────────────────────────────
function sendNotification() {
  const title = document.getElementById('notif-title-inline').value.trim();
  const message = document.getElementById('notif-msg-inline').value.trim();
  const target = document.getElementById('notif-target-inline').value || 'all';
  const user = Auth.getUser();
  if (!title || !message) { showToast('Въведи заглавие и съобщение', 'error'); return; }
  DB.addNotification({ from_id: user.id, from_name: user.name || user.username, title, message, target });
  document.getElementById('notif-title-inline').value = '';
  document.getElementById('notif-msg-inline').value = '';
  showToast('Известието е изпратено 📤');
  renderMgrNotifs();
}
function renderMgrNotifs() {
  const notifs = DB.getNotifications();
  const list = document.getElementById('sent-notifs-list'); if (!list) return;
  list.innerHTML = '';
  if (notifs.length === 0) { list.innerHTML = '<div class="empty-state">Няма изпратени известия.</div>'; return; }
  notifs.forEach(n => {
    const div = document.createElement('div'); div.className = 'notif-item';
    div.innerHTML = `
      <div class="notif-header">
        <span class="notif-title">${n.title}</span>
        <span class="notif-date">${fmtDateBG(n.date)}</span>
      </div>
      <div class="notif-msg">${n.message}</div>
      <div class="notif-meta">Прочели: ${n.read_by.length} служители</div>`;
    list.appendChild(div);
  });
}
function updateMgrNotifBadge() {
  const dot = document.getElementById('mgr-notif-dot');
  // Manager sees if there are any notifications to review
  if (dot) dot.classList.toggle('hidden', DB.getNotifications().length === 0);
}

// ── MANAGER PROFILE ───────────────────────────────────────────
function renderMgrProfile() {
  const user = Auth.getUser(); if (!user) return;
  const av = document.getElementById('mgr-profile-avatar'); if (av) av.textContent = initials(user.name);
  const nm = document.getElementById('mgr-profile-name'); if (nm) nm.textContent = user.name;
  const un = document.getElementById('mgr-profile-username'); if (un) un.textContent = '@' + user.username;
  const tog = document.getElementById('mgr-theme-toggle');
  if (tog) tog.checked = localStorage.getItem('sf_theme') === 'light';
  applyLang();
}

// ── SELECTS ───────────────────────────────────────────────────
function populateManagerSelects() {
  const emps = DB.getEmployees(mgr.restaurantId).sort((a, b) => a.name.localeCompare(b.name));
  ['sched-emp', 'pen-emp', 'pen-filter-emp', 'notif-target-inline'].forEach(id => {
    const sel = document.getElementById(id); if (!sel) return;
    const isFilter = id === 'pen-filter-emp' || id === 'notif-target-inline';
    sel.innerHTML = isFilter ? `<option value="all">${id === 'notif-target-inline' ? 'До всички служители' : I18N.t('filter_all_emp')}</option>` : `<option value="">— Избери —</option>`;
    emps.filter(e => e.status !== 'inactive' || isFilter).forEach(e => sel.innerHTML += `<option value="${e.id}">${e.name}</option>`);
  });
  const today = fmtDate(new Date());
  ['sched-date', 'pen-date'].forEach(id => { const el = document.getElementById(id); if (el) el.value = today; });
}

// ============================================================
// EMPLOYEE STATE
// ============================================================
let emp = {
  user: null,
  dashYear: new Date().getFullYear(), dashMonth: new Date().getMonth(),
  calYear: new Date().getFullYear(), calMonth: new Date().getMonth(),
  schedYear: new Date().getFullYear(), schedMonth: new Date().getMonth(),
  histYear: new Date().getFullYear(), histMonth: new Date().getMonth(),
};

function initEmployeeDashboard() {
  applyTheme(); applyLang();
  const user = Auth.requireRole('employee'); if (!user) return;
  emp.user = user;
  document.getElementById('nav-username').textContent = user.name || user.username;
  const notifEl = document.getElementById('notif-toggle');
  if (notifEl) { notifEl.checked = localStorage.getItem('sf_notif') === '1'; document.getElementById('notif-time-row').style.display = notifEl.checked ? 'flex' : 'none'; }
  const nt = document.getElementById('notif-time'); if (nt) nt.value = localStorage.getItem('sf_notif_time') || '20:00';
  renderEmpDashboard();
  renderEmpCalendar();
  renderEmpHistory();
  renderProfile();
  updateEmpNotifBadge();
}

// ── DASHBOARD ────────────────────────────────────────────────
function renderEmpDashboard() {
  const { dashYear: y, dashMonth: m } = emp;
  document.getElementById('month-label').textContent = fmtMonth(y, m);
  const { from, to } = getMonthRange(y, m);
  const shifts = DB.getShifts(emp.user.id, from, to);
  const pens = DB.getPenalties(emp.user.id).filter(p => p.date >= from && p.date <= to);
  const totalH = shifts.reduce((s, sh) => s + parseFloat(sh.worked_hours || 0), 0);
  const rate = parseFloat(emp.user.hourly_rate || 0);
  const penSum = pens.reduce((s, p) => s + parseFloat(p.amount || 0), 0);
  const gross = totalH * rate;
  const net = Math.max(0, gross - penSum);
  const workedDays = shifts.filter(s => s.worked_hours > 0).length;
  const avg = workedDays > 0 ? (totalH / workedDays) : 0;

  animateCounter(document.getElementById('kpi-hours'), totalH, '');
  animateCounter(document.getElementById('kpi-salary'), Math.round(net), '');
  animateCounter(document.getElementById('kpi-avg'), parseFloat(avg.toFixed(1)), '');
  animateCounter(document.getElementById('kpi-penalties'), Math.round(penSum), '');
  document.getElementById('kpi-rate-sub').textContent = `при ${rate} лв./час`;
  document.getElementById('kpi-penalty-count').textContent = pens.length + ' броя';

  // Payroll breakdown
  document.getElementById('payroll-gross').textContent = gross.toFixed(0) + ' лв.';
  document.getElementById('payroll-fines').textContent = '- ' + penSum.toFixed(0) + ' лв.';
  document.getElementById('payroll-net').textContent = net.toFixed(0) + ' лв.';

  // Progress
  const goal = parseInt(localStorage.getItem(`sf_goal_${emp.user.id}`) || '160');
  const pct = goal > 0 ? Math.min(100, Math.round(totalH / goal * 100)) : 0;
  const remain = Math.max(0, goal - totalH);
  document.getElementById('progress-label').textContent = `${totalH} / ${goal} ч`;
  document.getElementById('progress-bar').style.width = pct + '%';
  document.getElementById('progress-pct').textContent = pct + '%';
  document.getElementById('progress-remain').textContent = remain > 0 ? `${remain} ч оставащи` : '🎉 Целта е постигната!';
  document.getElementById('goal-display').textContent = goal + ' ч';

  // This week
  const { from: wF, to: wT } = getWeekRange(new Date());
  const weekShifts = DB.getShifts(emp.user.id, wF, wT);
  const weekTotal = weekShifts.reduce((s, sh) => s + parseFloat(sh.worked_hours || 0), 0);
  document.getElementById('week-total-badge').textContent = weekTotal + ' ч';
  const weekEl = document.getElementById('week-shifts'); weekEl.innerHTML = '';
  if (weekShifts.length === 0) { weekEl.innerHTML = '<div class="empty-state">' + I18N.t('no_shifts_week') + '</div>'; }
  else weekShifts.sort((a, b) => b.date.localeCompare(a.date)).forEach(s => {
    const div = document.createElement('div'); div.className = 'shift-item';
    div.innerHTML = `<div class="shift-left"><span class="shift-date">${fmtDateBG(s.date)}</span>${s.checkin_time ? `<span class="shift-note">🕐 ${s.checkin_time}</span>` : ''}</div>
      <div class="shift-right"><span class="shift-hours">${s.worked_hours}ч</span>${statusPill(s.status)}</div>`;
    weekEl.appendChild(div);
  });

  // Recent fines
  const recentPens = pens.slice(-3).reverse();
  const finesEl = document.getElementById('recent-fines-list'); if (finesEl) {
    finesEl.innerHTML = '';
    if (recentPens.length === 0) { finesEl.innerHTML = '<div class="empty-state">Няма наказания.</div>'; }
    else recentPens.forEach(p => {
      const div = document.createElement('div'); div.className = 'shift-item'; div.style.borderColor = 'rgba(252,129,129,0.25)';
      div.innerHTML = `<div class="shift-left"><span class="shift-date">${fmtDateBG(p.date)}</span><span class="shift-note" style="color:var(--red)">⚠️ ${p.note || 'Наказание'}</span></div>
        <span class="penalty-amount">-${p.amount} лв.</span>`;
      finesEl.appendChild(div);
    });
    document.getElementById('recent-fines-card').style.display = penSum > 0 ? 'block' : 'none';
  }

  // Upcoming
  const tom = new Date(); tom.setDate(tom.getDate() + 1);
  const nw = new Date(); nw.setDate(nw.getDate() + 7);
  const upSched = DB.getSchedulesForEmployee(emp.user.id, fmtDate(tom), fmtDate(nw)).sort((a, b) => a.date.localeCompare(b.date));
  const upEl = document.getElementById('upcoming-shifts'); upEl.innerHTML = '';
  if (upSched.length === 0) { upEl.innerHTML = '<div class="empty-state">' + I18N.t('no_upcoming') + '</div>'; }
  else upSched.forEach(s => {
    const div = document.createElement('div'); div.className = 'shift-item';
    div.innerHTML = `<div class="shift-left"><span class="shift-date">${fmtDateBG(s.date)}</span><span class="shift-name">${(SHIFT_TYPE_MAP[s.shift_type || 'regular'] || {}).label || 'Обичайна'} смяна</span></div>
      <div class="shift-right"><span class="shift-hours">${s.planned_hours}ч</span>${shiftBadge(s.shift_type || 'regular')}</div>`;
    upEl.appendChild(div);
  });
}
function changeMonth(dir) {
  emp.dashMonth += dir;
  if (emp.dashMonth < 0) { emp.dashMonth = 11; emp.dashYear--; }
  if (emp.dashMonth > 11) { emp.dashMonth = 0; emp.dashYear++; }
  renderEmpDashboard();
}

// ── CALENDAR ─────────────────────────────────────────────────
function renderEmpCalendar() {
  const { calYear: y, calMonth: m } = emp;
  document.getElementById('cal-month-label').textContent = fmtMonth(y, m);
  const { from, to } = getMonthRange(y, m);
  const shifts = DB.getShifts(emp.user.id, from, to);
  const pens = DB.getPenalties(emp.user.id).filter(p => p.date >= from && p.date <= to);
  const scheds = DB.getSchedulesForEmployee(emp.user.id, from, to);
  const shiftMap = {}; shifts.forEach(s => shiftMap[s.date] = s);
  const penMap = {}; pens.forEach(p => { if (!penMap[p.date]) penMap[p.date] = []; penMap[p.date].push(p); });
  const schedMap = {}; scheds.forEach(s => schedMap[s.date] = s);
  const grid = document.getElementById('cal-grid'); grid.innerHTML = '';
  let off = new Date(y, m, 1).getDay() - 1; if (off < 0) off = 6;
  for (let i = 0; i < off; i++) { const e = document.createElement('div'); e.className = 'cal-day empty'; grid.appendChild(e); }
  const days = new Date(y, m + 1, 0).getDate();
  const todayStr = fmtDate(new Date());
  for (let day = 1; day <= days; day++) {
    const dateStr = `${y}-${String(m + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const shift = shiftMap[dateStr]; const penList = penMap[dateStr]; const sched = schedMap[dateStr];
    let cls = 'cal-day';
    if (dateStr === todayStr) cls += ' today';
    if (isWeekend(dateStr)) cls += ' weekend';
    if (penList) cls += ' penalized';
    else if (shift) { cls += shift.worked_hours === 0 ? ' absent' : sched && shift.worked_hours < sched.planned_hours * 0.75 ? ' partial' : ' worked'; }
    else if (sched && dateStr > todayStr) cls += ' scheduled';
    const el = document.createElement('div'); el.className = cls;
    el.innerHTML = `<span>${day}</span>${shift ? `<span class="cal-hours">${shift.worked_hours}ч</span>` : sched ? `<span class="cal-hours">${sched.planned_hours}ч</span>` : ''}`;
    el.onclick = () => showCalDayDetail(dateStr, shift, penList, sched);
    grid.appendChild(el);
  }
}

function showCalDayDetail(dateStr, shift, pens, sched) {
  const detail = document.getElementById('day-detail');
  document.getElementById('day-detail-title').textContent = fmtDayBG(dateStr);
  let html = '';
  if (sched) html += `<div class="shift-item"><span>Планирана смяна</span><div>${shiftBadge(sched.shift_type || 'regular')} <span class="shift-hours">${sched.planned_hours}ч</span></div></div>`;
  if (shift) {
    html += `<div class="shift-item"><span>Отработено</span><span class="shift-hours">${shift.worked_hours}ч</span></div>`;
    html += `<div class="shift-item"><span>Статус</span>${statusPill(shift.status)}</div>`;
    if (shift.checkin_time) html += `<div class="shift-item"><span>🕐 Check-in</span><span class="mono-badge">${shift.checkin_time}</span></div>`;
    if (shift.note) html += `<div class="shift-item"><span>Бележка</span><span style="color:var(--text-muted);font-size:0.82rem">${shift.note}</span></div>`;
  } else if (!sched) html += '<p style="color:var(--text-faint);font-size:0.82rem;padding:0.5rem 0">Почивен ден.</p>';
  if (pens?.length) pens.forEach(p => {
    html += `<div class="shift-item" style="border-color:rgba(252,129,129,0.3)"><div><span style="font-size:0.82rem">⚠️ ${p.note || 'Наказание'}</span></div><span class="penalty-amount">-${p.amount} лв.</span></div>`;
  });
  document.getElementById('day-detail-content').innerHTML = html || '<p style="color:var(--text-faint);font-size:0.82rem">Няма данни.</p>';
  detail.classList.remove('hidden');
}
function changeCalMonth(dir) {
  emp.calMonth += dir;
  if (emp.calMonth < 0) { emp.calMonth = 11; emp.calYear--; }
  if (emp.calMonth > 11) { emp.calMonth = 0; emp.calYear++; }
  document.getElementById('day-detail')?.classList.add('hidden');
  renderEmpCalendar();
}

// ── EMPLOYEE SCHEDULE ─────────────────────────────────────────
function renderEmpSchedule() {
  const { schedYear: y, schedMonth: m } = emp;
  document.getElementById('sched-month-label').textContent = fmtMonth(y, m);
  const { from, to } = getMonthRange(y, m);
  const scheds = DB.getSchedulesForEmployee(emp.user.id, from, to).sort((a, b) => a.date.localeCompare(b.date));
  const shifts = DB.getShifts(emp.user.id, from, to);
  const shiftMap = {}; shifts.forEach(s => shiftMap[s.date] = s);
  document.getElementById('sched-total-days').textContent = scheds.length;
  document.getElementById('sched-total-hours').textContent = scheds.reduce((s, sc) => s + parseFloat(sc.planned_hours || 0), 0);
  document.getElementById('sched-worked-days').textContent = scheds.filter(sc => shiftMap[sc.date]?.worked_hours > 0).length;
  const container = document.getElementById('emp-schedule-list'); container.innerHTML = '';
  if (scheds.length === 0) { container.innerHTML = '<div class="glass-card"><div class="empty-state">Няма планирани смени за този месец.</div></div>'; return; }
  const weeks = {};
  scheds.forEach(sc => { const { from: wF } = getWeekRange(new Date(sc.date + 'T00:00:00')); if (!weeks[wF]) weeks[wF] = []; weeks[wF].push(sc); });
  Object.entries(weeks).forEach(([wf, dayScheds]) => {
    const card = document.createElement('div'); card.className = 'glass-card section-card';
    const wto = new Date(wf + 'T00:00:00'); wto.setDate(wto.getDate() + 6);
    card.innerHTML = `<div class="card-title-row"><span class="card-title">${fmtDateBG(wf)} — ${fmtDateBG(fmtDate(wto))}</span></div>`;
    dayScheds.forEach(sc => {
      const shift = shiftMap[sc.date];
      const isToday = sc.date === fmtDate(new Date());
      const worked = shift?.worked_hours || 0;
      const done = shift && worked > 0; const missed = shift && worked === 0;
      const row = document.createElement('div'); row.className = 'month-sched-day';
      if (isToday) row.style.background = 'rgba(99,179,237,0.07)';
      row.innerHTML = `
        <span class="msd-date">${DAYS_BG[new Date(sc.date + 'T00:00:00').getDay()].substring(0, 3)}, ${new Date(sc.date + 'T00:00:00').getDate()} ${monthsArr()[new Date(sc.date + 'T00:00:00').getMonth()]}</span>
        <div class="msd-info">
          <div class="msd-title">${(SHIFT_TYPE_MAP[sc.shift_type || 'regular'] || {}).label || 'Обичайна'} ${isToday ? '<span style="color:var(--accent);font-size:0.7rem">(Днес)</span>' : ''}</div>
          ${sc.note ? `<div class="msd-sub">${sc.note}</div>` : ''}
          ${shift?.checkin_time ? `<div class="msd-sub">🕐 ${shift.checkin_time}</div>` : ''}
        </div>
        <div style="display:flex;flex-direction:column;align-items:flex-end;gap:4px;">
          <span class="msd-hours${done ? ' msd-done' : missed ? ' msd-missed' : ''}">${done ? worked + 'ч отраб.' : missed ? 'Отсъства' : sc.planned_hours + 'ч план.'}</span>
          ${done ? statusPill('present') : missed ? statusPill('absent') : ''}
        </div>`;
      card.appendChild(row);
    });
    container.appendChild(card);
  });
}
function changeSchedMonth(dir) {
  emp.schedMonth += dir;
  if (emp.schedMonth < 0) { emp.schedMonth = 11; emp.schedYear--; }
  if (emp.schedMonth > 11) { emp.schedMonth = 0; emp.schedYear++; }
  renderEmpSchedule();
}

// ── HISTORY ──────────────────────────────────────────────────
function renderEmpHistory() {
  const { histYear: y, histMonth: m } = emp;
  document.getElementById('hist-month-label').textContent = fmtMonth(y, m);
  const { from, to } = getMonthRange(y, m);
  const shifts = DB.getShifts(emp.user.id, from, to);
  const pens = DB.getPenalties(emp.user.id).filter(p => p.date >= from && p.date <= to);
  const totalH = shifts.reduce((s, sh) => s + parseFloat(sh.worked_hours || 0), 0);
  const penSum = pens.reduce((s, p) => s + parseFloat(p.amount || 0), 0);
  const rate = parseFloat(emp.user.hourly_rate || 0);
  const salary = totalH * rate; const net = Math.max(0, salary - penSum);
  document.getElementById('hist-total-hours').textContent = totalH + 'ч';
  document.getElementById('hist-salary').textContent = salary.toFixed(0) + ' лв.';
  document.getElementById('hist-penalties').textContent = penSum.toFixed(0) + ' лв.';
  document.getElementById('hist-net').textContent = net.toFixed(0) + ' лв.';
  const list = document.getElementById('history-list'); list.innerHTML = '';
  if (shifts.length === 0 && pens.length === 0) { list.innerHTML = '<div class="empty-state">' + I18N.t('no_history') + '</div>'; return; }
  [...shifts.map(s => ({ ...s, _type: 'shift' })), ...pens.map(p => ({ ...p, _type: 'penalty' }))].sort((a, b) => b.date.localeCompare(a.date)).forEach(item => {
    const div = document.createElement('div'); div.className = 'shift-item';
    if (item._type === 'shift') {
      div.innerHTML = `<div class="shift-left"><span class="shift-date">${fmtDateBG(item.date)}</span>${item.checkin_time ? `<span class="shift-note">🕐 ${item.checkin_time}</span>` : ''}${item.note ? `<span class="shift-note">${item.note}</span>` : ''}</div>
        <div class="shift-right"><span class="shift-hours">${item.worked_hours}ч</span>${statusPill(item.status)}</div>`;
    } else {
      div.style.borderColor = 'rgba(252,129,129,0.25)';
      div.innerHTML = `<div class="shift-left"><span class="shift-date">${fmtDateBG(item.date)}</span><span class="shift-note" style="color:var(--red)">⚠️ ${item.note || 'Наказание'}</span></div>
        <span class="penalty-amount">-${item.amount} лв.</span>`;
    }
    list.appendChild(div);
  });
}
function changeHistMonth(dir) {
  emp.histMonth += dir;
  if (emp.histMonth < 0) { emp.histMonth = 11; emp.histYear--; }
  if (emp.histMonth > 11) { emp.histMonth = 0; emp.histYear++; }
  renderEmpHistory();
}

// ── NOTIFICATIONS (EMPLOYEE) ─────────────────────────────────
function renderEmpNotifs() {
  const notifs = DB.getNotifications(emp.user.id);
  const list = document.getElementById('emp-notifs-list'); if (!list) return;
  list.innerHTML = '';
  if (notifs.length === 0) { list.innerHTML = '<div class="empty-state">Няма нови известия.</div>'; return; }
  notifs.forEach(n => {
    const isRead = n.read_by.includes(emp.user.id);
    const div = document.createElement('div');
    div.className = `notif-item${isRead ? '' : ' notif-unread'}`;
    div.innerHTML = `
      <div class="notif-header">
        <span class="notif-title">${n.title}</span>
        <span class="notif-date">${fmtDateBG(n.date)}</span>
      </div>
      <div class="notif-msg">${n.message}</div>
      <div class="notif-meta">От: ${n.from_name} ${isRead ? '<span style="color:var(--green)">✓ Прочетено</span>' : '<span style="color:var(--accent)">● Ново</span>'}</div>`;
    div.onclick = () => { DB.markNotifRead(n.id, emp.user.id); renderEmpNotifs(); updateEmpNotifBadge(); };
    list.appendChild(div);
  });
}
function markAllNotifsRead() {
  DB.markAllNotifsRead(emp.user.id);
  renderEmpNotifs(); updateEmpNotifBadge();
  showToast('Всички известия са маркирани ✓');
}
function updateEmpNotifBadge() {
  if (!emp.user) return;
  const count = DB.getUnreadCount(emp.user.id);
  const dot = document.getElementById('emp-notif-dot');
  if (dot) dot.classList.toggle('hidden', count === 0);
}

// ── PROFILE ──────────────────────────────────────────────────
function renderProfile() {
  if (!emp.user) return;
  const { from, to } = getMonthRange(new Date().getFullYear(), new Date().getMonth());
  const shifts = DB.getShifts(emp.user.id, from, to);
  const pens = DB.getPenalties(emp.user.id).filter(p => p.date >= from && p.date <= to);
  const totalH = shifts.reduce((s, sh) => s + parseFloat(sh.worked_hours || 0), 0);
  const rate = parseFloat(emp.user.hourly_rate || 0);
  const penSum = pens.reduce((s, p) => s + parseFloat(p.amount || 0), 0);
  const salary = Math.max(0, totalH * rate - penSum);
  document.getElementById('profile-avatar').textContent = initials(emp.user.name);
  document.getElementById('profile-name').textContent = emp.user.name;
  document.getElementById('profile-username').textContent = '@' + emp.user.username;
  document.getElementById('prof-hours').textContent = totalH;
  document.getElementById('prof-salary').textContent = salary.toFixed(0) + ' лв.';
  document.getElementById('prof-penalties').textContent = penSum.toFixed(0) + ' лв.';
  document.getElementById('prof-days').textContent = shifts.filter(s => s.worked_hours > 0).length;
  document.getElementById('prof-rate').textContent = rate + ' лв./ч';
  const goal = parseInt(localStorage.getItem(`sf_goal_${emp.user.id}`) || '160');
  document.getElementById('goal-display').textContent = goal + ' ч';
  applyLang();
}

function saveGoal() {
  const val = parseInt(document.getElementById('goal-input').value);
  if (!val || val < 1) { showToast('Невалидна цел', 'error'); return; }
  localStorage.setItem(`sf_goal_${emp.user.id}`, val);
  closeModal('modal-set-goal');
  showToast('Целта е запазена ✓');
  renderEmpDashboard(); renderProfile();
}
function toggleNotifications(cb) {
  localStorage.setItem('sf_notif', cb.checked ? '1' : '0');
  document.getElementById('notif-time-row').style.display = cb.checked ? 'flex' : 'none';
  if (cb.checked && 'Notification' in window) Notification.requestPermission().then(p => { if (p === 'granted') showToast('Известията са включени 🔔', 'info'); });
  else if (!cb.checked) showToast('Известията са изключени');
}

// ── PWA ──────────────────────────────────────────────────────
if ('serviceWorker' in navigator) window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => { }));
window.addEventListener('offline', () => {
  if (!document.getElementById('offline-banner')) { const b = document.createElement('div'); b.className = 'offline-banner'; b.id = 'offline-banner'; b.textContent = '📡 Офлайн режим — данните се запазват локално'; document.body.prepend(b); }
});
window.addEventListener('online', () => document.getElementById('offline-banner')?.remove());

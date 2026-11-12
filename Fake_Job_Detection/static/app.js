/* ═══════════════════════════════════════════════════════════════
   JOBCIPHER AI — app.js
   Vanilla JavaScript SPA controller
═══════════════════════════════════════════════════════════════ */

'use strict';

// ── State ────────────────────────────────────────────────────────
let currentUser    = '';
let currentPage    = 1;
let totalPages     = 1;
let donutChart     = null;
let barChart       = null;
let currentSection = 'dashboard';
let autoRefreshTimer = null;

// ── Entry point ──────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', init);

function init() {
    // Check for stored session
    const stored = sessionStorage.getItem('jobcipher_user');

    if (stored) {
        showMainApp(stored);
    } else {
        document.getElementById('loginPage').classList.remove('hidden');
        animateLoginPage();
    }

    // Login form
    document.getElementById('loginForm').addEventListener('submit', handleLogin);

    // Password toggle
    document.getElementById('pwToggle').addEventListener('click', togglePassword);

    // Logout
    document.getElementById('logoutBtn').addEventListener('click', logout);

    // Sidebar navigation
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', () => goToSection(item.dataset.section));
    });

    // Sidebar mobile toggle
    document.getElementById('sidebarToggle').addEventListener('click', toggleSidebar);

    // Detect form
    document.getElementById('detectForm').addEventListener('submit', handleDetect);

    // Character counter
    document.getElementById('detDescription').addEventListener('input', function () {
        document.getElementById('charCounter').textContent =
            `${this.value.length} characters`;
    });

    // Top navigation search
    const topSearch = document.getElementById('topSearchInput');

    if (topSearch) {
        topSearch.addEventListener('input', function () {
            const q = this.value.trim().toLowerCase();

            if (currentSection !== 'history') {
                goToSection('history');
            }

            filterHistory(q);
        });
    }

    // Refresh history
    document.getElementById('refreshHistory').addEventListener('click', () => loadHistory(1));

    // Export CSV
    document.getElementById('exportCSV').addEventListener('click', exportCSV);

    // Auto refresh
    document.getElementById('toggleAutoRefresh').addEventListener('change', function () {
        clearInterval(autoRefreshTimer);

        if (this.checked && currentSection === 'history') {
            autoRefreshTimer = setInterval(() => loadHistory(currentPage), 30000);
        }
    });

    // Disclaimer setting
    document.getElementById('toggleDisclaimer')?.addEventListener('change', function () {
        const d = document.querySelector('.disclaimer');

        if (d) {
            d.style.display = this.checked ? 'block' : 'none';
        }
    });
}

// ── Login / Logout ───────────────────────────────────────────────
function handleLogin(e) {
  e.preventDefault();
  const username = document.getElementById('loginUsername').value.trim();
  const password = document.getElementById('loginPassword').value;
  const errEl    = document.getElementById('loginError');

  if (!username || !password) {
    errEl.classList.remove('hidden');
    return;
  }

  errEl.classList.add('hidden');
  sessionStorage.setItem('jobcipher_user', username);
  showMainApp(username);
}

function showMainApp(username) {
  currentUser = username;

  document.getElementById('loginPage').classList.add('hidden');
  document.getElementById('mainApp').classList.remove('hidden');

  // Update UI with username
  document.getElementById('welcomeUser').textContent   = username;
  document.getElementById('settingsUsername').textContent = username;
  const initials = username.substring(0, 2).toUpperCase();
  document.getElementById('userAvatar').textContent    = initials;

  // Load initial data
  loadStats();
loadRecentActivity();

// Start dashboard animation
animateDashboard();
}

function logout() {
  sessionStorage.removeItem('jobcipher_user');
  clearInterval(autoRefreshTimer);

  // Reset form
  document.getElementById('loginForm').reset();
  document.getElementById('loginError').classList.add('hidden');

  document.getElementById('mainApp').classList.add('hidden');
  document.getElementById('loginPage').classList.remove('hidden');

  // Reset nav
  goToSection('dashboard');

  // Destroy charts so they re-render fresh next time
  if (donutChart) { donutChart.destroy(); donutChart = null; }
  if (barChart)   { barChart.destroy();   barChart   = null; }
}

// ── Password toggle ──────────────────────────────────────────────
function togglePassword() {
    const passwordInput = document.getElementById('loginPassword');

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
    } else {
        passwordInput.type = 'password';
    }
}

// ── Navigation ───────────────────────────────────────────────────
function goToSection(sectionId) {
  // Hide all sections
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  // Show target
  const target = document.getElementById(`section-${sectionId}`);

if (target) {
    target.classList.add('active');

    if (!document.getElementById('mainApp').classList.contains('hidden')) {
        animateSection(sectionId);
    }
}

  // Update nav active state
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.toggle('active', item.dataset.section === sectionId);
  });

  currentSection = sectionId;

  // Close mobile sidebar
  closeSidebar();

  // Load section data
  if (sectionId === 'dashboard') { loadStats(); loadRecentActivity(); }
  if (sectionId === 'history')   { loadHistory(1); }
  if (sectionId === 'analytics') { loadAnalytics(); }

  // Auto-refresh if enabled
  clearInterval(autoRefreshTimer);
  if (sectionId === 'history' && document.getElementById('toggleAutoRefresh').checked) {
    autoRefreshTimer = setInterval(() => loadHistory(currentPage), 30000);
  }
}

// Make globally callable from inline onclick attributes
window.goToSection = goToSection;

// ── Sidebar mobile ───────────────────────────────────────────────
function toggleSidebar() {
  const sidebar  = document.getElementById('sidebar');
  const overlay  = document.getElementById('sidebarOverlay');
  const isOpen   = sidebar.classList.contains('open');
  sidebar.classList.toggle('open', !isOpen);
  overlay.classList.toggle('hidden', isOpen);
}

function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('sidebarOverlay').classList.add('hidden');
}

window.closeSidebar = closeSidebar;

// ── Load Dashboard Stats ─────────────────────────────────────────
async function loadStats() {
  try {
    const res  = await fetch('/stats');
    if (!res.ok) throw new Error('Stats fetch failed');
    const data = await res.json();

    document.getElementById('statTotal').textContent = data.total ?? '--';
    document.getElementById('statFake').textContent  = data.fake  ?? '--';
    document.getElementById('statReal').textContent  = data.real  ?? '--';
    document.getElementById('statPct').textContent   =
      data.fake_percentage != null ? `${data.fake_percentage}%` : '--%';

    // Notification badge: show fake count if > 0
    const badge = document.getElementById('notifBadge');
    if (data.fake > 0) {
      badge.textContent = data.fake > 99 ? '99+' : data.fake;
      badge.classList.remove('hidden');
    } else {
      badge.classList.add('hidden');
    }
  } catch {
    ['statTotal','statFake','statReal'].forEach(id => {
      document.getElementById(id).textContent = '--';
    });
    document.getElementById('statPct').textContent = '--%';
  }
}

// ── Load Recent Activity (Dashboard) ────────────────────────────
async function loadRecentActivity() {
  const container = document.getElementById('recentActivity');
  container.innerHTML = '<div class="loading-pulse">Loading recent analyses…</div>';
  try {
    const res  = await fetch('/history?page=1&per_page=5');
    if (!res.ok) throw new Error('History fetch failed');
    const data = await res.json();

    if (!data.items || data.items.length === 0) {
      container.innerHTML = '<div class="no-data-msg">No analyses yet. Run your first detection!</div>';
      return;
    }

    container.innerHTML = data.items.map(item => `
      <div class="recent-item" onclick="viewDetail(${item.id})" style="cursor:pointer">
        <div class="recent-item-left">
          <div class="recent-title">${truncate(item.job_title || 'Untitled Job', 36)}</div>
          <div class="recent-company">${truncate(item.company || 'Unknown Company', 30)} · ${formatDate(item.created_at)}</div>
        </div>
        ${item.is_fake
          ? '<span class="badge-fake">⚠ FAKE</span>'
          : '<span class="badge-real">✓ REAL</span>'}
      </div>
    `).join('');
  } catch {
    container.innerHTML = '<div class="no-data-msg">Could not load recent activity.</div>';
  }
}

// ── Detect Job Form ──────────────────────────────────────────────
async function handleDetect(e) {
  e.preventDefault();

  const description = document.getElementById('detDescription').value.trim();
  const errEl       = document.getElementById('detectFormError');

  // Validate
  if (!description) {
    errEl.classList.remove('hidden');
    document.getElementById('detDescription').focus();
    return;
  }
  errEl.classList.add('hidden');

  // Loading state
  const btn     = document.getElementById('analyzeBtn');
  const btnText = document.getElementById('analyzeBtnText');
  const spinner = document.getElementById('analyzingSpinner');
  btn.disabled  = true;
  btnText.classList.add('hidden');
  spinner.classList.remove('hidden');

  const jobTitle      = document.getElementById('detJobTitle').value.trim();
  const company       = document.getElementById('detCompany').value.trim();
  const requirements  = document.getElementById('detRequirements').value.trim();
  const benefits      = document.getElementById('detBenefits').value.trim();
  const companyProfile = document.getElementById('detCompanyProfile').value.trim();

  try {
    const res = await fetch('/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        job_title:       jobTitle,
        company:         company,
        job_description: description,
        requirements:    requirements,
        benefits:        benefits,
        company_profile: companyProfile
      })
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.detail || 'Prediction failed');
    }

    const data = await res.json();
    renderResult(data, jobTitle, company);
    showToast('Analysis complete!', 'success');

    // Refresh stats silently
    loadStats();

  } catch (err) {
    showToast(`Error: ${err.message}`, 'error');
    document.getElementById('resultEmpty').classList.remove('hidden');
    document.getElementById('resultContent').classList.add('hidden');
  } finally {
    btn.disabled = false;
    btnText.classList.remove('hidden');
    spinner.classList.add('hidden');
  }
}

// ── Sample Presets ───────────────────────────────────────────────
const SAMPLES = {
  scam: {
    title: 'Data Entry Assistant - Immediate Start / Work From Home',
    company: 'Apex Global Financial Logistics LLC',
    desc: 'URGENT HIRING! We are looking for immediate remote data entry workers. Earn $4,500 - $6,000 monthly working only 2 hours a day from home. No resume or interview required. Equipment package (laptop, printer, software) will be sent once you pay a refundable $75 processing and shipping fee via Western Union, MoneyGram or Crypto. You will also receive customer wire transfers into your personal bank account and forward funds. Contact manager directly on Telegram @ApexRecruit or email apexcareers@gmail.com.',
    req: 'Must have active personal bank account to receive wire transfers. No experience needed. 18+ only.',
    ben: 'High weekly payout, flexible hours, work in pajamas, full company benefits after 1 week.',
    profile: 'Worldwide financial disbursement and international remittance firm.'
  },
  real: {
    title: 'Senior Software Engineer (Full Stack / Python)',
    company: 'Starlight Interactive Systems Inc.',
    desc: 'Starlight Interactive is seeking an experienced Senior Software Engineer to join our core cloud platform team. You will design, build, and maintain production RESTful microservices, optimize database queries, and collaborate closely with product managers and frontend engineers. Candidates must have a strong foundation in computer science and demonstrable production experience with modern Python web frameworks and PostgreSQL.',
    req: '5+ years of software development experience with Python, FastAPI or Django. Solid understanding of relational database design, Docker, CI/CD pipelines, and automated testing. BS/MS in Computer Science or equivalent practical experience.',
    ben: 'Competitive base salary ($130,000 - $160,000), equity options, comprehensive medical/dental/vision insurance, 401(k) matching up to 5%, annual learning stipend, and flexible remote work policy.',
    profile: 'Starlight Interactive is a venture-backed enterprise SaaS platform with over 250 employees worldwide, powering analytics for Fortune 500 enterprises.'
  }
};

function loadSample(type) {
  const s = SAMPLES[type];
  if (!s) return;
  document.getElementById('detJobTitle').value = s.title;
  document.getElementById('detCompany').value = s.company;
  document.getElementById('detDescription').value = s.desc;
  document.getElementById('detRequirements').value = s.req;
  document.getElementById('detBenefits').value = s.ben;
  document.getElementById('detCompanyProfile').value = s.profile;
  document.getElementById('charCounter').textContent = `${s.desc.length} characters`;
  document.getElementById('detectFormError').classList.add('hidden');
  const details = document.querySelector('.optional-fields');
  if (details) details.open = true;
  showToast(`Loaded ${type === 'scam' ? '🚨 Scam' : '💼 Real'} sample`, 'info');
}

function clearDetectForm() {
  document.getElementById('detectForm').reset();
  document.getElementById('charCounter').textContent = '0 characters';
  document.getElementById('detectFormError').classList.add('hidden');
  document.getElementById('resultEmpty').classList.remove('hidden');
  document.getElementById('resultContent').classList.add('hidden');
  const details = document.querySelector('.optional-fields');
  if (details) details.open = false;
  showToast('Form cleared', 'info');
}

window.loadSample = loadSample;
window.clearDetectForm = clearDetectForm;

// ── Render Detection Result ──────────────────────────────────────
function renderResult(data, jobTitle, company) {
  const container = document.getElementById('resultContent');
  const empty     = document.getElementById('resultEmpty');

  empty.classList.add('hidden');
  container.classList.remove('hidden');

  const isFake   = data.is_fake;
  const conf     = data.confidence;
  const fakeProb = conf ? (conf.fake_probability * 100).toFixed(1) : null;
  const realProb = conf ? (conf.real_probability * 100).toFixed(1) : null;

  const showConf = document.getElementById('toggleConfidence')?.checked !== false;

  // Heuristic scam signal tags
  const allText = `${jobTitle} ${company} ${document.getElementById('detDescription')?.value || ''} ${document.getElementById('detRequirements')?.value || ''}`.toLowerCase();
  const triggers = [
    'wire transfer', 'western union', 'moneygram', 'crypto', 'bitcoin',
    'processing fee', 'advance fee', 'cashier check', 'money order',
    'no experience', 'urgent hiring', 'immediate start', 'telegram',
    'whatsapp', 'personal email', 'gmail.com', 'yahoo.com', 'bank account',
    'gift card', 'package forwarding', 'work in pajamas'
  ];
  const detectedSignals = triggers.filter(t => allText.includes(t));
  const signalsHTML = detectedSignals.length > 0 ? `
    <div class="flags-section">
      <div class="flags-title">⚠️ Heuristic Scam Signals (${detectedSignals.length})</div>
      <div class="flag-tags">
        ${detectedSignals.map(s => `<span class="flag-tag">${s.toUpperCase()}</span>`).join('')}
      </div>
    </div>
  ` : '';

  const confidenceHTML = (conf && showConf) ? `
    <div class="conf-section">
      <div class="conf-title">Confidence Scores</div>
      <div class="conf-row">
        <span class="conf-label">Fraud Risk Score</span>
        <span class="conf-num fake-num">${fakeProb}%</span>
      </div>
      <div class="conf-bar-wrap">
        <div class="conf-bar-fill danger-fill" id="fakeBar" style="width:0%"></div>
      </div>
      <div class="conf-row mt-8">
        <span class="conf-label">Legitimacy Score</span>
        <span class="conf-num real-num">${realProb}%</span>
      </div>
      <div class="conf-bar-wrap">
        <div class="conf-bar-fill success-fill" id="realBar" style="width:0%"></div>
      </div>
    </div>
  ` : '';

  container.innerHTML = isFake ? `
    <div class="result-verdict-fake">
      <div class="verdict-icon-circle fake-circle">⚠</div>
      <div>
        <div class="verdict-label fake-label">POTENTIALLY FAKE JOB</div>
        <div class="verdict-sub">This posting shows suspicious characteristics consistent with fraud</div>
      </div>
    </div>
    ${signalsHTML}
    ${confidenceHTML}
    <div class="result-footer">
      <div class="result-footer-item"><span>Job Title:</span><span>${jobTitle || '—'}</span></div>
      <div class="result-footer-item"><span>Company:</span><span>${company || '—'}</span></div>
      <div class="result-footer-item"><span>Algorithm:</span><span>TF-IDF + Logistic Regression</span></div>
    </div>
  ` : `
    <div class="result-verdict-real">
      <div class="verdict-icon-circle real-circle">✓</div>
      <div>
        <div class="verdict-label real-label">PREDICTED REAL JOB</div>
        <div class="verdict-sub">This posting appears to have characteristics of a legitimate listing</div>
      </div>
    </div>
    ${signalsHTML}
    ${confidenceHTML}
    <div class="result-footer">
      <div class="result-footer-item"><span>Job Title:</span><span>${jobTitle || '—'}</span></div>
      <div class="result-footer-item"><span>Company:</span><span>${company || '—'}</span></div>
      <div class="result-footer-item"><span>Algorithm:</span><span>TF-IDF + Logistic Regression</span></div>
    </div>
  `;

  // Animate confidence bars
if (conf && showConf) {
    setTimeout(() => {
        const fb = document.getElementById('fakeBar');
        const rb = document.getElementById('realBar');

        if (fb) fb.style.width = `${fakeProb}%`;
        if (rb) rb.style.width = `${realProb}%`;
    }, 80);
}

// Animate detection result
animateDetectionResult();

} // End of renderResult()

// ── Load History ─────────────────────────────────────────────────
async function loadHistory(page = 1) {
  currentPage = page;
  const tbody = document.getElementById('historyBody');
  const countEl = document.getElementById('historyCount');
  tbody.innerHTML = '<tr><td colspan="6" class="table-empty">Loading history…</td></tr>';

  try {
    const res  = await fetch(`/history?page=${page}&per_page=10`);
    if (!res.ok) throw new Error('History fetch failed');
    const data = await res.json();

    totalPages = data.pages || 1;

    // Count display
    if (data.total === 0) {
      countEl.textContent = 'No analyses found';
    } else {
      const from = (page - 1) * 10 + 1;
      const to   = Math.min(page * 10, data.total);
      countEl.textContent = `Showing ${from}–${to} of ${data.total} analyses`;
    }

    if (!data.items || data.items.length === 0) {
      tbody.innerHTML = '<tr><td colspan="6" class="table-empty">No analyses yet. Use the Detect Job section to run your first analysis.</td></tr>';
      document.getElementById('pagination').innerHTML = '';
      return;
    }

    tbody.innerHTML = data.items.map((item, i) => {
      const badge = item.is_fake
        ? '<span class="badge-fake">⚠ FAKE</span>'
        : '<span class="badge-real">✓ REAL</span>';
      const rowNum = (page - 1) * 10 + i + 1;
      return `
        <tr>
          <td style="color:#94a3b8;font-size:12px">${rowNum}</td>
          <td><strong>${escHtml(truncate(item.job_title || 'Untitled', 32))}</strong></td>
          <td>${escHtml(truncate(item.company || '—', 24))}</td>
          <td>${badge}</td>
          <td style="white-space:nowrap;font-size:12px;color:#64748b">${formatDate(item.created_at)}</td>
          <td style="white-space:nowrap">
            <button class="btn-view" onclick="viewDetail(${item.id})">View</button>
            <button class="btn-delete" onclick="deleteAnalysis(${item.id})">Delete</button>
          </td>
        </tr>
      `;
    }).join('');

    renderPagination(page, totalPages);

  } catch (err) {
    tbody.innerHTML = `<tr><td colspan="6" class="table-empty">Error loading history: ${err.message}</td></tr>`;
    countEl.textContent = 'Error loading data';
  }
}

window.loadHistory = loadHistory;

// ── Search & Filter History ──────────────────────────────────────
function filterHistory(query) {
  const rows = document.querySelectorAll('#historyBody tr');
  if (!rows || rows.length === 0) return;
  rows.forEach(row => {
    const text = row.innerText.toLowerCase();
    row.style.display = (!query || text.includes(query)) ? '' : 'none';
  });
}

window.filterHistory = filterHistory;

// ── Pagination ───────────────────────────────────────────────────
function renderPagination(current, total) {
  const container = document.getElementById('pagination');
  if (total <= 1) { container.innerHTML = ''; return; }

  let html = `<button class="page-btn" onclick="loadHistory(${current - 1})" ${current === 1 ? 'disabled' : ''}>‹ Prev</button>`;

  // Show up to 5 pages centered around current
  let start = Math.max(1, current - 2);
  let end   = Math.min(total, start + 4);
  if (end - start < 4) start = Math.max(1, end - 4);

  if (start > 1) html += `<button class="page-btn" onclick="loadHistory(1)">1</button>`;
  if (start > 2) html += `<span style="display:flex;align-items:center;color:#94a3b8;font-size:12px;padding:0 4px">…</span>`;

  for (let p = start; p <= end; p++) {
    html += `<button class="page-btn ${p === current ? 'active' : ''}" onclick="loadHistory(${p})">${p}</button>`;
  }

  if (end < total - 1) html += `<span style="display:flex;align-items:center;color:#94a3b8;font-size:12px;padding:0 4px">…</span>`;
  if (end < total)     html += `<button class="page-btn" onclick="loadHistory(${total})">${total}</button>`;

  html += `<button class="page-btn" onclick="loadHistory(${current + 1})" ${current === total ? 'disabled' : ''}>Next ›</button>`;

  container.innerHTML = html;
}

// ── View Detail Modal ────────────────────────────────────────────
async function viewDetail(id) {
  const modal = document.getElementById('detailModal');
  const body  = document.getElementById('modalBody');
  modal.classList.remove('hidden');
  body.innerHTML = '<div class="loading-pulse" style="padding:20px 0;text-align:center">Loading details…</div>';

  try {
    const res  = await fetch(`/history/${id}`);
    if (!res.ok) throw new Error('Not found');
    const item = await res.json();

    const fakeProb = item.fake_prob != null ? `${(item.fake_prob * 100).toFixed(1)}%` : '—';
    const realProb = item.real_prob != null ? `${(item.real_prob * 100).toFixed(1)}%` : '—';
    const badge    = item.is_fake
      ? '<span class="badge-fake" style="font-size:13px;padding:4px 14px">⚠ POTENTIALLY FAKE JOB</span>'
      : '<span class="badge-real" style="font-size:13px;padding:4px 14px">✓ PREDICTED REAL JOB</span>';

    body.innerHTML = `
      <div class="modal-field-row">
        <div class="modal-field-label">Job Title</div>
        <div class="modal-field-val">${escHtml(item.job_title || '—')}</div>
      </div>
      <div class="modal-field-row">
        <div class="modal-field-label">Company</div>
        <div class="modal-field-val">${escHtml(item.company || '—')}</div>
      </div>
      <div class="modal-field-row">
        <div class="modal-field-label">Prediction Result</div>
        <div class="modal-field-val">${badge}</div>
      </div>
      <div class="modal-field-row" style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
        <div>
          <div class="modal-field-label">Fraud Risk Score</div>
          <div class="modal-field-val" style="color:#dc2626;font-weight:700;font-size:18px">${fakeProb}</div>
        </div>
        <div>
          <div class="modal-field-label">Legitimacy Score</div>
          <div class="modal-field-val" style="color:#16a34a;font-weight:700;font-size:18px">${realProb}</div>
        </div>
      </div>
      <div class="modal-field-row">
        <div class="modal-field-label">Analysed On</div>
        <div class="modal-field-val">${formatDate(item.created_at)}</div>
      </div>
      ${item.description ? `
      <div class="modal-field-row">
        <div class="modal-field-label">Job Description Preview</div>
        <div class="modal-desc-preview">${escHtml(item.description.substring(0, 500))}${item.description.length > 500 ? '…' : ''}</div>
      </div>` : ''}
    `;
  } catch {
    body.innerHTML = '<div style="text-align:center;color:#dc2626;padding:20px 0">Could not load analysis details.</div>';
  }
}

window.viewDetail = viewDetail;

function closeModal() {
  document.getElementById('detailModal').classList.add('hidden');
}

window.closeModal = closeModal;

function handleModalOverlayClick(e) {
  if (e.target === document.getElementById('detailModal')) closeModal();
}

window.handleModalOverlayClick = handleModalOverlayClick;

// ── Delete Analysis ──────────────────────────────────────────────
async function deleteAnalysis(id) {
  if (!confirm('Are you sure you want to delete this analysis? This cannot be undone.')) return;

  try {
    const res = await fetch(`/history/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Delete failed');
    showToast('Analysis deleted successfully.', 'success');
    loadHistory(currentPage);
    loadStats();
  } catch (err) {
    showToast(`Delete failed: ${err.message}`, 'error');
  }
}

window.deleteAnalysis = deleteAnalysis;

// ── Analytics ────────────────────────────────────────────────────
async function loadAnalytics() {
  try {
    const [statsRes, dailyRes] = await Promise.all([
      fetch('/stats'),
      fetch('/analytics/daily?days=7')
    ]);

    const stats = await statsRes.json();
    const daily = await dailyRes.json();

    renderDonutChart(stats);
    renderBarChart(daily);
    renderSummaryStats(stats);
  } catch (err) {
    showToast('Could not load analytics data.', 'error');
  }
}

function renderDonutChart(stats) {
  const ctx = document.getElementById('donutChart').getContext('2d');

  if (donutChart) { donutChart.destroy(); donutChart = null; }

  if (!stats.total || stats.total === 0) {
    ctx.font = '14px Poppins, sans-serif';
    ctx.fillStyle = '#94a3b8';
    ctx.textAlign = 'center';
    ctx.fillText('No data yet — run some analyses first!', ctx.canvas.width / 2, ctx.canvas.height / 2);
    return;
  }

  donutChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Real Jobs', 'Fake Jobs'],
      datasets: [{
        data: [stats.real, stats.fake],
        backgroundColor: ['#2457D6', '#D97706'],
        borderColor: ['#ffffff', '#ffffff'],
        borderWidth: 3,
        hoverOffset: 8
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      cutout: '62%',
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            font: { family: 'Poppins', size: 12, weight: '600' },
            color: '#172554',
            padding: 16,
            usePointStyle: true
          }
        },
        tooltip: {
          callbacks: {
            label: ctx => {
              const pct = ((ctx.raw / stats.total) * 100).toFixed(1);
              return ` ${ctx.label}: ${ctx.raw} (${pct}%)`;
            }
          }
        }
      }
    }
  });
}

function renderBarChart(daily) {
  const ctx = document.getElementById('barChart').getContext('2d');

  if (barChart) { barChart.destroy(); barChart = null; }

  // Build last 7 days labels
  const labels = [];
  const days   = 7;
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    labels.push(d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }));
  }

  // Map daily data to labels
  const dailyMap = {};
  (daily || []).forEach(d => { dailyMap[d.day] = d; });

  const realCounts = [];
  const fakeCounts = [];

  for (let i = days - 1; i >= 0; i--) {
    const d   = new Date();
    d.setDate(d.getDate() - i);
    const key = d.toISOString().split('T')[0];
    const rec = dailyMap[key];
    fakeCounts.push(rec ? rec.fake  : 0);
    realCounts.push(rec ? (rec.total - rec.fake) : 0);
  }

  barChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        {
          label: 'Real Jobs',
          data: realCounts,
          backgroundColor: '#2457D6',
          borderRadius: 4,
          borderSkipped: false
        },
        {
          label: 'Fake Jobs',
          data: fakeCounts,
          backgroundColor: '#D97706',
          borderRadius: 4,
          borderSkipped: false
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          stacked: true,
          grid: { display: false },
          ticks: {
            font: { family: 'Poppins', size: 10 },
            color: '#64748b'
          }
        },
        y: {
          stacked: true,
          beginAtZero: true,
          ticks: {
            precision: 0,
            font: { family: 'Poppins', size: 11 },
            color: '#64748b'
          },
          grid: { color: '#f1f5f9' }
        }
      },
      plugins: {
        legend: {
          position: 'top',
          labels: {
            font: { family: 'Poppins', size: 12, weight: '600' },
            color: '#172554',
            usePointStyle: true,
            padding: 14
          }
        }
      }
    }
  });
}

function renderSummaryStats(stats) {
  const container = document.getElementById('summaryStats');
  const fakePct   = stats.fake_percentage ?? 0;
  const realPct   = stats.total > 0 ? (100 - fakePct).toFixed(1) : 0;

  container.innerHTML = `
    <div class="summary-stats-grid">
      <div class="summary-stat">
        <div class="summary-stat-num">${stats.total}</div>
        <div class="summary-stat-label">Total Analysed</div>
      </div>
      <div class="summary-stat">
        <div class="summary-stat-num">${stats.real}</div>
        <div class="summary-stat-label">Real Jobs</div>
      </div>
      <div class="summary-stat amber-top">
        <div class="summary-stat-num amber">${stats.fake}</div>
        <div class="summary-stat-label">Fake Jobs Detected</div>
      </div>
      <div class="summary-stat amber-top">
        <div class="summary-stat-num amber">${fakePct}%</div>
        <div class="summary-stat-label">Fake Prediction Rate</div>
      </div>
    </div>
  `;
}

// ── Export CSV ───────────────────────────────────────────────────
async function exportCSV() {
  try {
    showToast('Preparing CSV export…', 'info');
    const res  = await fetch('/history?page=1&per_page=9999');
    const data = await res.json();

    if (!data.items || data.items.length === 0) {
      showToast('No data to export.', 'error');
      return;
    }

    const headers = ['ID', 'Job Title', 'Company', 'Prediction', 'Is Fake', 'Fake Probability', 'Real Probability', 'Date Analysed'];
    const rows = data.items.map(item => [
      item.id,
      csvCell(item.job_title),
      csvCell(item.company),
      csvCell(item.prediction),
      item.is_fake ? 'Yes' : 'No',
      item.fake_prob != null ? (item.fake_prob * 100).toFixed(2) + '%' : '',
      item.real_prob != null ? (item.real_prob * 100).toFixed(2) + '%' : '',
      item.created_at
    ]);

    const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = `jobcipher_history_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('CSV exported successfully!', 'success');
  } catch (err) {
    showToast('Export failed: ' + err.message, 'error');
  }
}

function csvCell(val) {
  if (!val) return '';
  const str = String(val).replace(/"/g, '""');
  return str.includes(',') || str.includes('"') || str.includes('\n') ? `"${str}"` : str;
}

// ── Toast Notification ───────────────────────────────────────────
function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  const icons = { success: '✅', error: '❌', info: 'ℹ️' };
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span>${icons[type] || 'ℹ️'}</span><span>${escHtml(message)}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('fade-out');
    setTimeout(() => toast.remove(), 350);
  }, 3200);
}

// ── Helpers ──────────────────────────────────────────────────────
function formatDate(dateStr) {
  if (!dateStr) return '—';
  try {
    const d = new Date(dateStr.replace(' ', 'T'));
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
      + ' · '
      + d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  } catch {
    return dateStr;
  }
}

function truncate(str, len) {
  if (!str) return '';
  return str.length > len ? str.substring(0, len) + '…' : str;
}

function escHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ═══════════════════════════════════════════════════════════
// JOBCIPHER AI — GSAP ANIMATION CONTROLLER
// ═══════════════════════════════════════════════════════════

const motionReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

function animateDashboard() {

    if (typeof gsap === "undefined" || motionReduced) return;

    const timeline = gsap.timeline();

    timeline
        .from(".topnav", {
            y: -15,
            opacity: 0,
            duration: 0.45,
            ease: "power2.out"
        })
        .from(".section-header", {
            y: 20,
            opacity: 0,
            duration: 0.5,
            ease: "power2.out"
        }, "-=0.2")
        .from(".stat-card", {
            y: 25,
            opacity: 0,
            duration: 0.5,
            stagger: 0.12,
            ease: "power2.out"
        }, "-=0.2")
        .from(".dashboard-lower .card", {
            y: 20,
            opacity: 0,
            duration: 0.5,
            stagger: 0.15,
            ease: "power2.out"
        }, "-=0.2");
}

function animateSection(sectionId) {

    if (typeof gsap === "undefined" || motionReduced) return;

    const section = document.getElementById(`section-${sectionId}`);

    if (!section) return;

    const elements = section.querySelectorAll(
        ".section-header, .card, .stat-card, .summary-stat"
    );

    gsap.fromTo(elements,
        {
            y: 18,
            opacity: 0
        },
        {
            y: 0,
            opacity: 1,
            duration: 0.45,
            stagger: 0.08,
            ease: "power2.out",
            clearProps: "all"
        }
    );
}

function animateLoginPage() {

    if (typeof gsap === "undefined" || motionReduced) return;

    gsap.from(".login-left", {
        x: -30,
        opacity: 0,
        duration: 0.7,
        ease: "power2.out"
    });

    gsap.from(".login-card", {
        y: 25,
        opacity: 0,
        duration: 0.7,
        delay: 0.15,
        ease: "power3.out"
    });
}

function animateDetectionResult() {

    if (typeof gsap === "undefined" || motionReduced) return;

    const result = document.getElementById("resultContent");

    if (!result || result.classList.contains("hidden")) return;

    gsap.fromTo(result,
        {
            y: 20,
            opacity: 0
        },
        {
            y: 0,
            opacity: 1,
            duration: 0.55,
            ease: "power2.out",
            clearProps: "all"
        }
    );
}
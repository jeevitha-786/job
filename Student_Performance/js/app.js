/**
 * ZENITH - Main Application Controller
 * Handles Navigation, Predictor Forms, Interactive SVG Charts,
 * Dataset Exploration, Pagination, Search, and Batch Processing.
 */

document.addEventListener('DOMContentLoaded', () => {
  // State
  const state = {
    currentTab: 'dashboard',
    theme: localStorage.getItem('zenith-theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'),
    selectedModel: 'gradientBoosting',
    activeDatasetKey: 'training.csv',
    customDatasets: {},
    datasetPage: 1,
    datasetPageSize: 15,
    datasetSearch: '',
    datasetSortCol: 'G3',
    datasetSortAsc: false,
    batchPredictions: []
  };

  // Initialize theme
  document.documentElement.setAttribute('data-theme', state.theme);
  const themeBtn = document.getElementById('themeToggleBtn');
  if (themeBtn) {
    themeBtn.textContent = state.theme === 'dark' ? '☀️' : '🌙';
    themeBtn.addEventListener('click', () => {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', state.theme);
      localStorage.setItem('zenith-theme', state.theme);
      themeBtn.textContent = state.theme === 'dark' ? '☀️' : '🌙';
      renderModelCharts();
      renderDatasetCharts();
    });
  }

  // Sidebar navigation
  const navItems = document.querySelectorAll('.nav-item[data-tab]');
  const tabPanes = document.querySelectorAll('.tab-pane');
  const breadcrumbCurrent = document.getElementById('breadcrumbCurrent');
  const sidebar = document.getElementById('appSidebar');
  const mobileToggle = document.getElementById('mobileToggle');

  if (mobileToggle && sidebar) {
    mobileToggle.addEventListener('click', () => {
      sidebar.classList.toggle('open');
    });
  }

  function switchTab(tabId) {
    state.currentTab = tabId;
    navItems.forEach(item => {
      if (item.getAttribute('data-tab') === tabId) {
        item.classList.add('active');
        if (breadcrumbCurrent) breadcrumbCurrent.textContent = item.querySelector('span:last-child').textContent;
      } else {
        item.classList.remove('active');
      }
    });

    tabPanes.forEach(pane => {
      if (pane.id === `tab-${tabId}`) {
        pane.classList.add('active');
      } else {
        pane.classList.remove('active');
      }
    });

    if (sidebar) sidebar.classList.remove('open');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Render charts if tab opened
    if (tabId === 'models') {
      setTimeout(renderModelCharts, 50);
    } else if (tabId === 'dataset') {
      setTimeout(() => {
        renderDatasetTable();
        renderDatasetCharts();
      }, 50);
    }
  }

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      switchTab(item.getAttribute('data-tab'));
    });
  });

  // Action links on dashboard
  document.querySelectorAll('[data-switch-tab]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      switchTab(btn.getAttribute('data-switch-tab'));
    });
  });

  // ----------------------------------------------------
  // PREDICTOR FORM LOGIC
  // ----------------------------------------------------
  const predictForm = document.getElementById('studentPredictForm');
  const g1Input = document.getElementById('input-G1');
  const g2Input = document.getElementById('input-G2');
  const studyInput = document.getElementById('input-studytime');
  const absencesInput = document.getElementById('input-absences');
  const liveMomentum = document.getElementById('liveMomentumVal');
  const liveRatio = document.getElementById('liveRatioVal');

  function updateLiveFeatures() {
    const g1 = parseFloat(g1Input?.value || 10);
    const g2 = parseFloat(g2Input?.value || 10);
    const study = parseFloat(studyInput?.value || 2);
    const abs = parseFloat(absencesInput?.value || 0);

    const momentum = g2 - g1;
    const ratio = study / (abs + 1.0);

    if (liveMomentum) {
      liveMomentum.textContent = (momentum > 0 ? `+${momentum}` : `${momentum}`) + ' pts';
      liveMomentum.className = 'live-metric-val ' + (momentum > 0 ? 'positive' : momentum < 0 ? 'negative' : '');
    }
    if (liveRatio) {
      liveRatio.textContent = ratio.toFixed(2);
    }
  }

  [g1Input, g2Input, studyInput, absencesInput].forEach(inp => {
    if (inp) {
      inp.addEventListener('input', updateLiveFeatures);
      inp.addEventListener('change', updateLiveFeatures);
    }
  });
  updateLiveFeatures();

  // Student Presets
  const PRESETS = {
    achiever: {
      school: 'GP', sex: 'F', age: 17, address: 'U', famsize: 'GT3', Pstatus: 'T',
      Medu: 4, Fedu: 4, Mjob: 'health', Fjob: 'teacher', reason: 'reputation', guardian: 'mother',
      traveltime: 1, studytime: 4, failures: 0, schoolsup: 'no', famsup: 'yes', paid: 'yes',
      activities: 'yes', nursery: 'yes', higher: 'yes', internet: 'yes', romantic: 'no',
      famrel: 5, freetime: 3, goout: 2, Dalc: 1, Walc: 1, health: 5, absences: 2, G1: 17, G2: 18
    },
    improving: {
      school: 'GP', sex: 'M', age: 16, address: 'U', famsize: 'LE3', Pstatus: 'T',
      Medu: 3, Fedu: 2, Mjob: 'services', Fjob: 'other', reason: 'course', guardian: 'mother',
      traveltime: 1, studytime: 3, failures: 0, schoolsup: 'no', famsup: 'yes', paid: 'no',
      activities: 'yes', nursery: 'yes', higher: 'yes', internet: 'yes', romantic: 'no',
      famrel: 4, freetime: 3, goout: 3, Dalc: 1, Walc: 2, health: 4, absences: 4, G1: 9, G2: 14
    },
    average: {
      school: 'GP', sex: 'F', age: 17, address: 'U', famsize: 'GT3', Pstatus: 'T',
      Medu: 2, Fedu: 2, Mjob: 'other', Fjob: 'other', reason: 'home', guardian: 'mother',
      traveltime: 2, studytime: 2, failures: 0, schoolsup: 'no', famsup: 'yes', paid: 'no',
      activities: 'no', nursery: 'yes', higher: 'yes', internet: 'yes', romantic: 'no',
      famrel: 4, freetime: 3, goout: 3, Dalc: 1, Walc: 2, health: 3, absences: 6, G1: 11, G2: 11
    },
    atrisk: {
      school: 'MS', sex: 'M', age: 18, address: 'R', famsize: 'GT3', Pstatus: 'A',
      Medu: 1, Fedu: 1, Mjob: 'at_home', Fjob: 'other', reason: 'course', guardian: 'other',
      traveltime: 3, studytime: 1, failures: 2, schoolsup: 'yes', famsup: 'no', paid: 'no',
      activities: 'no', nursery: 'no', higher: 'no', internet: 'no', romantic: 'yes',
      famrel: 2, freetime: 4, goout: 4, Dalc: 3, Walc: 4, health: 2, absences: 20, G1: 6, G2: 6
    },
    declining: {
      school: 'GP', sex: 'M', age: 17, address: 'U', famsize: 'GT3', Pstatus: 'T',
      Medu: 3, Fedu: 3, Mjob: 'services', Fjob: 'services', reason: 'home', guardian: 'father',
      traveltime: 1, studytime: 2, failures: 0, schoolsup: 'no', famsup: 'no', paid: 'no',
      activities: 'no', nursery: 'yes', higher: 'yes', internet: 'yes', romantic: 'yes',
      famrel: 3, freetime: 4, goout: 4, Dalc: 2, Walc: 3, health: 3, absences: 14, G1: 15, G2: 10
    }
  };

  function loadStudentPreset(data) {
    Object.keys(data).forEach(key => {
      const el = document.getElementById(`input-${key}`);
      if (el) {
        el.value = data[key];
      }
    });
    updateLiveFeatures();
    runPrediction();
  }

  document.querySelectorAll('.btn-preset[data-preset]').forEach(btn => {
    btn.addEventListener('click', () => {
      const p = PRESETS[btn.getAttribute('data-preset')];
      if (p) loadStudentPreset(p);
    });
  });

  // Collect form inputs into an object
  function getFormData() {
    const data = {};
    const elements = predictForm.querySelectorAll('input, select');
    elements.forEach(el => {
      if (el.name) {
        data[el.name] = el.value;
      }
    });
    return data;
  }

  // Model Selector in Predictor
  const modelSelector = document.getElementById('predictorModelSelector');
  if (modelSelector) {
    modelSelector.addEventListener('change', () => {
      state.selectedModel = modelSelector.value;
      runPrediction();
    });
  }

  // Reset form
  const resetBtn = document.getElementById('resetPredictForm');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      predictForm.reset();
      updateLiveFeatures();
      const resultPanel = document.getElementById('predictionResultPanel');
      if (resultPanel) resultPanel.classList.remove('visible');
    });
  }

  // Run prediction
  function runPrediction() {
    const formData = getFormData();
    const result = ZenithPredictor.predict(formData, state.selectedModel);

    const resultPanel = document.getElementById('predictionResultPanel');
    const scoreVal = document.getElementById('resultScoreVal');
    const percentVal = document.getElementById('resultPercentVal');
    const badgeEl = document.getElementById('resultCategoryBadge');
    const summaryEl = document.getElementById('resultSummaryText');
    const meterEl = document.getElementById('resultGaugeMeter');
    const factorsList = document.getElementById('resultFactorsList');
    const recsList = document.getElementById('resultRecommendationsList');
    const modelUsedEl = document.getElementById('resultModelUsed');

    if (scoreVal) scoreVal.textContent = result.finalGrade.toFixed(2);
    if (percentVal) percentVal.textContent = `${result.percentage}% Academic Mastery`;
    if (modelUsedEl) modelUsedEl.textContent = `Predicted by ${result.modelUsed === 'gradientBoosting' ? 'Gradient Boosting' : result.modelUsed === 'ridgeRegression' ? 'Ridge Regression' : result.modelUsed === 'randomForest' ? 'Random Forest' : 'Linear Regression'}`;

    if (badgeEl) {
      badgeEl.className = `result-badge ${result.categoryBadgeClass}`;
      badgeEl.innerHTML = `<span>${result.icon}</span> <span>${result.category}</span>`;
    }

    if (summaryEl) summaryEl.textContent = result.statusSummary;

    // Animate circular gauge meter (circumference = 2 * PI * 90 ≈ 565)
    if (meterEl) {
      const circ = 565;
      const progress = Math.max(0, Math.min(1, result.finalGrade / 20.0));
      const offset = circ - (circ * progress);
      meterEl.style.strokeDashoffset = offset;

      if (result.finalGrade >= 16) {
        meterEl.style.stroke = '#10b981';
      } else if (result.finalGrade >= 10) {
        meterEl.style.stroke = '#2563eb';
      } else {
        meterEl.style.stroke = '#ef4444';
      }
    }

    // Factors list
    if (factorsList) {
      factorsList.innerHTML = '';
      if (result.factors.length === 0) {
        factorsList.innerHTML = '<p class="text-muted" style="font-size:0.85rem">Balanced standard metrics across all inputs.</p>';
      } else {
        result.factors.forEach(f => {
          const item = document.createElement('div');
          item.className = 'factor-item';
          item.innerHTML = `
            <span class="factor-tag ${f.impact}">${f.impact === 'positive' ? '▲ Boost' : '▼ Drag'}</span>
            <div><strong>${f.name}:</strong> ${f.text}</div>
          `;
          factorsList.appendChild(item);
        });
      }
    }

    // Recommendations list
    if (recsList) {
      recsList.innerHTML = '';
      result.recommendations.forEach(r => {
        const li = document.createElement('li');
        li.textContent = r;
        recsList.appendChild(li);
      });
    }

    if (resultPanel) {
      resultPanel.classList.add('visible');
      resultPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  if (predictForm) {
    predictForm.addEventListener('submit', (e) => {
      e.preventDefault();
      runPrediction();
    });
  }

  // ----------------------------------------------------
  // MODEL COMPARISON SECTION
  // ----------------------------------------------------
  function renderModelCharts() {
    if (typeof ZENITH_MODELS === 'undefined') return;
    const benchmarks = ZENITH_MODELS.benchmarks;

    // MAE Bar Chart (Lower is better)
    const maeContainer = document.getElementById('maeChartContainer');
    if (maeContainer) {
      maeContainer.innerHTML = createSvgBarChart({
        data: benchmarks.map(b => ({ label: b.model, value: b.mae, highlight: b.rank === 1 })),
        formatValue: v => v.toFixed(4),
        unit: 'MAE',
        invertHighlight: true,
        height: 240
      });
    }

    // R2 Bar Chart (Higher is better)
    const r2Container = document.getElementById('r2ChartContainer');
    if (r2Container) {
      r2Container.innerHTML = createSvgBarChart({
        data: benchmarks.map(b => ({ label: b.model, value: b.r2, highlight: b.rank === 1 })),
        formatValue: v => (v * 100).toFixed(1) + '%',
        unit: 'R²',
        invertHighlight: false,
        height: 240
      });
    }
  }

  // Native crisp SVG Bar Chart generator (100% offline, zero dependencies)
  function createSvgBarChart({ data, formatValue, unit, height = 240 }) {
    const width = 500;
    const margin = { top: 20, right: 30, bottom: 40, left: 60 };
    const chartW = width - margin.left - margin.right;
    const chartH = height - margin.top - margin.bottom;

    const maxVal = Math.max(...data.map(d => d.value)) * 1.15;
    const barWidth = Math.floor(chartW / data.length) - 24;

    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const axisColor = isDark ? '#334155' : '#e2e8f0';
    const textColor = isDark ? '#94a3b8' : '#64748b';

    let barsSvg = '';
    data.forEach((d, i) => {
      const x = margin.left + (i * (chartW / data.length)) + 12;
      const barH = (d.value / maxVal) * chartH;
      const y = margin.top + (chartH - barH);
      const color = d.highlight ? '#2563eb' : (isDark ? '#334155' : '#cbd5e1');

      barsSvg += `
        <g class="bar-group">
          <rect x="${x}" y="${y}" width="${barWidth}" height="${barH}" rx="4" fill="${color}">
            <title>${d.label}: ${formatValue(d.value)}</title>
          </rect>
          <text x="${x + barWidth / 2}" y="${y - 6}" text-anchor="middle" font-size="11" font-weight="700" fill="${d.highlight ? (isDark ? '#93c5fd' : '#1d4ed8') : textColor}">${formatValue(d.value)}</text>
          <text x="${x + barWidth / 2}" y="${height - 12}" text-anchor="middle" font-size="10.5" font-weight="500" fill="${textColor}">${d.label.split(' ')[0]}</text>
        </g>
      `;
    });

    return `
      <svg viewBox="0 0 ${width} ${height}" class="svg-chart" preserveAspectRatio="xMidYMid meet">
        <line x1="${margin.left}" y1="${margin.top}" x2="${margin.left}" y2="${margin.top + chartH}" stroke="${axisColor}" stroke-width="1.5" />
        <line x1="${margin.left}" y1="${margin.top + chartH}" x2="${width - margin.right}" y2="${margin.top + chartH}" stroke="${axisColor}" stroke-width="1.5" />
        ${barsSvg}
      </svg>
    `;
  }

  // ----------------------------------------------------
  // DATASET EXPLORER LOGIC
  // ----------------------------------------------------
  function getActiveDatasetRecords() {
    if (state.customDatasets[state.activeDatasetKey]) {
      return state.customDatasets[state.activeDatasetKey].records;
    }
    if (typeof ZENITH_DATASETS !== 'undefined' && ZENITH_DATASETS[state.activeDatasetKey]) {
      return ZENITH_DATASETS[state.activeDatasetKey].records;
    }
    return [];
  }

  function renderDatasetTable() {
    const records = getActiveDatasetRecords();
    const countEl = document.getElementById('dsRowCount');
    const colsEl = document.getElementById('dsColCount');
    const missingEl = document.getElementById('dsMissingCount');
    const avgEl = document.getElementById('dsAvgGrade');

    if (countEl) countEl.textContent = records.length;
    if (colsEl) colsEl.textContent = records.length > 0 ? Object.keys(records[0]).length : 0;
    if (missingEl) missingEl.textContent = '0';

    if (avgEl && records.length > 0 && records[0].G3 !== undefined) {
      const sum = records.reduce((acc, r) => acc + (parseFloat(r.G3) || 0), 0);
      avgEl.textContent = (sum / records.length).toFixed(2);
    }

    // Filter by search
    let filtered = records;
    if (state.datasetSearch.trim()) {
      const q = state.datasetSearch.toLowerCase();
      filtered = filtered.filter(r => {
        return Object.values(r).some(v => String(v).toLowerCase().includes(q));
      });
    }

    // Sort
    const col = state.datasetSortCol;
    const asc = state.datasetSortAsc;
    filtered.sort((a, b) => {
      let v1 = a[col];
      let v2 = b[col];
      const n1 = parseFloat(v1);
      const n2 = parseFloat(v2);
      if (!isNaN(n1) && !isNaN(n2)) {
        return asc ? n1 - n2 : n2 - n1;
      }
      v1 = String(v1 || '');
      v2 = String(v2 || '');
      return asc ? v1.localeCompare(v2) : v2.localeCompare(v1);
    });

    // Pagination
    const totalPages = Math.max(1, Math.ceil(filtered.length / state.datasetPageSize));
    if (state.datasetPage > totalPages) state.datasetPage = totalPages;
    const startIdx = (state.datasetPage - 1) * state.datasetPageSize;
    const pageRecords = filtered.slice(startIdx, startIdx + state.datasetPageSize);

    // Render Table Header
    const thead = document.getElementById('datasetTableHead');
    const tbody = document.getElementById('datasetTableBody');

    if (thead && records.length > 0) {
      const headers = ['#', 'Actions', ...Object.keys(records[0])];
      thead.innerHTML = `<tr>${headers.map(h => {
        if (h === '#' || h === 'Actions') return `<th>${h}</th>`;
        const isSorted = state.datasetSortCol === h;
        const arrow = isSorted ? (state.datasetSortAsc ? ' ▲' : ' ▼') : '';
        return `<th data-sort="${h}" style="cursor:pointer">${h}${arrow}</th>`;
      }).join('')}</tr>`;

      thead.querySelectorAll('th[data-sort]').forEach(th => {
        th.addEventListener('click', () => {
          const sCol = th.getAttribute('data-sort');
          if (state.datasetSortCol === sCol) {
            state.datasetSortAsc = !state.datasetSortAsc;
          } else {
            state.datasetSortCol = sCol;
            state.datasetSortAsc = true;
          }
          renderDatasetTable();
        });
      });
    }

    // Render Table Body
    if (tbody) {
      if (pageRecords.length === 0) {
        tbody.innerHTML = `<tr><td colspan="35" style="text-align:center;padding:2rem;">No matching student records found.</td></tr>`;
      } else {
        tbody.innerHTML = pageRecords.map((r, i) => {
          const absRowIdx = startIdx + i + 1;
          const g3 = r.G3 !== undefined ? parseFloat(r.G3) : null;
          let gradePill = '';
          if (g3 !== null) {
            const pillClass = g3 >= 16 ? 'badge-success' : g3 >= 10 ? 'badge-primary' : 'badge-danger';
            gradePill = `<span class="result-badge ${pillClass}" style="padding:0.15rem 0.5rem;font-size:0.75rem;">${g3}</span>`;
          }

          const cells = Object.keys(r).map(k => {
            if (k === 'G3') return `<td>${gradePill}</td>`;
            return `<td>${r[k]}</td>`;
          }).join('');

          return `
            <tr>
              <td><strong>${absRowIdx}</strong></td>
              <td>
                <button class="btn-preset btn-load-row" data-row-idx="${absRowIdx - 1}" style="padding:0.2rem 0.55rem;font-size:0.75rem;">
                  ⚡ Predict
                </button>
              </td>
              ${cells}
            </tr>
          `;
        }).join('');

        tbody.querySelectorAll('.btn-load-row').forEach(btn => {
          btn.addEventListener('click', () => {
            const idx = parseInt(btn.getAttribute('data-row-idx'));
            const studentRecord = filtered[idx];
            if (studentRecord) {
              loadStudentPreset(studentRecord);
              switchTab('predict');
            }
          });
        });
      }
    }

    // Pagination Controls
    const pageInfo = document.getElementById('paginationInfo');
    const prevBtn = document.getElementById('btnPrevPage');
    const nextBtn = document.getElementById('btnNextPage');

    if (pageInfo) {
      pageInfo.textContent = `Showing ${filtered.length > 0 ? startIdx + 1 : 0}–${Math.min(filtered.length, startIdx + state.datasetPageSize)} of ${filtered.length} students (Page ${state.datasetPage} of ${totalPages})`;
    }
    if (prevBtn) {
      prevBtn.disabled = state.datasetPage <= 1;
      prevBtn.onclick = () => {
        if (state.datasetPage > 1) {
          state.datasetPage--;
          renderDatasetTable();
        }
      };
    }
    if (nextBtn) {
      nextBtn.disabled = state.datasetPage >= totalPages;
      nextBtn.onclick = () => {
        if (state.datasetPage < totalPages) {
          state.datasetPage++;
          renderDatasetTable();
        }
      };
    }
  }

  // Dataset Search Listener
  const searchInput = document.getElementById('datasetSearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      state.datasetSearch = e.target.value;
      state.datasetPage = 1;
      renderDatasetTable();
    });
  }

  // Dataset Pill Selectors
  document.querySelectorAll('.dataset-pill-btn[data-dataset]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.dataset-pill-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.activeDatasetKey = btn.getAttribute('data-dataset');
      state.datasetPage = 1;
      state.datasetSearch = '';
      if (searchInput) searchInput.value = '';
      renderDatasetTable();
      renderDatasetCharts();
    });
  });

  // Final Grade Distribution Histogram (SVG)
  function renderDatasetCharts() {
    const records = getActiveDatasetRecords();
    const container = document.getElementById('g3DistChartContainer');
    if (!container || records.length === 0 || records[0].G3 === undefined) return;

    // Counts for G3: 0 to 20
    const counts = new Array(21).fill(0);
    records.forEach(r => {
      const g = parseInt(r.G3, 10);
      if (!isNaN(g) && g >= 0 && g <= 20) {
        counts[g]++;
      }
    });

    const width = 600;
    const height = 220;
    const margin = { top: 20, right: 20, bottom: 35, left: 40 };
    const chartW = width - margin.left - margin.right;
    const chartH = height - margin.top - margin.bottom;

    const maxCount = Math.max(...counts, 1);
    const barWidth = Math.max(8, Math.floor(chartW / 21) - 4);

    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const axisColor = isDark ? '#334155' : '#e2e8f0';
    const textColor = isDark ? '#94a3b8' : '#64748b';

    let bars = '';
    for (let g = 0; g <= 20; g++) {
      const c = counts[g];
      const x = margin.left + (g * (chartW / 21)) + 2;
      const barH = (c / maxCount) * chartH;
      const y = margin.top + (chartH - barH);
      const color = g >= 16 ? '#10b981' : g >= 10 ? '#2563eb' : '#ef4444';

      bars += `
        <rect x="${x}" y="${y}" width="${barWidth}" height="${barH}" rx="3" fill="${color}">
          <title>Grade ${g}: ${c} student(s)</title>
        </rect>
        ${c > 0 ? `<text x="${x + barWidth / 2}" y="${y - 4}" text-anchor="middle" font-size="9.5" font-weight="600" fill="${textColor}">${c}</text>` : ''}
        <text x="${x + barWidth / 2}" y="${height - 10}" text-anchor="middle" font-size="9.5" fill="${textColor}">${g}</text>
      `;
    }

    container.innerHTML = `
      <svg viewBox="0 0 ${width} ${height}" class="svg-chart" preserveAspectRatio="xMidYMid meet">
        <line x1="${margin.left}" y1="${margin.top + chartH}" x2="${width - margin.right}" y2="${margin.top + chartH}" stroke="${axisColor}" stroke-width="1.5" />
        ${bars}
      </svg>
    `;
  }

  // ----------------------------------------------------
  // CSV PARSER & DRAG/DROP UPLOAD FOR DATASET & BATCH
  // ----------------------------------------------------
  function parseCSV(text) {
    const lines = text.trim().split(/\r\n|\n/);
    if (lines.length < 2) return [];
    const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
    const records = [];

    for (let i = 1; i < lines.length; i++) {
      if (!lines[i].trim()) continue;
      const row = lines[i].split(',').map(v => v.trim().replace(/^"|"$/g, ''));
      const obj = {};
      headers.forEach((h, idx) => {
        obj[h] = row[idx] !== undefined ? row[idx] : '';
      });
      records.push(obj);
    }
    return records;
  }

  // Dropzone setup
  const dropzone = document.getElementById('csvDropzone');
  const fileInput = document.getElementById('csvFileInput');

  if (dropzone && fileInput) {
    dropzone.addEventListener('click', () => fileInput.click());
    dropzone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropzone.classList.add('dragover');
    });
    dropzone.addEventListener('dragleave', () => dropzone.classList.remove('dragover'));
    dropzone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropzone.classList.remove('dragover');
      if (e.dataTransfer.files.length > 0) {
        handleUploadedFile(e.dataTransfer.files[0]);
      }
    });
    fileInput.addEventListener('change', () => {
      if (fileInput.files.length > 0) {
        handleUploadedFile(fileInput.files[0]);
      }
    });
  }

  function handleUploadedFile(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target.result;
        const records = parseCSV(text);
        if (records.length === 0) {
          alert('Could not parse any student records from this CSV file.');
          return;
        }

        const key = `upload_${Date.now()}`;
        state.customDatasets[key] = {
          title: file.name,
          filename: file.name,
          records
        };

        // Add pill button to dataset explorer
        const pillsContainer = document.getElementById('datasetPillsContainer');
        if (pillsContainer) {
          const newBtn = document.createElement('button');
          newBtn.className = 'dataset-pill-btn active';
          newBtn.setAttribute('data-dataset', key);
          newBtn.textContent = `📄 ${file.name} (${records.length})`;
          document.querySelectorAll('.dataset-pill-btn').forEach(b => b.classList.remove('active'));
          pillsContainer.appendChild(newBtn);

          newBtn.addEventListener('click', () => {
            document.querySelectorAll('.dataset-pill-btn').forEach(b => b.classList.remove('active'));
            newBtn.classList.add('active');
            state.activeDatasetKey = key;
            state.datasetPage = 1;
            renderDatasetTable();
            renderDatasetCharts();
          });
        }

        state.activeDatasetKey = key;
        state.datasetPage = 1;
        renderDatasetTable();
        renderDatasetCharts();

        // Also run batch prediction if on batch tab
        runBatchPrediction(records);

      } catch (err) {
        alert('Error processing CSV: ' + err.message);
      }
    };
    reader.readAsText(file);
  }

  // Batch Predict on preloaded or uploaded data
  function runBatchPrediction(records) {
    if (!records || records.length === 0) return;
    const results = ZenithPredictor.predictBatch(records, state.selectedModel);
    state.batchPredictions = results;

    const panel = document.getElementById('batchResultsPanel');
    const tbody = document.getElementById('batchResultsBody');
    const summaryEl = document.getElementById('batchSummaryText');

    if (summaryEl) {
      const avgPred = results.reduce((acc, r) => acc + r.predicted, 0) / results.length;
      const passRate = (results.filter(r => r.predicted >= 10).length / results.length) * 100;
      summaryEl.innerHTML = `Evaluated <strong>${results.length}</strong> students. Mean Projected Grade: <strong>${avgPred.toFixed(2)}/20</strong>. Passing Rate: <strong>${passRate.toFixed(1)}%</strong>.`;
    }

    if (tbody) {
      tbody.innerHTML = results.slice(0, 100).map(r => {
        const catBadge = r.predicted >= 16 ? 'badge-success' : r.predicted >= 10 ? 'badge-primary' : 'badge-danger';
        return `
          <tr>
            <td><strong>#${r.rowIndex}</strong></td>
            <td><span class="result-badge ${catBadge}" style="padding:0.2rem 0.6rem;font-size:0.8rem;">${r.predicted.toFixed(2)} / 20</span></td>
            <td>${r.percentage}%</td>
            <td>${r.category.split(' ')[0]}</td>
            <td>${r.actual !== null ? `${r.actual.toFixed(2)}` : '<span class="text-muted">—</span>'}</td>
            <td>${r.diff !== null ? `±${r.diff.toFixed(2)}` : '<span class="text-muted">—</span>'}</td>
          </tr>
        `;
      }).join('');
    }

    if (panel) panel.classList.add('visible');
  }

  // Preloaded Batch Predictor trigger buttons
  const batchTrainingBtn = document.getElementById('batchPredictTrainingBtn');
  const batchChallengeBtn = document.getElementById('batchPredictChallengeBtn');

  if (batchTrainingBtn) {
    batchTrainingBtn.addEventListener('click', () => {
      const records = ZENITH_DATASETS['training.csv']?.records || [];
      runBatchPrediction(records);
    });
  }

  if (batchChallengeBtn) {
    batchChallengeBtn.addEventListener('click', () => {
      const records = ZENITH_DATASETS['surprise_challenge.csv']?.records || [];
      runBatchPrediction(records);
    });
  }

  // Export batch predictions to CSV
  const exportBatchBtn = document.getElementById('exportBatchPredictionsBtn');
  if (exportBatchBtn) {
    exportBatchBtn.addEventListener('click', () => {
      if (state.batchPredictions.length === 0) {
        alert('No batch predictions available to export.');
        return;
      }
      const headers = ['Record_Index', 'Predicted_G3', 'Percentage', 'Category', 'Actual_G3', 'Absolute_Error'];
      const rows = state.batchPredictions.map(r => [
        r.rowIndex,
        r.predicted.toFixed(2),
        r.percentage + '%',
        `"${r.category}"`,
        r.actual !== null ? r.actual.toFixed(2) : '',
        r.diff !== null ? r.diff.toFixed(2) : ''
      ]);

      const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `ZENITH_Predictions_${Date.now()}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }

  // Export Filtered Dataset Table to CSV
  const exportDatasetBtn = document.getElementById('exportDatasetCsvBtn');
  if (exportDatasetBtn) {
    exportDatasetBtn.addEventListener('click', () => {
      const records = getActiveDatasetRecords();
      if (records.length === 0) return;
      const headers = Object.keys(records[0]);
      const rows = records.map(r => headers.map(h => `"${r[h] ?? ''}"`).join(','));
      const csv = [headers.join(','), ...rows].join('\n');
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${state.activeDatasetKey}_exported.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
  }

  // Initial render
  updateLiveFeatures();
  renderModelCharts();
  renderDatasetTable();
  renderDatasetCharts();
});

# 🎓 ZENITH - Student Performance Prediction System (Web Edition)

ZENITH is a student performance prediction and educational analytics system converted from Python/Streamlit into a modern, pure **HTML5, CSS3, and JavaScript** website that runs with **zero dependencies, zero server configuration, and zero errors**.

---

## 🚀 Quick Start

You can run the web application in any of the following ways:

### 1. Direct Browser Opening (No Server Required)
Simply double-click [`index.html`](file:///c:/Users/jeevi/OneDrive/Desktop/zenith/index.html) or open it in any modern web browser (Google Chrome, Microsoft Edge, Firefox, Safari).

### 2. Local HTTP Server (Optional)
If you prefer running via a local web server:
```bash
# Python built-in server
python -m http.server 8000
# Then visit: http://localhost:8000
```
or via Node / npx:
```bash
npx serve
```

---

## ✨ System Features

### 1. 📊 Project Overview / Dashboard
- **Top Algorithm Banner:** Gradient Boosting Regressor (Rank #1, Nonlinear Tree Ensemble).
- **Evaluation Metrics:**
  - Validation MAE: `0.9942` (&lt; 1.0 grade point average error).
  - Validation RMSE: `1.6214`.
  - Validation R²: `0.8473` (84.7% variance explained).
- **Predictive Architecture Workflow:** Visual 4-step pipeline explaining data collection, feature engineering, model inference, and intervention guidance.

### 2. 🔮 Predict Performance
- **30+ Input Attributes:** Across academic history, family/social background, and lifestyle factors.
- **One-Click Student Presets:**
  - 🌟 *High Achiever* (G1: 17, G2: 18)
  - 📈 *Rising Star* (G1: 9 &rarr; G2: 14, positive momentum)
  - ⚖️ *Average Student* (G1: 11, G2: 11)
  - ⚠️ *Needs Support* (G1: 6, G2: 6, high absences)
  - 📉 *Declining Trend* (G1: 15 &rarr; G2: 10)
- **Live Feature Engineering:**
  - `Academic_Momentum = G2 - G1` (tracked dynamically).
  - `Effort_Absence_Ratio = studytime / (absences + 1)`.
- **Model Selector:** Switch between **Gradient Boosting**, **Random Forest**, **Ridge Regression**, or **Linear Regression (OLS)** in real time.
- **Visual Output:**
  - Animated circular score gauge (0 to 20 scale).
  - Classification badge (*High Distinction*, *Good Standing*, *Satisfactory*, *At Risk*).
  - Key contributing positive/negative factors breakdown.
  - Tailored academic recommendations based on student risks.

### 3. 📈 Model Comparison
- **Benchmark Metrics Table:** Comparative performance of all 4 models evaluated during training.
- **Interactive SVG Charts:**
  - Mean Absolute Error (MAE) bar chart with top model highlighted.
  - Goodness of Fit (R²) bar chart.
- **Technical Analysis:** In-depth explanation of non-linear decision trees vs linear models on student data.

### 4. 📁 Dataset Explorer
- **Interactive Dataset Switcher:**
  - 📘 Training Dataset (`training.csv` &mdash; 318 records).
  - 🎯 Surprise Challenge Holdout Dataset (`surprise_challenge.csv` &mdash; 75 records).
- **Search & Sort:** Live filtering across all columns and multi-column sorting.
- **Pagination:** Clean paginated navigation with configurable page sizes.
- **Row-Level Prediction:** Click **"⚡ Predict"** on any record in the table to immediately load the student's profile into the calculator.
- **Final Grade (G3) Distribution:** Interactive SVG histogram showing cohort grade distribution from 0 to 20.
- **CSV Export:** Download filtered datasets with one click.

### 5. ⚡ Batch CSV Predictor
- Drag and drop any custom `.csv` dataset.
- Run predictions across hundreds of students simultaneously in milliseconds.
- View projected grades, mastery percentages, category badges, and error deltas.
- Export batch predictions directly to a new `.csv` file.

### 6. 🎨 User Experience & Theming
- **Dark & Light Mode:** Toggleable with persistent preference stored in `localStorage`.
- **Responsive Layout:** Optimized for desktop, laptop, tablet, and mobile displays.
- **100% Offline Compatible:** Zero external CDN dependencies; all charts and datasets are bundled natively.

---

## 📂 File Architecture

```
zenith/
├── index.html                 # Main single-page web application
├── README.md                  # System documentation
├── css/
│   └── style.css              # Responsive styling, design system, light/dark themes
├── js/
│   ├── app.js                 # UI controller, events, tab navigation, SVG chart renderer
│   ├── predictor.js           # Client-side ML inference engine (Gradient Boosting, Ridge, RF)
│   ├── models-data.js         # Exported model weights, trees, and benchmark comparisons
│   └── datasets-data.js       # Embedded training & challenge holdout datasets (zero-CORS)
├── data/
│   ├── training.csv           # Original training dataset (318 rows)
│   └── surprise_challenge.csv # Original holdout challenge dataset (75 rows)
├── models/
│   ├── student_model.pkl      # Python model artifact
│   ├── feature_columns.pkl    # Feature column order
│   └── model_comparison.csv   # Model benchmark comparisons
├── src/                       # Original Python training & evaluation pipeline
└── dashboard.py               # Original Streamlit dashboard
```

---

## ⚖️ Academic Attribution

- **Dataset:** Student Performance Dataset (Cortez and Silva, 2008), University of Minho, Portugal.
- **Ethics:** All estimations are statistical projections intended for supportive academic guidance.

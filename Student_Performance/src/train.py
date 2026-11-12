from pathlib import Path

import joblib
import numpy as np
import pandas as pd

from sklearn.base import clone
from sklearn.compose import ColumnTransformer
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor
from sklearn.impute import SimpleImputer
from sklearn.linear_model import LinearRegression, Ridge
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder, StandardScaler


# --------------------------------------------------
# 1. Set project paths
# --------------------------------------------------

BASE_DIR = Path(__file__).resolve().parent.parent
DATA_DIR = BASE_DIR / "data"
MODEL_DIR = BASE_DIR / "models"

MODEL_DIR.mkdir(parents=True, exist_ok=True)

DATA_PATH = DATA_DIR / "training.csv"
TARGET = "G3"


# --------------------------------------------------
# 2. Load the training dataset
# --------------------------------------------------

if not DATA_PATH.exists():
    raise FileNotFoundError(
        f"Training dataset not found: {DATA_PATH}"
    )

df = pd.read_csv(DATA_PATH, sep=None, engine="python")

if df.empty:
    raise ValueError("training.csv is empty. Add your dataset first.")

print("=" * 55)
print("ZENITH - STUDENT PERFORMANCE MODEL TRAINING")
print("=" * 55)

print("\nDataset shape:", df.shape)
print("\nAvailable columns:")
print(df.columns.tolist())


# --------------------------------------------------
# 3. Validate the target column
# --------------------------------------------------

if TARGET not in df.columns:
    raise ValueError(
        f"Target column '{TARGET}' was not found. "
        "Check your dataset column names."
    )

df[TARGET] = pd.to_numeric(df[TARGET], errors="coerce")
df = df.dropna(subset=[TARGET]).copy()

if df.empty:
    raise ValueError("No valid G3 target values were found.")


# --------------------------------------------------
# 4. Feature engineering
# --------------------------------------------------

if {"G1", "G2"}.issubset(df.columns):
    df["Academic_Momentum"] = (
        pd.to_numeric(df["G2"], errors="coerce")
        - pd.to_numeric(df["G1"], errors="coerce")
    )
else:
    raise ValueError("The dataset must contain G1 and G2.")

if {"studytime", "absences"}.issubset(df.columns):
    studytime = pd.to_numeric(df["studytime"], errors="coerce")
    absences = pd.to_numeric(df["absences"], errors="coerce")

    df["Effort_Absence_Ratio"] = studytime / (absences + 1)
else:
    raise ValueError(
        "The dataset must contain studytime and absences."
    )

print("\nEngineered features:")
print("- Academic_Momentum")
print("- Effort_Absence_Ratio")


# --------------------------------------------------
# 5. Prepare input features and target
# --------------------------------------------------

# Remove the target from the input features.
# G1 and G2 are retained as well as the engineered features.
X = df.drop(columns=[TARGET])
y = df[TARGET]

# Remove columns that directly reveal the target or its equivalent.
# G3 is already removed above.
# G1 and G2 are legitimate earlier assessment values.

# Drop columns that contain no useful variation.
constant_columns = [
    col for col in X.columns
    if X[col].nunique(dropna=False) <= 1
]

if constant_columns:
    X = X.drop(columns=constant_columns)
    print("\nRemoved constant columns:", constant_columns)

# Separate numeric and categorical columns.
numeric_features = X.select_dtypes(
    include=["number", "bool"]
).columns.tolist()

categorical_features = X.select_dtypes(
    exclude=["number", "bool"]
).columns.tolist()

numeric_pipeline = Pipeline([
    ("imputer", SimpleImputer(strategy="median")),
    ("scaler", StandardScaler())
])

categorical_pipeline = Pipeline([
    ("imputer", SimpleImputer(strategy="most_frequent")),
    ("encoder", OneHotEncoder(handle_unknown="ignore"))
])

preprocessor = ColumnTransformer([
    ("numeric", numeric_pipeline, numeric_features),
    ("categorical", categorical_pipeline, categorical_features)
])


# --------------------------------------------------
# 6. Split data for fair evaluation
# --------------------------------------------------

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

print("\nTraining rows:", len(X_train))
print("Testing rows:", len(X_test))


# --------------------------------------------------
# 7. Compare baseline and advanced models
# --------------------------------------------------

models = {
    "Linear Regression": LinearRegression(),
    "Ridge Regression": Ridge(alpha=1.0),
    "Random Forest": RandomForestRegressor(
        n_estimators=200,
        random_state=42,
        min_samples_leaf=2
    ),
    "Gradient Boosting": GradientBoostingRegressor(
        random_state=42
    )
}

results = []
trained_models = {}

for name, estimator in models.items():

    pipeline = Pipeline([
        ("preprocessor", clone(preprocessor)),
        ("model", estimator)
    ])

    pipeline.fit(X_train, y_train)

    predictions = pipeline.predict(X_test)

    mae = mean_absolute_error(y_test, predictions)
    rmse = np.sqrt(mean_squared_error(y_test, predictions))
    r2 = r2_score(y_test, predictions)

    results.append({
        "Model": name,
        "MAE": mae,
        "RMSE": rmse,
        "R2": r2
    })

    trained_models[name] = pipeline

    print(f"\n{name}")
    print(f"MAE:  {mae:.4f}")
    print(f"RMSE: {rmse:.4f}")
    print(f"R2:   {r2:.4f}")


# --------------------------------------------------
# 8. Select the model with the lowest validation MAE
# --------------------------------------------------

results_df = pd.DataFrame(results).sort_values(
    by="MAE",
    ascending=True
)

print("\n" + "=" * 55)
print("MODEL COMPARISON")
print("=" * 55)
print(results_df.to_string(index=False))

best_name = results_df.iloc[0]["Model"]
best_model = trained_models[best_name]

print("\nBest model:", best_name)
print("Best validation MAE:", round(
    float(results_df.iloc[0]["MAE"]), 4
))


# --------------------------------------------------
# 9. Save model and feature information
# --------------------------------------------------

joblib.dump(best_model, MODEL_DIR / "student_model.pkl")
joblib.dump(
    X.columns.tolist(),
    MODEL_DIR / "feature_columns.pkl"
)

results_df.to_csv(
    MODEL_DIR / "model_comparison.csv",
    index=False
)

print("\nSaved files:")
print("- models/student_model.pkl")
print("- models/feature_columns.pkl")
print("- models/model_comparison.csv")

print("\nModel training completed successfully!")
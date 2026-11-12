from pathlib import Path
import joblib
import numpy as np
import pandas as pd
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
from sklearn.model_selection import train_test_split

# Project paths
PROJECT_DIR = Path(__file__).resolve().parent.parent
MODEL_PATH = PROJECT_DIR / "models" / "student_model.pkl"
FEATURE_PATH = PROJECT_DIR / "models" / "feature_columns.pkl"
TRAIN_DATA_PATH = PROJECT_DIR / "data" / "training.csv"
CHALLENGE_DATA_PATH = PROJECT_DIR / "data" / "surprise_challenge.csv"
TARGET_COLUMN = "G3"


def prepare_features(df: pd.DataFrame, feature_columns: list) -> pd.DataFrame:
    """Apply feature engineering and match expected feature columns."""
    df_feat = df.copy()

    # Academic momentum: change from G1 to G2
    df_feat["Academic_Momentum"] = (
        pd.to_numeric(df_feat["G2"], errors="coerce")
        - pd.to_numeric(df_feat["G1"], errors="coerce")
    )
    # Effort to absence ratio
    studytime = pd.to_numeric(df_feat["studytime"], errors="coerce")
    absences = pd.to_numeric(df_feat["absences"], errors="coerce")
    df_feat["Effort_Absence_Ratio"] = studytime / (absences + 1)

    return df_feat.reindex(columns=feature_columns)


def evaluate_dataset(name: str, model, feature_columns, df: pd.DataFrame):
    """Evaluate model on a dataset with actual G3 values."""
    if TARGET_COLUMN not in df.columns:
        print(f"Skipping {name}: target '{TARGET_COLUMN}' not found.")
        return

    clean_df = df.dropna(subset=[TARGET_COLUMN]).copy()
    clean_df[TARGET_COLUMN] = pd.to_numeric(clean_df[TARGET_COLUMN], errors="coerce")
    clean_df = clean_df.dropna(subset=[TARGET_COLUMN])

    X = clean_df.drop(columns=[TARGET_COLUMN])
    y_true = clean_df[TARGET_COLUMN]

    X_prep = prepare_features(X, feature_columns)
    predictions = model.predict(X_prep)
    predictions = np.clip(predictions, 0.0, 20.0)

    mae = mean_absolute_error(y_true, predictions)
    rmse = np.sqrt(mean_squared_error(y_true, predictions))
    r2 = r2_score(y_true, predictions)

    print(f"\n--- {name} ({len(y_true)} samples) ---")
    print(f"  Mean Absolute Error (MAE): {mae:.4f}")
    print(f"  Root Mean Squared Error (RMSE): {rmse:.4f}")
    print(f"  R-squared (R²): {r2:.4f}")


def test_model():
    if not MODEL_PATH.exists() or not FEATURE_PATH.exists():
        print("ERROR: Trained model files not found.")
        print("Run python src/train.py first.")
        return

    model = joblib.load(MODEL_PATH)
    feature_columns = joblib.load(FEATURE_PATH)

    print("=" * 55)
    print("ZENITH - MODEL EVALUATION & TESTING")
    print("=" * 55)

    # 1. Evaluate on Validation Split of training.csv (consistent with train.py)
    if TRAIN_DATA_PATH.exists():
        train_df = pd.read_csv(TRAIN_DATA_PATH)
        if TARGET_COLUMN in train_df.columns:
            train_df = train_df.dropna(subset=[TARGET_COLUMN]).copy()
            train_df[TARGET_COLUMN] = pd.to_numeric(train_df[TARGET_COLUMN], errors="coerce")
            train_df = train_df.dropna(subset=[TARGET_COLUMN])

            _, val_df = train_test_split(
                train_df, test_size=0.20, random_state=42
            )
            evaluate_dataset("Validation Set (20% split of training.csv)", model, feature_columns, val_df)

    # 2. Evaluate on the Holdout Challenge Set (surprise_challenge.csv)
    if CHALLENGE_DATA_PATH.exists():
        challenge_df = pd.read_csv(CHALLENGE_DATA_PATH)
        evaluate_dataset("Holdout Challenge Set (surprise_challenge.csv)", model, feature_columns, challenge_df)
    else:
        print(f"\nNotice: Holdout set not found at {CHALLENGE_DATA_PATH}")

    print("\n" + "=" * 55)
    print("Evaluation completed successfully!")


if __name__ == "__main__":
    test_model()

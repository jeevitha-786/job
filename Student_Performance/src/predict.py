from pathlib import Path
import joblib
import pandas as pd

# Project paths
PROJECT_DIR = Path(__file__).resolve().parent.parent
MODEL_FILE = PROJECT_DIR / "models" / "student_model.pkl"
FEATURE_FILE = PROJECT_DIR / "models" / "feature_columns.pkl"
DATA_FILE = PROJECT_DIR / "data" / "training.csv"


def prepare_features(df: pd.DataFrame, feature_columns: list) -> pd.DataFrame:
    """Apply feature engineering and match expected training feature columns."""
    df_feat = df.copy()

    # Engineer features matching training pipeline
    df_feat["Academic_Momentum"] = (
        pd.to_numeric(df_feat["G2"], errors="coerce")
        - pd.to_numeric(df_feat["G1"], errors="coerce")
    )
    studytime = pd.to_numeric(df_feat["studytime"], errors="coerce")
    absences = pd.to_numeric(df_feat["absences"], errors="coerce")
    df_feat["Effort_Absence_Ratio"] = studytime / (absences + 1)

    # Reindex to ensure identical feature order
    return df_feat.reindex(columns=feature_columns)


def predict_student_performance():
    # Check whether the trained model exists
    if not MODEL_FILE.exists() or not FEATURE_FILE.exists():
        print("Error: Trained model or feature definition not found.")
        print("Run python src/train.py first.")
        return

    # Load model and feature column order
    model = joblib.load(MODEL_FILE)
    feature_columns = joblib.load(FEATURE_FILE)

    # Load dataset to pick a sample record
    if not DATA_FILE.exists():
        print(f"Error: Dataset not found at {DATA_FILE}")
        return

    df = pd.read_csv(DATA_FILE)

    # Drop target column if present
    features_only = df.drop(columns=["G3"]) if "G3" in df.columns else df.copy()

    print("=" * 45)
    print("ZENITH - CLI STUDENT GRADE PREDICTOR")
    print("=" * 45)
    print(f"Total student records available: {len(features_only)}")

    try:
        user_choice = input(f"Choose a student row (1-{len(features_only)}): ").strip()
        if not user_choice:
            return

        row_number = int(user_choice)
        if row_number < 1 or row_number > len(features_only):
            print("Invalid row number.")
            return

        student_row = features_only.iloc[[row_number - 1]]
        actual_grade = df.iloc[row_number - 1].get("G3", None)

        # Prepare features with engineering
        student_prepared = prepare_features(student_row, feature_columns)

        # Predict grade
        prediction = float(model.predict(student_prepared)[0])
        prediction = max(0.0, min(20.0, prediction))

        print("\nStudent Performance Prediction")
        print("-" * 35)
        print(f"Selected Student Record: #{row_number}")
        if actual_grade is not None:
            print(f"Actual Final Grade (G3):   {actual_grade:.2f} / 20")
        print(f"Predicted Final Grade (G3):  {prediction:.2f} / 20")
        if actual_grade is not None:
            print(f"Absolute Difference:       {abs(actual_grade - prediction):.2f}")
        print("-" * 35)

    except ValueError:
        print("Please enter a valid whole number.")
    except Exception as err:
        print(f"Prediction error: {err}")


if __name__ == "__main__":
    predict_student_performance()

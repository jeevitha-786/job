from pathlib import Path
import pandas as pd

# Find the project folder
PROJECT_DIR = Path(__file__).resolve().parent.parent

# Dataset paths
INPUT_PATH = PROJECT_DIR / "data" / "training.csv"
OUTPUT_PATH = PROJECT_DIR / "data" / "cleaned_data.csv"

# Target column for student performance prediction
TARGET_COLUMN = "G3"


def preprocess_dataset():
    # Check whether the dataset exists
    if not INPUT_PATH.exists():
        print("Error: training.csv was not found in the data folder.")
        return

    try:
        # Load the dataset
        df = pd.read_csv(INPUT_PATH, sep=None, engine="python")

        print("Original dataset shape:", df.shape)

        # Remove duplicate rows
        df = df.drop_duplicates()

        # Check whether the target column exists
        if TARGET_COLUMN not in df.columns:
            print(f"Error: Target column '{TARGET_COLUMN}' was not found.")
            print("Available columns:", df.columns.tolist())
            print("Check your dataset before continuing.")
            return

        # Convert target values to numeric
        df[TARGET_COLUMN] = pd.to_numeric(
            df[TARGET_COLUMN], errors="coerce"
        )

        # Remove rows with missing target values
        df = df.dropna(subset=[TARGET_COLUMN])

        # Keep valid final grades between 0 and 20
        df = df[df[TARGET_COLUMN].between(0, 20)]

        # Save the cleaned dataset
        df.to_csv(OUTPUT_PATH, index=False)

        print("Cleaned dataset shape:", df.shape)
        print(f"Cleaned dataset saved to: {OUTPUT_PATH}")

    except Exception as error:
        print("Preprocessing failed:", error)


if __name__ == "__main__":
    preprocess_dataset()

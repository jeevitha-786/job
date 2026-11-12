from pathlib import Path
import pandas as pd

# Find the project folder
PROJECT_DIR = Path(__file__).resolve().parent.parent

# Dataset location
DATA_PATH = PROJECT_DIR / "data" / "training.csv"


def inspect_dataset():
    if not DATA_PATH.exists():
        print(f"Dataset not found: {DATA_PATH}")
        print("Place your actual dataset in the data folder as training.csv.")
        return

    try:
        # Read the CSV file
        df = pd.read_csv(DATA_PATH, sep=None, engine="python")

        print("\n========== DATASET OVERVIEW ==========")
        print("Dataset shape:", df.shape)

        print("\n========== FIRST 5 ROWS ==========")
        print(df.head())

        print("\n========== COLUMN NAMES ==========")
        print(df.columns.tolist())

        print("\n========== DATA TYPES ==========")
        print(df.dtypes)

        print("\n========== MISSING VALUES ==========")
        print(df.isnull().sum())

        print("\n========== DUPLICATE ROWS ==========")
        print("Duplicates:", df.duplicated().sum())

        print("\n========== NUMERICAL SUMMARY ==========")
        print(df.describe())

        print("\n========== CATEGORICAL SUMMARY ==========")
        print(df.describe(include="object"))

    except Exception as error:
        print("Could not inspect the dataset.")
        print("Error:", error)


if __name__ == "__main__":
    inspect_dataset()


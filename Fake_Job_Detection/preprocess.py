import os
import pandas as pd
from text_cleaner import clean_text

current_dir = os.path.dirname(os.path.abspath(__file__))
dataset_path = os.path.join(current_dir, "fake_job_postings.csv")

print("Loading dataset from:", dataset_path)
df = pd.read_csv(dataset_path)
print("Raw dataset shape:", df.shape)

# Normalize column names if dataset uses Kaggle EMScAD schema
column_rename_map = {
    "title": "job_title",
    "description": "job_description",
    "fraudulent": "is_fake"
}
df = df.rename(columns=column_rename_map)

target_col = "is_fake"
if target_col not in df.columns:
    raise ValueError(f"Target column '{target_col}' not found in dataset columns: {df.columns.tolist()}")

text_columns = [
    "job_title",
    "company_profile",
    "job_description",
    "requirements",
    "benefits"
]

# Keep only text columns that exist in the dataframe
available_text_cols = [col for col in text_columns if col in df.columns]
print("Using text columns:", available_text_cols)

# Fill null values with empty string
df[available_text_cols] = df[available_text_cols].fillna("")

# Combine text columns
print("Combining text columns...")
df["combined_text"] = df[available_text_cols].agg(" ".join, axis=1)

# Clean combined text
print("Cleaning text with HTML entity removal and normalization...")
df["clean_text"] = df["combined_text"].apply(clean_text)

# Ensure target is integer
df[target_col] = df[target_col].astype(int)

# Print distribution
print("\nClass distribution:")
print(df[target_col].value_counts())
print("Fraudulent percentage: {:.2f}%".format(df[target_col].mean() * 100))

# Save processed dataset
output_path = os.path.join(current_dir, "processed_jobs.csv")
df[["clean_text", target_col]].to_csv(output_path, index=False)
print(f"\nProcessed dataset saved to: {output_path}")

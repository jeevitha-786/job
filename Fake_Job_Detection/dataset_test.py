import pandas as pd

# Dataset path
path = r"C:\Users\jeevi\.cache\kagglehub\datasets\khushikyad001\fake-vs-real-job-postings-synthetic-nlp-dataset\versions\1\fake_real_job_postings_3000x25.csv"

# Load dataset
df = pd.read_csv(path)

# Display basic information
print("Dataset shape:", df.shape)

print("\nColumn names:")
print(df.columns.tolist())

print("\nFirst 5 rows:")
print(df.head())

print("\nFake/Real distribution:")
print(df["is_fake"].value_counts())
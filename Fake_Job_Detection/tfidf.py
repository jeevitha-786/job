import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer

df = pd.read_csv("processed_jobs.csv")

X = df["clean_text"]
y = df["is_fake"]

vectorizer = TfidfVectorizer(
    max_features=5000,
    stop_words="english"
)

X_tfidf = vectorizer.fit_transform(X)

print("Original text data:", X.shape)
print("TF-IDF data shape:", X_tfidf.shape)

print("\nNumber of features:", len(vectorizer.get_feature_names_out()))

print("\nFirst 20 TF-IDF features:")
print(vectorizer.get_feature_names_out()[:20])
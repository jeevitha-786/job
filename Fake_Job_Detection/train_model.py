import os
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import (
    accuracy_score,
    classification_report,
    confusion_matrix,
    roc_auc_score
)
import joblib

current_dir = os.path.dirname(os.path.abspath(__file__))
dataset_path = os.path.join(current_dir, "processed_jobs.csv")

print("Loading processed dataset...")
df = pd.read_csv(dataset_path)

# Fill any NA if clean_text ended up empty
df["clean_text"] = df["clean_text"].fillna("")

X = df["clean_text"]
y = df["is_fake"]

print(f"Total samples: {len(df)}")
print(f"Fake jobs: {y.sum()} ({y.mean() * 100:.2f}%)")

# Stratified split to preserve the 4.8% fake ratio in train and test sets
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)

print(f"Training set: {len(X_train)} samples ({y_train.sum()} fake)")
print(f"Testing set: {len(X_test)} samples ({y_test.sum()} fake)")

# TF-IDF Vectorizer with unigrams & bigrams (e.g. "wire transfer", "no experience")
print("\nExtracting TF-IDF features (unigrams + bigrams, max 10,000 features)...")
vectorizer = TfidfVectorizer(
    max_features=10000,
    ngram_range=(1, 2),
    stop_words="english",
    sublinear_tf=True
)

X_train_tfidf = vectorizer.fit_transform(X_train)
X_test_tfidf = vectorizer.transform(X_test)
print("TF-IDF shape:", X_train_tfidf.shape)

# Logistic Regression with balanced class weighting for imbalanced data
print("\nTraining Logistic Regression model with class_weight='balanced'...")
model = LogisticRegression(
    class_weight="balanced",
    max_iter=1000,
    random_state=42,
    C=1.0
)

model.fit(X_train_tfidf, y_train)

# Evaluation
y_pred = model.predict(X_test_tfidf)
y_prob = model.predict_proba(X_test_tfidf)[:, 1]

accuracy = accuracy_score(y_test, y_pred)
roc_auc = roc_auc_score(y_test, y_prob)
cm = confusion_matrix(y_test, y_pred)

print("\n" + "=" * 50)
print("              EVALUATION RESULTS")
print("=" * 50)
print(f"Accuracy:  {accuracy * 100:.2f}%")
print(f"ROC-AUC:   {roc_auc:.4f}")
print("\nConfusion Matrix:")
print(f"  True Real:  {cm[0][0]:<5}  |  False Fake (FP): {cm[0][1]}")
print(f"  False Real (FN): {cm[1][0]:<5} |  True Fake (TP):  {cm[1][1]}")

print("\nClassification Report:")
print(classification_report(y_test, y_pred, target_names=["Real (0)", "Fake (1)"], digits=4))

# Save the trained model and vectorizer
model_path = os.path.join(current_dir, "fake_job_model.pkl")
vectorizer_path = os.path.join(current_dir, "tfidf_vectorizer.pkl")

joblib.dump(model, model_path)
joblib.dump(vectorizer, vectorizer_path)

print(f"Model saved to: {model_path}")
print(f"Vectorizer saved to: {vectorizer_path}")

import os
import joblib
from text_cleaner import clean_text

current_dir = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.join(current_dir, "fake_job_model.pkl")
vectorizer_path = os.path.join(current_dir, "tfidf_vectorizer.pkl")

model = joblib.load(model_path)
vectorizer = joblib.load(vectorizer_path)

job = "Software Developer at ABC Technologies. Requirements: Python, Java, and SQL. Apply through the official company careers website."

cleaned_job = clean_text(job)
job_tfidf = vectorizer.transform([cleaned_job])

print("Sample text:", job)
print("Predicted class:", model.predict(job_tfidf)[0], "(0 = Real, 1 = Fake)")
print("Class order:", model.classes_)
print("Probabilities (Real, Fake):", model.predict_proba(job_tfidf)[0])

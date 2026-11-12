import os
import joblib
from text_cleaner import clean_text

current_dir = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.join(current_dir, "fake_job_model.pkl")
vectorizer_path = os.path.join(current_dir, "tfidf_vectorizer.pkl")

# Load the trained model and TF-IDF vectorizer
model = joblib.load(model_path)
vectorizer = joblib.load(vectorizer_path)


def predict_job_text(text: str):
    cleaned_text = clean_text(text)
    job_tfidf = vectorizer.transform([cleaned_text])
    prediction = int(model.predict(job_tfidf)[0])

    probs = None
    if hasattr(model, "predict_proba"):
        probabilities = model.predict_proba(job_tfidf)[0]
        probs = {
            "real_prob": float(probabilities[0]),
            "fake_prob": float(probabilities[1])
        }

    return prediction, probs


if __name__ == "__main__":
    job_text = input("Enter the job posting: ")
    pred, probabilities = predict_job_text(job_text)

    if pred == 1:
        print("\nPrediction: POTENTIALLY FAKE JOB")
    else:
        print("\nPrediction: REAL JOB")

    if probabilities:
        print(f"Real job score: {probabilities['real_prob'] * 100:.2f}%")
        print(f"Fake job score: {probabilities['fake_prob'] * 100:.2f}%")

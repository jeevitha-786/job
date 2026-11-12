print("Word analysis started!")
import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer

df = pd.read_csv("processed_jobs.csv")

for label, name in [(0, "REAL JOBS"), (1, "FAKE JOBS")]:
    texts = df.loc[df["is_fake"] == label, "clean_text"]

    vectorizer = CountVectorizer(
        stop_words="english",
        max_features=15
    )

    matrix = vectorizer.fit_transform(texts)
    word_counts = matrix.sum(axis=0).A1
    words = vectorizer.get_feature_names_out()

    top_words = sorted(
        zip(words, word_counts),
        key=lambda item: item[1],
        reverse=True
    )

    print(f"\nMost common words in {name}:")
    for word, count in top_words:
        print(f"{word}: {count}")


"""
Train a small digit classifier on sklearn's built-in `load_digits` dataset
and save a serialized model + metadata for the Flask app to load.

Run: python train_digits.py
"""
from pathlib import Path
import json
from time import perf_counter

from sklearn.datasets import load_digits
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
import joblib


OUT_DIR = Path(__file__).parent / "portfolio" / "models"
OUT_DIR.mkdir(parents=True, exist_ok=True)


def main():
    data = load_digits()
    X = data.data
    y = data.target

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )

    clf = RandomForestClassifier(n_estimators=200, random_state=42)
    t0 = perf_counter()
    clf.fit(X_train, y_train)
    train_time = perf_counter() - t0

    preds = clf.predict(X_test)
    acc = float(accuracy_score(y_test, preds))

    model_path = OUT_DIR / "digits_clf.pkl"
    meta_path = OUT_DIR / "digits_meta.json"
    joblib.dump(clf, model_path)

    meta = {
        "dataset": "sklearn.datasets.load_digits (8x8)",
        "model": "RandomForestClassifier(n_estimators=200)",
        "accuracy": acc,
        "train_time_seconds": train_time,
    }

    with open(meta_path, "w", encoding="utf-8") as f:
        json.dump(meta, f, indent=2)

    print(f"Saved model -> {model_path}")
    print(f"Saved meta  -> {meta_path}")
    print(f"Test accuracy: {acc:.4f}")


if __name__ == "__main__":
    main()

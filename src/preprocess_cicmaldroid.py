import os
import joblib
import numpy as np
import pandas as pd

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder, StandardScaler

# =====================================================
# Create folders
# =====================================================

os.makedirs("models", exist_ok=True)
os.makedirs("processed", exist_ok=True)

# =====================================================
# Load Dataset
# =====================================================

print("=" * 60)
print("Loading CICMalDroid2020 Dataset...")
print("=" * 60)

DATASET = "dataset/CICMalDroid2020/CSV/feature_vectors_syscallsbinders_frequency_5_Cat.csv"

df = pd.read_csv(DATASET)

print("\nDataset Shape :", df.shape)

# =====================================================
# Check Missing Values
# =====================================================

print("\nMissing Values :", df.isnull().sum().sum())

# =====================================================
# Split Features & Labels
# =====================================================

X = df.iloc[:, :-1]
y = df.iloc[:, -1]

print("\nNumber of Features :", X.shape[1])
print("Number of Classes  :", y.nunique())

# =====================================================
# Encode Labels
# =====================================================

encoder = LabelEncoder()

y = encoder.fit_transform(y)

print("\nClasses Found:")
print(encoder.classes_)

# =====================================================
# Feature Scaling
# =====================================================

scaler = StandardScaler()

X = scaler.fit_transform(X)

# =====================================================
# Train/Test Split
# =====================================================

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.20,
    random_state=42,
    stratify=y
)

print("\nTraining Shape :", X_train.shape)
print("Testing Shape  :", X_test.shape)

# =====================================================
# Save Files
# =====================================================

np.save("processed/X_train.npy", X_train)
np.save("processed/X_test.npy", X_test)
np.save("processed/y_train.npy", y_train)
np.save("processed/y_test.npy", y_test)

joblib.dump(scaler, "models/scaler.pkl")
joblib.dump(encoder, "models/label_encoder.pkl")

print("\nEverything Saved Successfully!")
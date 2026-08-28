import pandas as pd
import numpy as np
import joblib

from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import MinMaxScaler

print("=" * 60)
print("Loading Dataset...")
print("=" * 60)

df = pd.read_csv(
    "dataset/cleaned_dataset.csv",
    low_memory=False
)
print("Original Shape:", df.shape)

# Remove spaces from column names
df.columns = df.columns.str.strip()

# -----------------------------
# Remove rows with missing label
# -----------------------------
df = df.dropna(subset=["Label"])

print("After removing missing labels:", df.shape)

# Remove spaces in labels
df["Label"] = df["Label"].astype(str).str.strip()

# -----------------------------
# Remove unwanted columns
# -----------------------------
drop_columns = [
    "Flow ID",
    "Source IP",
    "Destination IP",
    "Timestamp"
]

df.drop(columns=drop_columns, inplace=True)

# -----------------------------
# Replace Inf values
# -----------------------------
df.replace([np.inf, -np.inf], np.nan, inplace=True)

# -----------------------------
# Convert labels to 6 classes
# -----------------------------
def convert_label(label):

    label = label.upper()

    if label == "BENIGN":
        return "BENIGN"

    elif label.startswith("ADWARE"):
        return "ADWARE"

    elif label.startswith("RANSOMWARE"):
        return "RANSOMWARE"

    elif label.startswith("SMSMALWARE"):
        return "SMSMALWARE"

    elif label.startswith("SCAREWARE"):
        return "SCAREWARE"

    elif label == "MALWARE":
        return "RANSOMWARE"

    else:
        return None


df["Label"] = df["Label"].apply(convert_label)

# Remove rows whose labels could not be mapped
df = df.dropna(subset=["Label"])

print("\nNew Label Distribution\n")
print(df["Label"].value_counts())

# -----------------------------
# Features
# -----------------------------
y = df["Label"]

X = df.drop("Label", axis=1)

# Keep only numeric columns
X = X.select_dtypes(include=np.number)

print("\nNumber of Features:", X.shape[1])

# -----------------------------
# Fill Missing Values
# -----------------------------
imputer = SimpleImputer(strategy="median")

X = imputer.fit_transform(X)

# -----------------------------
# Normalize
# -----------------------------
scaler = MinMaxScaler()

X = scaler.fit_transform(X)

# -----------------------------
# Encode Labels
# -----------------------------
encoder = LabelEncoder()

y = encoder.fit_transform(y)

print("\nClasses:")
print(encoder.classes_)

# -----------------------------
# Split Dataset
# -----------------------------
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)

print("\nTraining Shape :", X_train.shape)
print("Testing Shape  :", X_test.shape)

# -----------------------------
# Save Everything
# -----------------------------
joblib.dump(scaler, "models/cic_scaler.pkl")
joblib.dump(imputer, "models/cic_imputer.pkl")
joblib.dump(encoder, "models/cic_label_encoder.pkl")
joblib.dump(encoder.classes_, "models/cic_classes.pkl")

np.save("dataset/X_train.npy", X_train)
np.save("dataset/X_test.npy", X_test)
np.save("dataset/y_train.npy", y_train)
np.save("dataset/y_test.npy", y_test)

print("\nEverything Saved Successfully!")
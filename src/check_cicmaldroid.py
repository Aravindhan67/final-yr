import os
import pandas as pd

# ---------------------------------------------------
# Dataset Folder
# ---------------------------------------------------

DATASET_FOLDER = "dataset/CICMalDroid2020/CSV"

# Find all CSV files
csv_files = [
    f for f in os.listdir(DATASET_FOLDER)
    if f.endswith(".csv")
]

print("=" * 60)
print("CSV Files Found")
print("=" * 60)

for i, file in enumerate(csv_files, start=1):
    print(f"{i}. {file}")

print("=" * 60)

# ---------------------------------------------------
# Read every CSV one by one
# ---------------------------------------------------

for file in csv_files:

    print(f"\nReading: {file}")

    file_path = os.path.join(DATASET_FOLDER, file)

    df = pd.read_csv(file_path, low_memory=False)

    print("=" * 60)
    print("Shape")
    print("=" * 60)
    print(df.shape)

    print("\nColumns")
    print("=" * 60)
    print(df.columns.tolist())

    print("\nFirst 5 Rows")
    print("=" * 60)
    print(df.head())

    print("\nMissing Values")
    print("=" * 60)
    print(df.isnull().sum().sum())

    print("\nData Types")
    print("=" * 60)
    print(df.dtypes)

    print("\nLast Column")
    print("=" * 60)
    print(df.columns[-1])

    print("\nLabel Distribution")
    print("=" * 60)
    print(df.iloc[:, -1].value_counts())

    print("\n" + "=" * 60)
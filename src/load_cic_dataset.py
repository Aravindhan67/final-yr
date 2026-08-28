import pandas as pd
from pathlib import Path

# Dataset path
DATASET_PATH = Path("dataset/CICAndMal2017")

# Store all DataFrames
all_data = []

# Find every CSV file recursively
csv_files = list(DATASET_PATH.rglob("*.csv"))

print("=" * 60)
print(f"Found {len(csv_files)} CSV files")
print("=" * 60)

# Read every CSV
for i, file in enumerate(csv_files, start=1):
    print(f"[{i}/{len(csv_files)}] Reading: {file.name}")

    try:
        df = pd.read_csv(file)

        # Remove spaces from column names
        df.columns = df.columns.str.strip()

        all_data.append(df)

    except Exception as e:
        print(f"Error reading {file.name}")
        print(e)

print("\nMerging all datasets...")

merged_df = pd.concat(all_data, ignore_index=True)

print("\nMerged Successfully!")
print("Shape:", merged_df.shape)

print("\nColumns:")
print(merged_df.columns.tolist())

# Save merged dataset
merged_df.to_csv(
    "dataset/merged_dataset.csv",
    index=False
)

print("\nSaved Successfully!")
print("dataset/merged_dataset.csv")
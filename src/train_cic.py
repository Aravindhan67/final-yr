import os
import joblib
import numpy as np

from sklearn.utils.class_weight import compute_class_weight

from tensorflow.keras.callbacks import (
    EarlyStopping,
    ModelCheckpoint,
    ReduceLROnPlateau,
    CSVLogger,
    TensorBoard
)

from model_cic import build_cnn

# =====================================================
# Create folders
# =====================================================

os.makedirs("models", exist_ok=True)
os.makedirs("logs", exist_ok=True)
os.makedirs("history", exist_ok=True)

# =====================================================
# Load Dataset
# =====================================================

print("=" * 60)
print("Loading Dataset...")
print("=" * 60)

X_train = np.load("dataset/X_train.npy")
X_test = np.load("dataset/X_test.npy")

y_train = np.load("dataset/y_train.npy")
y_test = np.load("dataset/y_test.npy")

print("Training :", X_train.shape)
print("Testing  :", X_test.shape)

# =====================================================
# Number of Classes
# =====================================================

classes = joblib.load("models/cic_classes.pkl")

num_classes = len(classes)

print("\nClasses:", classes)

# =====================================================
# Class Weights
# =====================================================

weights = compute_class_weight(
    class_weight="balanced",
    classes=np.unique(y_train),
    y=y_train
)

class_weights = dict(enumerate(weights))

print("\nClass Weights")
print(class_weights)

# =====================================================
# Build Model
# =====================================================

model = build_cnn(
    input_shape=X_train.shape[1],
    num_classes=num_classes
)

# =====================================================
# Callbacks
# =====================================================

checkpoint = ModelCheckpoint(
    "models/best_cnn_model.keras",
    monitor="val_accuracy",
    save_best_only=True,
    verbose=1
)

early_stop = EarlyStopping(
    monitor="val_loss",
    patience=5,
    restore_best_weights=True,
    verbose=1
)

reduce_lr = ReduceLROnPlateau(
    monitor="val_loss",
    factor=0.5,
    patience=2,
    min_lr=1e-6,
    verbose=1
)

csv_logger = CSVLogger(
    "history/training_log.csv"
)

tensorboard = TensorBoard(
    log_dir="logs"
)

# =====================================================
# Train
# =====================================================

history = model.fit(
    X_train,
    y_train,
    validation_split=0.2,
    epochs=30,
    batch_size=512,
    class_weight=class_weights,
    callbacks=[
        checkpoint,
        early_stop,
        reduce_lr,
        csv_logger,
        tensorboard
    ],
    verbose=1
)

# =====================================================
# Save Final Model
# =====================================================

model.save("models/final_cnn_model.keras")

print("\nTraining Completed Successfully!")
print("Best Model : models/best_cnn_model.keras")
print("Final Model: models/final_cnn_model.keras")
print("Training Log: history/training_log.csv")
import pickle
import json
from tensorflow.keras.models import load_model

kbann_model = None
dl_model = None


def load_models():
    global kbann_model, dl_model

    # KBANN
    with open("models/kbann_model.pkl", "rb") as f:
        kbann_model = pickle.load(f)

    # DL
    dl_model = load_model("models/dl_model.h5")
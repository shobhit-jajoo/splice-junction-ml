from model.loader import kbann_model
from services.preprocess import encode_sequence
from services.kbann_features import extract_kbann_features
import numpy as np

label_map_reverse = {
    0: "EI",
    1: "IE",
    2: "N"
}

def predict_kbann(sequence):
    encoded = encode_sequence(sequence)

    features = extract_kbann_features(sequence)
    feature_values = list(features.values())

    final_input = encoded + feature_values

    pred = kbann_model.predict([final_input])[0]
    prob = kbann_model.predict_proba([final_input])[0].max()

    return label_map_reverse[pred], float(prob)
import numpy as np
from model.loader import dl_model
from services.preprocess import encode_sequence

label_map_reverse = {
    0: "EI",
    1: "IE",
    2: "N"
}


def predict_dl(sequence):
    encoded = encode_sequence(sequence)

    # reshape for CNN
    encoded = np.array(encoded).reshape(-1, 4)
    encoded = encoded.reshape(1, encoded.shape[0], 4)

    pred_probs = dl_model.predict(encoded)
    pred = np.argmax(pred_probs, axis=1)[0]
    confidence = float(np.max(pred_probs))

    return label_map_reverse[pred], confidence
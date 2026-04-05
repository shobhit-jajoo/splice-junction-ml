from flask import Blueprint, request, jsonify
from model.kbann import predict_kbann
from model.deep_model import predict_dl
predict_bp = Blueprint("predict", __name__)

@predict_bp.route("/predict/kbann", methods=["POST"])
def predict():
    data = request.json
    seq = data.get("sequence")

    label, confidence = predict_kbann(seq)

    return jsonify({
        "sequence": seq,
        "prediction": label,
        "confidence": confidence
    })
    


@predict_bp.route("/predict/dl", methods=["POST"])
def predict_dl_route():
    data = request.json
    seq = data.get("sequence")

    label, confidence = predict_dl(seq)

    return jsonify({
        "model": "Deep Learning",
        "sequence": seq,
        "prediction": label,
        "confidence": confidence
    })
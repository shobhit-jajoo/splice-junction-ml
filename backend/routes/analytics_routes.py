from flask import Blueprint, jsonify
from services.data_service import get_class_distribution

analytics_bp = Blueprint("analytics", __name__)

@analytics_bp.route("/analytics/classes", methods=["GET"])
def class_distribution():
    data = get_class_distribution()
    return jsonify(data)

@analytics_bp.route("/analytics/lengths", methods=["GET"])
def sequence_lengths():
    from services.data_service import get_sequence_lengths
    return jsonify(get_sequence_lengths())


@analytics_bp.route("/analytics/nucleotides", methods=["GET"])
def nucleotide_freq():
    from services.data_service import get_nucleotide_frequency
    return jsonify(get_nucleotide_frequency())
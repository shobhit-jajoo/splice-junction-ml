import pandas as pd
from config import DATA_PATH
from services.preprocess import encode_sequence
def load_data():
    df = pd.read_csv("splice.data", header=None)

    df.columns = ["label", "id", "sequence"]

    # CLEAN sequence
    df["sequence"] = df["sequence"].str.replace(" ", "")
    df["sequence"] = df["sequence"].str.strip()

    return df

def get_sample_data(n=20):
    df = load_data()
    return df.head(n)

def get_class_distribution():
    df = load_data()
    return df["label"].value_counts().to_dict()



def get_preprocessed_sample(n=10):
    df = load_data().head(n)

    processed = []

    for _, row in df.iterrows():
        encoded = encode_sequence(row["sequence"])

        processed.append({
            "label": row["label"],
            "sequence": row["sequence"],
            "encoded": encoded[:20]  # show only first 20 values (important!)
        })

    return processed

def get_sequence_lengths():
    df = load_data()
    lengths = df["sequence"].apply(len)
    return lengths.tolist()

def get_nucleotide_frequency():
    df = load_data()

    counts = {"A":0, "T":0, "G":0, "C":0}

    for seq in df["sequence"]:
        for char in seq:
            if char in counts:
                counts[char] += 1

    return counts
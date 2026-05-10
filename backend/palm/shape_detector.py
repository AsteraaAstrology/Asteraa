def detect_hand_shape(palm_ratio, finger_ratio):

    if palm_ratio > finger_ratio:
        return {
            "type": "Fire Hand",
            "prediction": "Energetic and bold"
        }

    elif finger_ratio > palm_ratio:
        return {
            "type": "Water Hand",
            "prediction": "Creative and emotional"
        }

    return {
        "type": "Earth Hand",
        "prediction": "Practical and stable"
    }
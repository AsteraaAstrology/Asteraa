def analyze_fingers(length):

    if length > 100:
        return {
            "type": "Long Fingers",
            "prediction": "Detail oriented"
        }

    return {
        "type": "Short Fingers",
        "prediction": "Quick decision maker"
    }
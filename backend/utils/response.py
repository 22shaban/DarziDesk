def api_response(message: str, data=None, status_code: int = 200):
    return {
        "message": message,
        "data": data,
    }, status_code

from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    text = data['text']
    sentiment = "positive" if "good" in text.lower() else "negative"
    return jsonify({'sentiment': sentiment})

if __name__ == '__main__':
    app.run(port=5001)
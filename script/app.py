from flask import Flask, request, jsonify
from flask_cors import CORS  
import requests
import base64

app = Flask(__name__)
CORS(app)  


VIRUSTOTAL_API_KEY = 'ab894ff132dcdd904200f69439fd3834311e512943dfdd1c19968ada02f59836' 
VIRUSTOTAL_URL_UPLOAD = 'https://www.virustotal.com/api/v3/files'
VIRUSTOTAL_URL_URL = 'https://www.virustotal.com/api/v3/urls'

def scan_file_with_virustotal(file):
    headers = {
        'x-apikey': VIRUSTOTAL_API_KEY
    }
    files = {
        'file': file
    }
    response = requests.post(VIRUSTOTAL_URL_UPLOAD, headers=headers, files=files)
    return response.json()

def scan_url_with_virustotal(url):
    headers = {
        'x-apikey': VIRUSTOTAL_API_KEY
    }
    url_b64 = base64.urlsafe_b64encode(url.encode()).decode().strip("=")
    response = requests.get(f'{VIRUSTOTAL_URL_URL}/{url_b64}', headers=headers)
    return response.json()

@app.route('/scan', methods=['POST'])
def scan():
    if 'file' in request.files:
        file = request.files['file']
        if file:
            result = scan_file_with_virustotal(file)
            return jsonify(result), 200
    elif 'url' in request.form:
        url = request.form.get('url')
        if url:
            result = scan_url_with_virustotal(url)
            return jsonify(result), 200
    return jsonify({'error': 'Arquivo ou URL não fornecido'}), 400

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)

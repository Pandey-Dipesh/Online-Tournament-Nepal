from flask import Flask, request, jsonify
import firebase_admin
from firebase_admin import credentials, firestore, storage
import os

app = Flask(__name__)

# Firebase Initialization
cred = credentials.Certificate("firebase_credentials.json")  # Path to your JSON file
firebase_admin.initialize_app(cred, {
    'storageBucket': 'your-project-id.appspot.com'  # Replace with your Firebase Storage bucket
})

db = firestore.client()
bucket = storage.bucket()

# Route to handle registrations
@app.route('/register', methods=['POST'])
def register():
    try:
        # Get form data
        team_name = request.form['team_name']
        email = request.form['email']
        phone = request.form['phone']
        age = request.form['age']
        registration_type = request.form['registration_type']
        ig_name = request.form['ig_name']
        payment_method = request.form['payment']

        # Handle file upload
        file = request.files['payment_screenshot']
        if file:
            file_path = f"payment_screenshots/{file.filename}"
            blob = bucket.blob(file_path)
            blob.upload_from_file(file)
            payment_url = blob.public_url
        else:
            payment_url = ""

        # Store in Firestore
        doc_ref = db.collection('Registrations').add({
            'team_name': team_name,
            'email': email,
            'phone': phone,
            'age': age,
            'registration_type': registration_type,
            'ig_name': ig_name,
            'payment_method': payment_method,
            'payment_screenshot': payment_url
        })

        return jsonify({"status": "success", "message": "Registration successful!"})

    except Exception as e:
        return jsonify({"status": "error", "message": str(e)})

if __name__ == '__main__':
    app.run(debug=True)

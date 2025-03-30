from flask import Flask, request, render_template
import pickle
import pytesseract
from PIL import Image
import numpy as np
from werkzeug.datastructures import ImmutableMultiDict

# Initialize Flask app
app = Flask(__name__)

# Set the tesseract path (only if not added to PATH already)
pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'  # Adjust path as needed

# Load pre-trained model and TF-IDF vectorizer
with open("model.pkl", "rb") as model_file:
    model = pickle.load(model_file)

with open("tfidf.pkl", "rb") as tfidf_file:
    tfidf_vectorizer = pickle.load(tfidf_file)

# Function to extract text from an image using Tesseract OCR
def extract_text_from_image(image):
    try:
        print("Extracting text from image...")
        extracted_text = pytesseract.image_to_string(image)
        print(f"Extracted text: {extracted_text}")
        return extracted_text
    except Exception as e:
        return f"Error extracting text from image: {str(e)}"

# Function to predict if text input is spam
def is_spam(input_data):
    try:
        extracted_text = ""
        
        # Check if input is an image
        if isinstance(input_data, Image.Image):
            # Extract text from the image using Tesseract
            extracted_text = extract_text_from_image(input_data)
            if not extracted_text.strip():  # Check if extracted text is empty or just whitespace
                print("No text found in the image.")
                return "No text found in the image.", "No text extracted"
            input_data = extracted_text  # Use the extracted text for prediction

        # If the input is a string (text), process it normally
        if isinstance(input_data, str):
            print(f"Text for prediction: {input_data}")
            # Transform the text input using the TF-IDF vectorizer
            text_vectorized = tfidf_vectorizer.transform([input_data])
            # Predict using the pre-trained model
            prediction = model.predict(text_vectorized)[0]
            print(f"Prediction: {'Spam' if prediction == 1 else 'Not Spam'}")
            return "Spam" if prediction == 1 else "Not Spam", extracted_text
        
        else:
            print("Invalid input. Please provide either text or an image.")
            return "Invalid input. Please provide either text or an image.", ""

    except Exception as e:
        print(f"Error in prediction: {str(e)}")
        return f"Error: {str(e)}", ""

# Route to display the homepage with input form
@app.route('/')
def home():
    return render_template('index.html')

# Route to handle the form submission for prediction
@app.route('/predict', methods=['POST'])
def predict():
    print('\n\n->', request.form.get('text'))

    # if 'text' in request.form:
    if request.form.get('text'):
        # Text input from user
        text_input = request.form['text']
        print(f"Text input: {text_input}")
        prediction, extracted_text = is_spam(text_input)
        print(f"Prediction: {prediction}, Extracted Text: {extracted_text}")
        return render_template('result.html', prediction=prediction, extracted_text=text_input)

    elif 'image' in request.files:
        # Image input from user
        file = request.files['image']
        
        try:
            # Attempt to open the image
            image = Image.open(file.stream)
            image.verify()  # Verify that it's a valid image
            image = Image.open(file.stream)  # Re-open after verification

            print("Image successfully opened.")
            prediction, extracted_text = is_spam(image)
            print(f"Prediction: {prediction}, Extracted Text: {extracted_text}")
            return render_template('result.html', prediction=prediction, extracted_text=extracted_text)

        except Exception as e:
            print(f"Error opening the image: {str(e)}")
            return f"Error opening the image: {str(e)}"
    
    print("No valid input provided.")
    return "No valid input provided."

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)

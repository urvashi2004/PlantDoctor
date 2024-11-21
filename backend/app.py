from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import tensorflow as tf
import numpy as np
import os
import tempfile
from PIL import Image

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins. You can restrict it to a specific URL like 'http://localhost:3000'
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)

# Load model
current_dir = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.join(current_dir, 'PlantDiseaseModel.h5')
model = tf.keras.models.load_model(model_path)

# Class labels for predictions
CLASS_LABELS = [
    "Tomato_Bacterial_spot", "Tomato_Early_blight", "Tomato_Late_blight",
    "Tomato_Leaf_Mold", "Tomato_Septoria_leaf_spot",
    "Tomato_Spider_mites_Two_spotted_spider_mite", "Tomato_Target_Spot",
    "Tomato__Tomato_YellowLeaf__Curl_Virus", "Tomato__Tomato_mosaic_virus",
    "Tomato_healthy", "Potato___Early_blight", "Potato___Late_blight",
    "Potato___healthy", "Pepper__bell___Bacterial_spot", "Pepper__bell___healthy"
]

HEALTHY_CLASSES = [
    "Tomato_healthy", "Potato___healthy", "Pepper__bell___healthy"
]

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    try:
        # Create a temporary file
        with tempfile.NamedTemporaryFile(delete=False) as temp_file:
            temp_file.write(file.file.read())
            temp_file.close()  # Ensure the file is closed before processing

            # Open the image using PIL
            img = Image.open(temp_file.name)
            img = img.resize((150, 150))  # Resize image to match model's expected input size
            img_array = np.array(img)  # Convert image to numpy array
            img_array = np.expand_dims(img_array, axis=0)  # Add batch dimension
            img_array = img_array / 255.0  # Normalize the image

            # Make predictions
            prediction = model.predict(img_array)
            class_index = np.argmax(prediction)

            # Check if the class is healthy (i.e., belongs to the healthy categories)
            predicted_class = CLASS_LABELS[class_index]
            if predicted_class in HEALTHY_CLASSES:
                predicted_class = "healthy"  # Set to 'healthy' if it's one of the healthy classes

            os.remove(temp_file.name)  # Clean up the temporary file after prediction

            return {"prediction": predicted_class}

    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})
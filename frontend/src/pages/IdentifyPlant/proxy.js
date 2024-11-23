const express = require('express');
const axios = require('axios');
const cors = require('cors');
const multer = require('multer');
const FormData = require('form-data');
const app = express();

app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // To parse JSON request bodies

require('dotenv').config();  // Add this line if you haven't already
const apiKey = process.env.REACT_APP_API_KEY;
console.log('API Key from env:', apiKey);

// Set up multer for handling file uploads
const upload = multer(); // In-memory file storage (you can also specify disk storage)

app.post('/api/plantnet', upload.single('image'), async (req, res) => {
  try {
    // Ensure the file is provided
    if (!req.file) {
      return res.status(400).json({ message: 'No image file provided' });
    }

    const category = req.body.category || 'kt'; // Default to 'kt' if no category is provided
    console.log('Received category:', category);  // Log the category

    // Prepare form data to send to PlantNet API
    const formData = new FormData();
    formData.append('images', req.file.buffer, req.file.originalname);
    formData.append('api-key', apiKey);
    formData.append('include-related-images', 'true');
    formData.append('no-reject', 'false');
    formData.append('nb-results', '5');
    formData.append('lang', 'en');
    formData.append('type', category);

    console.log('Sending data to PlantNet API:', formData);

    // Send request to PlantNet API
    const response = await axios.post('https://my-api.plantnet.org/v2/identify/all', formData, {
      headers: {
        ...formData.getHeaders(), // Attach multipart form data headers
      },
    });

    console.log('PlantNet API Response:', response.data); 

    // Send response back to the client
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error during API request' });
  }
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});
require('dotenv').config({ path: '../../../.env' });
const apiKey = process.env.API_KEY;

if (!apiKey) {
  return res.status(500).json({ message: 'API key missing or not loaded properly' });
}

const express = require('express');
const axios = require('axios');
const cors = require('cors');
const multer = require('multer');
const FormData = require('form-data');
const app = express();

app.use(cors()); 
app.use(express.json({ limit: '50mb' })); 
app.use(express.urlencoded({ extended: true }));

const upload = multer(); 

app.post('/api/plantnet', upload.single('image'), async (req, res) => {
  try {
    console.log('Received request:', req.body, req.file); 
    if (!req.file) {
      return res.status(400).json({ message: 'No image file provided' });
    }

    const category = req.body.category || 'kt'; 
    console.log('Received category:', category); 

    const formData = new FormData();
    formData.append('images', req.file.buffer, req.file.originalname);
    console.log('Sending data to PlantNet API:', formData);

    const apiUrl = 'https://my-api.plantnet.org/v2/identify/all';

    const response = await axios.post(apiUrl, formData, {
      headers: {
        ...formData.getHeaders(),
        'Authorization': `Bearer ${apiKey}`, 
      },
      timeout: 10000 
    });   

    console.log('PlantNet API Response:', response.data); 

    res.json(response.data);
  } catch (error) {
    if (error.code === 'ECONNRESET') {
    console.error('Connection reset error:', error);
    res.status(500).send({ message: 'Connection reset by server. Please try again later.' });
  } else if (error.response) {
    
    console.error('Error response from PlantNet:', error.response.data);
    res.status(500).send({ message: 'PlantNet API Error', details: error.response.data });
  } else {
    console.error('Error during request:', error);
    res.status(500).send({ message: 'Internal server error', details: error.message });
  }}
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});
import React, { useState } from 'react';
import './IdentifyPlant.css';
import { uploadImageToAPI } from './api'; // Adjust the path as needed

const IdentifyPlant = () => {
  const [image, setImage] = useState(null);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showButtons, setShowButtons] = useState(true);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setShowButtons(false); // Hide buttons after image is selected
      setError(null);
    }
  };

  const handleImageCapture = () => {
    document.getElementById('file-input').click();
  };

  const handleRetake = () => {
    setImage(null);
    setResults(null);
    setError(null);
    setShowButtons(true); // Show buttons again for retaking/reuploading
  };

  const handleScan = async () => {

        setLoading(true);
        setError(null);

        try {
            const file = document.getElementById('file-input').files[0];

            if (file) {
                const response = await uploadImageToAPI(file);

                if (response && response.results) {
                    setResults(response.results);
                } else {
                    setError('No results found. Please try again with a different image.');
                }
            } else {
                setError('No image selected. Please upload or capture an image.');
            }
        } catch (err) {
            console.error('Error during API call:', err);

            if (err.message.includes('400')) {
              setError('API error: Bad Request. Reupload another image to identify.');
            } else if (err.message.includes('401')) {
              setError('API error: Unauthorized access. Please check your API key.');
            } else if (err.message.includes('404')) {
              setError('API error: Species not found in database.');
            } else if (err.message.includes('413')) {
              setError('API error: Payload too large.');
            } else if (err.message.includes('414')) {
              setError('API error: URI too long.');
            } else if (err.message.includes('415')) {
              setError('API error: Unsupported media type. Please upload another image.');
            } else if (err.message.includes('429')) {
              setError('API error: Too many requests. Please try again later.');
            } else if (err.message.includes('500')) {
              setError('API error: Internal server er. Please try again later.');
            } else {
              setError('An unexpected error occurred. Please try again later.');
            }

        } finally {
            setLoading(false);
        }
    };


  return (
    <div className="identify-plant-container">
      <h1 className="heading">Identify Plant</h1>
      {showButtons && (
        <div className="buttons-container">
          <button className="upload-button" onClick={handleImageCapture}>
            <i className="fas fa-camera"></i> Use Camera
          </button>
          <button
            className="upload-button"
            onClick={() => document.getElementById('file-input').click()}
          >
            <i className="fas fa-upload"></i> Upload from Device
          </button>
        </div>
      )}
      <input
        id="file-input"
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        style={{ display: 'none' }}
      />
      {image && (
        <div className="image-preview-container">
          <div className="image-preview">
            <p className="image-label">Uploaded Image</p>
            <img src={image} alt="Plant" className="uploaded-image" />
          </div>
          <button className="scan-button" onClick={handleScan} disabled={loading}>
            {loading ? <span className="loading">Loading...</span> : 'Scan Image'}
          </button>
          <button className="retake-button" onClick={handleRetake}>
            Retake/Reupload
          </button>
        </div>
      )}

      {error && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}
      {results && (
        <div className="results-section">
          <h2>Results:</h2>
          <pre>{JSON.stringify(results, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default IdentifyPlant;
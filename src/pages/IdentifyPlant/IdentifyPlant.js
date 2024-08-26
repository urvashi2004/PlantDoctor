import React, { useState } from 'react';
import './IdentifyPlant.css';
import { uploadImageToAPI } from '../../api/api'; // Adjust the path as needed

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
    }
  };

  const handleImageCapture = () => {
    document.getElementById('file-input').click();
  };

  const handleRetake = () => {
    setImage(null);
    setResults(null);
    setShowButtons(true); // Show buttons again for retaking/reuploading
  };

  const handleScan = async () => {
    setLoading(true);
    setError(null); // Reset error
    try {
      const file = document.getElementById('file-input').files[0];
      if (file) {
        const response = await uploadImageToAPI(file);
        setResults(response);
      } else {
        setError('No image selected.');
      }
    } catch (err) {
      setError('Failed to fetch results. Please try again.');
    }
    setLoading(false);
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
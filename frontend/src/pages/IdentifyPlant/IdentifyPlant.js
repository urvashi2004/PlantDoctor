import React, { useState } from 'react';
import './IdentifyPlant.css';
import { uploadImageToAPI } from './api';

const IdentifyPlant = () => {
  const [image, setImage] = useState(null);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showButtons, setShowButtons] = useState(true);
  const [category, setCategory] = useState('kt'); 

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setShowButtons(false);
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
    setShowButtons(true);
  };

  const handleScan = async () => {
    setLoading(true);
    setError(null);

    try {
      const file = document.getElementById("file-input").files[0];

      if (!file) {
        setError("No image selected. Please upload or capture an image.");
        return;
      }

      console.log("Uploading file:", file); 

      const response = await uploadImageToAPI(file, category);

      if (response && response.results) {
        setResults(response.results);
      } else {
        setError("No results found. Please try again with a different image.");
      }
    } catch (err) {
      console.error("Error during API call:", err);

      if (err.message.includes("404")) {
        setError("API error: Endpoint not found. Please check the API URL.");
      } else if (err.message.includes("401")) {
        setError("API error: Unauthorized. Check your API key.");
      } else {
        setError(`An unexpected error occurred: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const renderResults = (results) => {
    return results.map((result, index) => (
      <div key={index} className="result-item">
        <h3>Result {index + 1}</h3>
        <div>
          <strong>Scientific Name: </strong>
          {result.species.scientificName}
        </div>
        <div>
          <strong>Common Names: </strong>
          {result.species.commonNames.join(', ')}
        </div>
        <div>
          <strong>Genus: </strong>
          {result.species.genus.scientificName}
        </div>
        <div>
          <strong>Family: </strong>
          {result.species.family.scientificName}
        </div>
        <div>
          <strong>Score: </strong>
          {result.score}
        </div>
      </div>
    ));
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

      <div className="category-selector">
        <label htmlFor="category">Select Plant Category: </label>
        <select id="category" onChange={(e) => setCategory(e.target.value)}>
          <option value="kt">KT (Generic)</option>
          <option value="flower">Flower</option>
          <option value="tree">Tree</option>
          {/* Add other categories here */}
        </select>
      </div>

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
          <div className="buttons-container">
            <button className="scan-button" onClick={handleScan} disabled={loading}>
              {loading ? <span className="loading">Loading...</span> : 'Scan Image'}
            </button>
            <button className="retake-button" onClick={handleRetake}>
              Retake/Reupload
            </button>
          </div>
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
          <div className="results-list">
            {renderResults(results)}
          </div>
        </div>
      )}
    </div>
  );
};

export default IdentifyPlant;
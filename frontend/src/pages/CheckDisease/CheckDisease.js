import React, { useState } from "react";
import "./CheckDisease.css";

const CheckDisease = () => {
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
    setResult(null); // Clear previous result when a new image is selected
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageFile) {
      alert("Please upload an image first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", imageFile);

    try {
      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        const prediction = data.prediction;

        let plantName = "";
        let healthStatus = "";
        let diseaseName = "";

        if (prediction.includes("healthy")) {
          healthStatus = "Healthy";
          plantName = prediction.split("_")[0]; 
          diseaseName = ""; 
        } else {
          healthStatus = "Unhealthy";
          plantName = prediction.split("_")[0]; 
          diseaseName = prediction
            .replace(/.*__/, "")
            .replace(/_/g, " "); 
        }

        setResult({
          plantName,
          healthStatus,
          diseaseName,
        });
      } else {
        setResult({ error: data.error });
      }
    } catch (error) {
      setResult({ error: "An error occurred. Please try again." });
      console.error("Error:", error);
    }
  };

  return (
    <div className="check-disease">
      <h1 className="check-disease-title">Check Disease</h1>
      <p className="check-disease-description">Upload an image to check for plant diseases.</p>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="check-disease-file-input"
        />
        {preview && (
          <div className="check-disease-image-preview">
            <p className="check-disease-description">Uploaded Image:</p>
            <img
              src={preview}
              alt="Uploaded"
              className="check-disease-preview-image"
            />
          </div>
        )}
        <br />
        <button type="submit" className="check-disease-submit-button">
          Upload and Check
        </button>
      </form>
      {result && (
        <div className="check-disease-result">
          <h3>Result:</h3>
          {result.error ? (
            <p>{result.error}</p>
          ) : (
            <>
              <p><strong>Plant Identified:</strong> {result.plantName}</p>
              <p><strong>Health Status:</strong> {result.healthStatus}</p>
              {result.diseaseName && (
                <p><strong>Disease:</strong> {result.diseaseName}</p>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default CheckDisease;
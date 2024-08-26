import React, { useState } from 'react';
import { identifyPlant } from '../api/plantnet';
import ResultsDisplay from './ResultsDisplay';

const ImageUploader = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [results, setResults] = useState(null);
    const [error, setError] = useState(null);

    const handleImageChange = (event) => {
        setSelectedImage(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (selectedImage) {
            try {
                const data = await identifyPlant(selectedImage);
                console.log('API Response:', data); // Log the entire response
                if (data && data.results) {
                    setResults(data.results);
                    setError(null); // Clear any previous error
                } else {
                    setResults(null);
                    setError('No results found.');
                }
            } catch (err) {
                console.error('Error identifying the plant:', err);
                setResults(null);
                setError('An error occurred while identifying the plant.');
            }
        } else {
            setError('Please select an image.');
        }
    };    

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleImageChange} accept="image/*" />
                <button type="submit">Identify Plant</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {results && <ResultsDisplay results={results} />}
        </div>
    );
};

export default ImageUploader;
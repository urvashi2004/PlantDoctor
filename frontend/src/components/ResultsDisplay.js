import React from 'react';

const ResultsDisplay = ({ results }) => {
    if (!results || results.length === 0) {
        return <p>No results available.</p>;
    }

    return (
        <div>
            {results.map((result, index) => (
                <div key={index}>
                    <h3>Species: {result.species.scientificName}</h3>
                    <p>Common Names: {result.species.commonNames.join(', ') || 'None'}</p>
                    <p>Matching Score: {(result.score * 100).toFixed(2)}%</p>
                    <h4>Images:</h4>
                    {result.images.slice(0, 3).map((image, idx) => (
                        <div key={idx}>
                            <p>Image {idx + 1}:</p>
                            <img src={image.url.o} alt={`Plant Uploaded ${idx + 1}`} style={{ width: '100px', height: '100px' }} />
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default ResultsDisplay;
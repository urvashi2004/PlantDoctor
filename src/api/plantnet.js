import axios from 'axios';

export const identifyPlant = async (imageFile) => {
    const apiKey = '2b10iBcUnPBl9JYeo7G1AKz9Su'; // Replace with your actual API key
    const url = `https://my-api.plantnet.org/v2/identify/all?include-related-images=true&no-reject=false&nb-results=5&lang=en&type=kt&api-key=${apiKey}`;

    const formData = new FormData();
    formData.append('images', imageFile);

    try {
        const response = await axios.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data; // Return the data from the response
    } catch (error) {
        console.error('Error during API request:', error);
        throw error; // Throw error to be caught in handleSubmit
    }
};
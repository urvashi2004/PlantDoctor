const apiKey = 'REACT_APP_API_KEY';

export const uploadImageToAPI = async (imageFile, setUploadProgress) => {
  const formData = new FormData();
  formData.append('images', imageFile);

  try {
      const response = await fetch(`/api/v2/identify/all?include-related-images=true&no-reject=false&nb-results=5&lang=en&type=kt&api-key=${apiKey}`, {
          method: 'POST',
          body: formData,
      });

      if (!response.ok) {
        const errorDetails = await response.text();
        console.error('Error details:', errorDetails);
        throw new Error(`Network response was not ok: ${response.status} ${response.statusText}. Details: ${JSON.stringify(errorDetails)}`);
      }

      const contentType = response.headers.get('content-type');
      let data;
      if (contentType && contentType.includes('application/json')) {
        data = await response.json(); // Parse JSON if content type is JSON
      } else {
        const text = await response.text(); // Otherwise, read as text
        console.error('Unexpected content type:', contentType, 'Response:', text);
        throw new Error(`Unexpected content type: ${contentType}. Response: ${text}`);
      }
      return data;
  } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
  }
};
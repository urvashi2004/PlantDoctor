
export const uploadImageToAPI = async (imageFile, setUploadProgress) => {
  const apiKey = '2b10iBcUnPBl9JYeo7G1AKz9Su'; // Your API key
  const url = `https://my-api.plantnet.org/v2/identify/all?include-related-images=true&no-reject=false&nb-results=5&lang=en&type=kt&api-key=${apiKey}`;

  const formData = new FormData();
  formData.append('images', imageFile);

  try {
      const response = await fetch(url, {
          method: 'POST',
          body: formData,
          onUploadProgress: (progressEvent) => {
              // Calculate the upload progress as a percentage
              const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
              setUploadProgress(progress); // Update the upload progress
          }
      });

      if (!response.ok) {
          throw new Error('Network response was not ok');
      }

      const data = await response.json();
      return data;
  } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
  }
};
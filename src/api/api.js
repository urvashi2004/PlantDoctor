// api.js

export const uploadImageToAPI = async (file) => {
  const apiKey = '2b10iBcUnPBl9JYeo7G1AKz9Su'; // Your API key
  const url = `https://my-api.plantnet.org/v2/identify/all?include-related-images=true&no-reject=false&nb-results=5&lang=en&type=kt&api-key=${apiKey}`;

  const formData = new FormData();
  formData.append('images', file);

  const response = await fetch(url, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to fetch');
  }

  return await response.json();
};

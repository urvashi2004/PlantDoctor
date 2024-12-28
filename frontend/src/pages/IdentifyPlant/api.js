export const uploadImageToAPI = async (imageFile, category, setUploadProgress) => {

  const formData = new FormData();
  formData.append('image', imageFile); 
  formData.append('category', category); 

  const API_URL = 'http://localhost:4000/api/plantnet';

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', API_URL);

    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

    xhr.upload.onprogress = (event) => {
      if (setUploadProgress) {
        setUploadProgress(Math.round((event.loaded / event.total) * 100));
      }
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        const contentType = xhr.getResponseHeader('content-type');
        if (contentType.includes('application/json')) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          reject(new Error(`Unexpected content type: ${contentType}`));
        }
      } else {
        console.error('Response Details:', xhr.responseText);
        reject(new Error(`Upload failed with status: ${xhr.status} (${xhr.statusText}). Response: ${xhr.responseText}`));
      }
    };

    xhr.onerror = () => {
      console.error('XHR Error Details:', {
        status: xhr.status,
        statusText: xhr.statusText,
        response: xhr.responseText,  
      });
      reject(new Error(`A network error occurred. Check your connection or the API URL.`));
    };
    

    xhr.send(formData);
  });
};
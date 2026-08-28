import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000';

/**
 * Upload an APK file to the Flask backend for malware analysis.
 * @param {File} file - The APK file to upload
 * @param {Function} onProgress - Progress callback (0-100)
 * @returns {Promise<Object>} - Prediction result JSON
 */
export const uploadApk = async (file, onProgress) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await axios.post(`${API_BASE_URL}/upload-apk`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress: (progressEvent) => {
      if (progressEvent.total) {
        const pct = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        onProgress?.(pct);
      }
    },
  });

  return response.data;
};

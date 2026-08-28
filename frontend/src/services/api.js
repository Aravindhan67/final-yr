// Central API configuration
// Change VITE_API_URL in your .env file to switch environments

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000';

export default API_BASE_URL;

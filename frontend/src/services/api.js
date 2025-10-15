import axios from 'axios';

// 1. Create an Axios instance with a base URL
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

// 2. Use an interceptor to automatically add the token to requests
apiClient.interceptors.request.use(
  (config) => {
    // Get the token from localStorage
    const token = localStorage.getItem('authToken');
    if (token) {
      // If the token exists, add it to the Authorization header
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  }
);

// 3. Define functions for each API endpoint

/**
 * Registers a new user.
 * @param {object} userData - { username, password }
 * @returns {Promise<object>} The response data from the server.
 */
export const register = async (userData) => {
  const response = await apiClient.post('/auth/register', userData);
  return response.data;
};

/**
 * Logs in a user and returns an access token.
 * @param {object} credentials - { username, password }
 * @returns {Promise<object>} The response data, including the accessToken.
 */
export const login = async (credentials) => {
  const response = await apiClient.post('/auth/login', credentials);
  return response.data;
};

/**
 * Sends symptoms to the backend for analysis.
 * @param {object} symptomData - { symptoms: "user's symptom text" }
 * @returns {Promise<object>} The analysis result from the AI.
 */
export const analyzeSymptoms = async (symptomData) => {
  const response = await apiClient.post('/analyze', symptomData);
  return response.data;
};

/**
 * Fetches the user's saved analysis history.
 * @returns {Promise<Array>} An array of the user's past analyses.
 */
export const getHistory = async () => {
  const response = await apiClient.get('/history');
  return response.data;
};

/**
 * Saves an analysis result to the user's history.
 * @param {object} analysisData - { symptoms, result: { ... } }
 * @returns {Promise<object>} The newly saved history entry.
 */
export const saveHistory = async (analysisData) => {
  const response = await apiClient.post('/history', analysisData);
  return response.data;
};
/**
 * Fetches a single analysis entry by its ID.
 * @param {string} id The ID of the analysis.
 * @returns {Promise<object>} The specific analysis entry.
 */
export const getHistoryById = async (id) => {
  const response = await apiClient.get(`/history/${id}`);
  return response.data;
};
import axios from 'axios';
const API_BASE_URL = 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const analyzeRequirements = async (description) => {
  try {
    const response = await api.post('/requirements/analyzeRequirement', {
      description: description
    });
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export default api;
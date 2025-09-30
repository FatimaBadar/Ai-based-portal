import axios from 'axios';
const API_BASE_URL = import.meta.env.VITE_SERVER_API_BASE_URL;

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
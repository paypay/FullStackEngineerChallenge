import axios from 'axios';

const api = axios.create({
  baseURL: 'service/',
});

const errorHandler = (error) => {
  throw error;
};

export default {
  post: async (url, data, config) => {
    let result = null;
    try {
      result = await api.post(url, data, config);
    } catch (error) {
      errorHandler(error);
    }
    return result;
  },
  get: async (url, config) => {
    let result = null;
    try {
      result = await api.get(url, config);
    } catch (error) {
      errorHandler(error);
    }
    return result;
  },
};

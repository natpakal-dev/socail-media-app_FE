import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:5002/api'
      : 'https://socail-media-app-be-3.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});


export default axiosInstance
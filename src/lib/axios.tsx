import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:5002/api'
      : 'https://social-media-app-be-ten.vercel.app/api',
  headers: {
    'Content-Type': 'application/json',
  },
});


export default axiosInstance
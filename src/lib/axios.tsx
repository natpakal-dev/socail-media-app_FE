import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://social-media-app-be-ten.vercel.app/api",
    headers: {
        'Content-Type': 'application/json',
      },
});

export default axiosInstance
import axios from "axios";

// Define the base url
const baseURL = process.env.BACKEND_URL;

// Define the axios instance
const instance = axios.create({
    baseURL,
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

export default instance;
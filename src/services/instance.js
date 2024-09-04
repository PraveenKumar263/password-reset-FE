import axios from "axios";

// Define the base url
const baseURL = "http://localhost:3001/api/v1";

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
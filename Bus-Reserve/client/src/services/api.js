import axios from "axios";

const API = axios.create({
  // Use localhost when running locally
  // baseURL: "http://localhost:5000/api",

  // Use Render when deployed
  baseURL: "https://bus-reservation-api.onrender.com/api",
});

export default API;

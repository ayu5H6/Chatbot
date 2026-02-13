import axios from "axios";

export const api = axios.create({
  baseURL: "https://chatbot-zdla.onrender.com/chat",
});

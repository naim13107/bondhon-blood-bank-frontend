import axios from "axios";

export default axios.create({
  baseURL: "https://bloodbank-teal.vercel.app/api/v1",
});
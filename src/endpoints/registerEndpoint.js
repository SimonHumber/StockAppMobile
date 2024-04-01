import domain from "./domain";
import axios from "axios";
const registerEndpoint = async (form) => {
  try {
    const response = await axios.post(`http://${domain}:4000/register`, form);
    return response;
  } catch (error) {
    return error.response;
  }
};

export default registerEndpoint;

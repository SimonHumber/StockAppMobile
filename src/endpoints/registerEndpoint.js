import domain from "./domain";
import axios from "axios";
const registerEndpoint = async (form) => {
  try {
    const response = await axios.post(`${domain}/register`, form);
    return response;
  } catch (error) {
    return error.response;
  }
};

export default registerEndpoint;

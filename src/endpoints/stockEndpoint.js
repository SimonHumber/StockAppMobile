import domain from "./domain";
import axios from "axios";

const stockEndpoint = async (symbol) => {
  try {
    const response = axios.post(`${domain}/stock`, {
      symbol,
    });
    return response;
  } catch (error) {
    return error;
  }
};

export default stockEndpoint;

import domain from "./domain";
import axios from "axios";

const searchEndpoint = async (query) => {
  try {
    const response = await axios.post(`http://${domain}:4000/search`, {
      query,
    });
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export default searchEndpoint;

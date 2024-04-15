import domain from "./domain";
import axios from "axios";

const searchEndpoint = async (query) => {
  try {
    let response;
    if (query.length > 0) {
      response = axios.post(`${domain}/search`, {
        query,
      });
      return response;
    } else {
      return { data: { results: [] } };
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};

export default searchEndpoint;

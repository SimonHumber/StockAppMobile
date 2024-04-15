import domain from "./domain";
import axios from "axios";
import store from "../redux/store";

const toggleFavEndpoint = async (symbol) => {
  try {
    const jwt = store.getState().jwt;
    const header = {
      Authorization: `Bearer ${jwt}`,
    };
    const response = await axios.post(
      `${domain}/toggleFav`,
      {
        symbol,
      },
      { headers: header },
    );
    return response;
  } catch (error) {
    return error;
  }
};

export default toggleFavEndpoint;

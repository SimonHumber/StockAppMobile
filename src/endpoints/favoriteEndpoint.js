import domain from "./domain";
import axios from "axios";
import store from "../redux/store";

const favoriteEndpoint = async () => {
  try {
    const jwt = store.getState().jwt;
    const header = {
      Authorization: `Bearer ${jwt}`,
    };
    const response = await axios.post(
      `${domain}/favorite`,
      {},
      { headers: header },
    );
    return response;
  } catch (error) {
    return error;
  }
};

export default favoriteEndpoint;

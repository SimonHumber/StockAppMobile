import domain from "./domain";
import axios from "axios";
import store from "../redux/store";

const userDataEndpoint = async () => {
  try {
    const jwt = store.getState().jwt;
    const header = {
      Authorization: `Bearer ${jwt}`,
    };
    const response = await axios.post(
      `${domain}/user`,
      {},
      { headers: header },
    );
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export default userDataEndpoint;

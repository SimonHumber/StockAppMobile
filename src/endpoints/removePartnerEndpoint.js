import domain from "./domain";
import axios from "axios";
import store from "../redux/store";

const removePartnerEndpoint = async (username) => {
  try {
    const jwt = store.getState().jwt;
    const header = {
      Authorization: `Bearer ${jwt}`,
    };
    const response = await axios.post(
      `http://${domain}:4000/removePartner`,
      {
        username,
      },
      { headers: header },
    );
    return response;
  } catch (error) {
    return error;
  }
};

export default removePartnerEndpoint;

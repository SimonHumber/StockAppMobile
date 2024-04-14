import domain from "./domain";
import axios from "axios";
import store from "../redux/store";

const partnerFavEndpoint = async (partner) => {
  try {
    const jwt = store.getState().jwt;
    const header = {
      Authorization: `Bearer ${jwt}`,
    };
    const response = await axios.post(
      `http://${domain}:4000/partnerFav`,
      { partner },
      { headers: header },
    );
    return response;
  } catch (error) {
    return error;
  }
};

export default partnerFavEndpoint;

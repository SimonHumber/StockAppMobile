import domain from "./domain";
import axios from "axios";
import store from "../redux/store";

const addPartnerEndpoint = async (username) => {
  try {
    const jwt = store.getState().jwt;
    const header = {
      Authorization: `Bearer ${jwt}`,
    };
    const response = await axios.post(
      `http://${domain}:4000/addPartner`,
      {
        username,
      },
      { headers: header },
    );
    console.log("success");
    return response;
  } catch (error) {
    return error;
  }
};

export default addPartnerEndpoint;

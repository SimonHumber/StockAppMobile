import axios from "axios";
import store from "../redux/store";
import domain from "./domain";

const savedEndpoint = async () => {
  const jwt = store.getState().jwt;
  try {
    const saved = await axios.post(`${domain}/savedEndpoint`, {
      jwt,
    });
    return saved;
  } catch (err) {
    console.error(err);
  }
};

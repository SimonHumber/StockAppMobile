import domain from "./domain";
import axios from "axios";
import store from "../redux/store";
import { jwtUpdate } from "../redux/slice";

const loginEndpoint = async (form) => {
  try {
    const response = await axios.post(`http://${domain}:4000/login`, form);
    const token = response.data;
    store.dispatch(jwtUpdate(token));
  } catch (error) {
    console.log(error);
    return error;
  }
};

export default loginEndpoint;

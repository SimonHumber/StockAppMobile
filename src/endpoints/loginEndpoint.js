import domain from "./domain";
import axios from "axios";
import { useDispatch } from "react-redux";
import { jwtUpdate } from "../redux/slice";

const loginEndpoint = async (form) => {
  const dispatch = useDispatch();
  try {
    console.log("here");
    const response = await axios.post(`http://${domain}:4000/login`, form);
    const token = response.data;
    dispatch(jwtUpdate(token));
  } catch (error) {
    console.log(error);
    return error;
  }
};

export default loginEndpoint;

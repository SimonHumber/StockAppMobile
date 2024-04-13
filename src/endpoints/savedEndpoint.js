import axios from "axios";
import { useSelector } from "react-redux";
import domain from "./domain";

const savedEndpoint = async () => {
  const jwt = useSelector((state) => {
    return state.jwt;
  });
  try {
    const saved = await axios.post(`http://${domain}:4000/savedEndpoint`, {
      jwt,
    });
    return saved;
  } catch (err) {
    console.error(err);
  }
};

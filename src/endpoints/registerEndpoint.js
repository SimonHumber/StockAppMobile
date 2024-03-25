import domain from "./domain";
import axios from "axios";
const registerEndpoint = async (form) => {
  axios
    .post(`http://${domain}:4000/register`, form)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error("Error registering:", error);
    });
};

export default registerEndpoint;

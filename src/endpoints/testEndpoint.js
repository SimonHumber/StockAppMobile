import domain from "./domain";
const testEndpoint = async () =>
  fetch(`http://${domain}:4000/test`)
    .then((response) => response.text())
    .then((data) => console.log(data))
    .catch((error) => console.error(error));

export default testEndpoint;

import domain from "./domain";
const testEndpoint = async () =>
  fetch(`${domain}/test`)
    .then((response) => response.text())
    .then((data) => console.log(data))
    .catch((error) => console.error(error));

export default testEndpoint;

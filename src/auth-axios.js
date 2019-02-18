import axios from "axios";

const instance = axios.create({
  baseURL: "https://www.googleapis.com/identitytoolkit/v3/relyingparty",
  headers: { "Content-Type": "application/json" }
});

export default instance;

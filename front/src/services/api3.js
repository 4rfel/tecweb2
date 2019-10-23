import axios from "axios";

const api3 = axios.create({
  baseURL: "http://worldtimeapi.org/api/timezone/Antarctica/Casey"
});

export default api3;
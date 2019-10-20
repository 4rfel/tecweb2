import axios from "axios";

const api2 = axios.create({
  baseURL: "http://ddragon.leagueoflegends.com/cdn/9.3.1/data/en_US/champion.json"
});

export default api2;
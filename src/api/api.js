import Axios from "axios";

export default Axios.create({
  baseURL: "https://ttmg-backend.herokuapp.com/api/auth",
});

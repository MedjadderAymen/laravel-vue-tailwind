import axios from "axios";
import store from "./store";

const axiosClient = axios.create({
  baseURL:'http://localhost:8000/api'
})

export default axiosClient;

//interceptors
axiosClient.interceptors.request.use(
  config=>{
    config.headers.Authorization = `Bearer ${store.state.user.token}`
    return config;
  }
)

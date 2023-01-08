import axios from "axios";
import appConfigs from "./appConfigs";
const api = axios.create({
    baseURL: appConfigs.API_BASE_URL,
    timeout: 25000,
    // maxRedirects: 3,
    headers: {
        "Content-Type": "application/json",
    },
});
export default api;
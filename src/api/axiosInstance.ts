import axios from "axios";

export const axiosInstance = axios.create({
  baseURL:
    "https://nanny-services-c6788-default-rtdb.europe-west1.firebasedatabase.app/",
});

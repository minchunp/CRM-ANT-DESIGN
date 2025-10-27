import axios from "axios";
import { getAccessTokenFromLS, getProfileFromLS, setAccessTokenToLS, setProfileFromLS } from "../utils/localStorage";
import config from "../constants/config";
import { pathAuth } from "../constants/path";

let accessToken = getAccessTokenFromLS();
let profileUser = getProfileFromLS();

const axiosInstanceMain = axios.create({
   baseURL: config.mainUrl,
   headers: {
      "Content-Type": "application/json",
   },
});

axiosInstanceMain.interceptors.request.use(
   (config) => {
      if (accessToken && config.headers) {
         config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
   },
   (error) => {
      return Promise.reject(error);
   }
);

axiosInstanceMain.interceptors.response.use(
   (response) => {
      const { url } = response.config;
      if (url === pathAuth.login && response.data.token) {
         accessToken = response.data.token;
         profileUser = response.data.user;
         setAccessTokenToLS(accessToken);
         setProfileFromLS(profileUser);
      }
      return response;
   },
   (error) => {
      return Promise.reject(error);
   }
);

export default axiosInstanceMain;

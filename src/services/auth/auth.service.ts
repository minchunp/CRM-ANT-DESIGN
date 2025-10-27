import type { LoginRequest, LoginResponse } from "../../interfaces/user.interface";
import axiosInstanceMain from "../axios";

export const authService = {
   login: (data: LoginRequest) => {
      return axiosInstanceMain.post<LoginResponse>("/login", data);
   },
};

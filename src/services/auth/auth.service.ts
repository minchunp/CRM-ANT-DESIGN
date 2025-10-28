import type { LoginRequest, LoginResponse } from "../../interfaces/auth.interface";
import axiosInstanceMain from "../axios";

export const authService = {
   login: (data: LoginRequest) => {
      return axiosInstanceMain.post<LoginResponse>("/login", data);
   },
};

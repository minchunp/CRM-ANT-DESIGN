import type { User } from "./user.interface";

export interface LoginRequest {
   email: string;
   password: string;
}

export interface LoginResponse {
   success: boolean;
   user: User;
   token: string;
}

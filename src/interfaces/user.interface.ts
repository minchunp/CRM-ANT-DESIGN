export interface User {
   _id: string;
   name: string;
   email: string;
   password: string;
   createdAt: Date;
   updatedAt: Date;
}

export interface LoginRequest {
   email: string;
   password: string;
}

export interface LoginResponse {
   success: boolean;
   user: User;
   token: string;
}

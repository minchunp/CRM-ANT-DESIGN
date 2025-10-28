import { http } from "msw";
import _ from "lodash";
import { mockUsers } from "./data/mockUsers.data";
import type { LoginRequest } from "../interfaces/auth.interface";

export const handlers = [
   http.post("api/login", async ({ request }) => {
      const body = (await request.json()) as LoginRequest;
      const { email, password } = body;

      const user = mockUsers.find((user) => user.email === email && user.password === password);

      if (user) {
         const userWithoutPassword = _.omit(user, "password");

         return Response.json(
            {
               success: true,
               user: userWithoutPassword,
               token: `mock-jwt-token-${userWithoutPassword._id}`,
            },
            {
               status: 200,
            }
         );
      } else {
         return Response.json(
            {
               success: false,
               message: "Invalid email or password",
            },
            {
               status: 401,
            }
         );
      }
   }),
];

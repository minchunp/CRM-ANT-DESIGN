import { http } from "msw";
import type { LoginRequest, User } from "../interfaces/user.interface";
import _ from "lodash";

const mockUsers: User[] = [
   {
      _id: "1",
      name: "Suee",
      email: "suee@example.com",
      password: "sue0604#",
      createdAt: new Date("2023-01-01"),
      updatedAt: new Date("2023-01-01"),
   },
   {
      _id: "2",
      name: "Test User",
      email: "user@example.com",
      password: "user123",
      createdAt: new Date("2023-02-01"),
      updatedAt: new Date("2023-02-01"),
   },
];

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

   http.post("api/logout", () => {
      return Response.json(
         { message: "Logged out successfully" },
         {
            status: 200,
         }
      );
   }),
];

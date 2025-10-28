import type { User } from "../../interfaces/user.interface";

export const mockUsers: User[] = [
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

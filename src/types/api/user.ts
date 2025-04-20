import { MessageResponse } from "../api-types";
import { User } from "../types";

export type UserResponse = MessageResponse & {
  user: User;
};

export type AllUsersResponse = MessageResponse & {
  users: User[];
};

export type DeleteUserRequest = {
  userId: string;
  adminId: string;
};

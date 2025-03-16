import { User } from "./types";

export interface MessageResponse {
  sucess: boolean;
  message: string;
}

export interface UserResponse {
  success: boolean;
  message: string;
  user: User;
}

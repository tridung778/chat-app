import { Conversation } from "@/types";
import { User } from "firebase/auth";

export const getRecipientEmail = (
  conversationUsers: Conversation["users"],
  loggedInUser?: User | null
) => conversationUsers.find((user) => user !== loggedInUser?.email);

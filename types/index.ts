import { Timestamp } from "firebase/firestore";

export interface Conversation {
    users: string[]
}

export interface AppUser{
    email: string;
    lastSeen: Timestamp;
    photoUrl: string;
}

export interface IMessage{
    id: string;
    conversation_id: string;
    sent_at: string;
    text: string;
    user_id: string;
}
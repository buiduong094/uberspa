import { Message } from "models/message";

export interface ConversationItem {
    logo?: string,
    name?: string,
    message?: string,
    time?: string
    id: number,
    to_id?: number,
    avatar?: string,
    num_message?: number,
    last_message_id?: number,
    last_message?: Message
}
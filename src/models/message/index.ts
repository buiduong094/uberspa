export enum MessageType {
    Success,
    Pending,
    Error,
    Loading
}

export interface DialogMessage {
    type?: MessageType,
    message?: string,
    display?: boolean

}
export interface Message {
    // _id: string;
    // userName?: string;
    // created?: string;
    // text?: string;
    // avatar?: string;
    // channel?: string;
    // sender?: string;
    // fileUrl?: string;
    // files?: any;
    // fileName?: string;

    id?: number,
    from_id?: number,
    to_id?: number,
    text?: string,
    media?: string,
    time?: number,
    seen?: number,
    sent_push?: number,
    notification_id?: number,
    created_at?: string,
    updated_at?: string,
    files?: File[]
}

export interface File {
    id?: number,
    message_id?: number,
    cretae_user_id?: number,
    image_url?: string,
    thumbnail?: string,
    video_url?: string,
    created_at?: string,
    updated_at?: string
}
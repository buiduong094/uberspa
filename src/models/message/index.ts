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
    _id: string;
    userName?: string;
    created?: string;
    text?: string;
    avatar?: string;
    isRead?: boolean;
    channel?: string;
    sender?: string;
    fileUrl?: string;
    files?: any;
    fileName?: string;

    /**
     * Text = 1, Image = 2, Video = 3, Voice =4, File= 5
     */
    messageType?: string;
    clientID?: string;
    /**
     * Value = 0: user, 1: admin
     */
    supporter?: string;
    url?: string;
}
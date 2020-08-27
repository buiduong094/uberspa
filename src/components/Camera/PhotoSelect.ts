import { PhotoIdentifier } from "@react-native-community/cameraroll";

export interface PhotoSelect {
    selected?: boolean;
    node?: PhotoIdentifier;
    timespan?: Date,
    fileName?: string
}
export interface CameraItem
{
    isImage?: boolean,
    url: string
}
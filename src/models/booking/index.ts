import { TagItem } from "models/tag";

export interface BookingItem {
    logo?: string,
    name?: string,
    bookingDate?: string| Date,
    bookingName?: string,
    childs?: Array<TagItem>
    id: number,
}

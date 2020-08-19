import { TagItem } from "models/tag";

export interface UberService {
    logo?: string,
    address?: string,
    distance?: number,
    star?: number,
    rating?: string,
    childs?: Array<TagItem>,

    name?: string,
    icon?: string,
    description?: string,
    photos?: string,
    slug?: string
}

export interface GeoLocation
{
    type:string,
    coordinates:number[]
}
export interface Point {
    Latitude: number,
    Longitude: number,
}
export  interface GeoMarker
{
    Id?:string,
    Geo?: number[],
    LayerName?:string
}
export interface GeoAddress {
    address: string;
    geo: Point,
    Ward?: string,
    District?: string,
    Province?: string
}export interface SearchLocation {
    Keyword?: string,
    Page: number,
    PageSize: number,
    Radius: number;
    Point?: Point
}
export interface SuggestAddress{
    VietbandoId?:string,
    Name?: string,
    Room?: string,
    Floor?: string,
    Building?: string,
    Number?: string,
    Street?: string,
    Ward?: string,
    District?: string,
    Province?: string,
    Latitude?: number,
    Longitude?: number,
    Phone?: string,
    Fax?: string,
    GroupCode?: number,
    CategoryCode?: number,
    Selected?: boolean,
    Address?:string
}
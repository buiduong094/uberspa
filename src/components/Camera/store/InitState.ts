import { PhotoSelect } from "./PhotoSelect";




export interface IState {
    page?: number,
    showCamera?: boolean,
    imageSources?: Array<PhotoSelect>,
    imagePreview?: string
}
export const InitState: IState = {

    page: 1,
    showCamera:true

}
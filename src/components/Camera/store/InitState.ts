import { PhotoSelect } from "./PhotoSelect";

export interface IState {
    page?: number,
    showCamera?: boolean,
    grantPermission?: boolean,
    imageSources?: Array<PhotoSelect>,
    imagePreview?: string,
    front?: boolean,
    flash?: boolean,
    loading?: boolean 
}
export const InitState: IState = {
    page: 1,
    showCamera: true,
    front: false,
    flash: false,
    grantPermission: false,
    loading: false,

}
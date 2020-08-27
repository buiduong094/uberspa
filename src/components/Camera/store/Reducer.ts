
import { IState } from './InitState'
import { ActionType } from './ActionType';

import CameraRoll from '@react-native-community/cameraroll';
import { PhotoSelect } from '../PhotoSelect';

interface LoadedAction {
    type: string,
    data?: any

}
interface FieldChangeAction {
    type: string,
    fieldName: string,
    fieldValue: any
}
interface GalleryAction {
    type: string,
    data: any,
    page: number,

}


type KnownAction = LoadedAction | FieldChangeAction | GalleryAction;

export const ActionCreators = {
    Loading: (dispatch: React.Dispatch<KnownAction>) => {

        CameraRoll.getPhotos({
            first: 1,
            assetType: 'Photos'
        })
            .then(r => {
                dispatch({
                    type: ActionType.FIELD_CHANGE,
                    fieldName: "imagePreview",
                    fieldValue: r.edges[0].node.image.uri
                })


            })
            .catch((err) => {
                //Error Loading Images
            });
    },
    Gallery: (dispatch: React.Dispatch<KnownAction>, page: number = 1, type: number = 1) => {
        const gallerySources = new Array<PhotoSelect>();
        if (type == 2) {
            CameraRoll.getPhotos({
                first: 100 * page,
                assetType: 'Videos'
            }).then(sources => {
                sources.edges.forEach((item) => {
                    // if (!item.node.image.playableDuration) {
                        const photo: PhotoSelect = {
                            node: item,
                            fileName: item.node.image.filename
                        }
                        gallerySources.push(photo);
                    // }
                })
                dispatch({
                    type: ActionType.LOAD_GALLERY,
                    data: gallerySources,

                })
            })
                .catch((err) => {
                    //Error Loading Images
                });
        }
        else {
            CameraRoll.getPhotos({
                first: 100 * page,
                assetType: 'Photos'
            }).then(sources => {

                sources.edges.forEach((item) => {
                    if (!item.node.image.playableDuration) {
                        const photo: PhotoSelect = {
                            node: item,
                            fileName: item.node.image.filename
                        }
                        gallerySources.push(photo);
                    }
                })
                dispatch({
                    type: ActionType.LOAD_GALLERY,
                    data: gallerySources,

                })
            })
                .catch((err) => {
                    //Error Loading Images
                });
        }


    },


    FieldChange: (dispatch: React.Dispatch<KnownAction>, fieldName: string, fieldValue: any) => {
        dispatch({
            type: ActionType.FIELD_CHANGE,
            fieldName: fieldName,
            fieldValue: fieldValue
        })
    },

}

export const reducer = (state: IState, incomingAction: KnownAction): IState => {
    let action
    switch (incomingAction.type) {

        case ActionType.FIELD_CHANGE:

            action = incomingAction as FieldChangeAction;
            return {
                ...state,
                [action.fieldName]: action.fieldValue

            }
        default:
            return state;
        case ActionType.LOAD_GALLERY:

            action = incomingAction as GalleryAction;
            let page = state.page ? state.page + 1 : 1;
            return {
                ...state,
                imageSources: action.data,
                page: page

            }
    }
}
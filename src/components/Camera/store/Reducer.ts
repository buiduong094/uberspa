
import { IState } from './InitState'
import { ActionType } from './ActionType';
import { client } from 'api/client';
import { Endpoint } from 'api/endpoint';
// import { IDropDown } from 'models/category';
// import { ResponseSearch, ItemSearch } from 'models/search';
import CameraRoll from '@react-native-community/cameraroll';
import { PhotoSelect } from './PhotoSelect';

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

type KnownAction = LoadedAction | FieldChangeAction ;

export const ActionCreators = {
    Loading: (dispatch: React.Dispatch<KnownAction>) => {

        CameraRoll.getPhotos({
            first: 1,

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
    Gallery: (dispatch: React.Dispatch<KnownAction>, page: number) => {
        const gallerySources = new Array<PhotoSelect>();
        CameraRoll.getPhotos({
            first: page * 1000,
        }).then(r => {
                CameraRoll.getPhotos({
                    first: 100,
                }).then(sources => {
                        sources.edges.forEach((item) => {
                            const photo: PhotoSelect = {
                                node: item,
                                fileName: item.node.image.filename
                            }
                            gallerySources.push(photo);
                        })
                        dispatch({
                            type: ActionType.FIELD_CHANGE,
                            fieldName:'imageSources',
                            fieldValue:gallerySources
                        })
                    })
                    .catch((err) => {
                        //Error Loading Images
                    });
                dispatch({
                    type: ActionType.LOAD_GALLERY,
                    data: r.edges[0].node.image.uri
                })


            })
            .catch((err) => {
                //Error Loading Images
            });
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
        case ActionType.LOAD_GALLERY:

            action = incomingAction as GalleryAction;
            let page = state.page ? state.page + 1 : 1;
            return {
                ...state,
                imageSources: action.data,
                page: page

            }
        default:
            return state;
    }
}
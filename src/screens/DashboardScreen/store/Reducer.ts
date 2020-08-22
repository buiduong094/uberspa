import { ActionType as ContextAction } from 'store/context/ActionType';



import { ActionType } from './ActionType';

import { client, setToken } from 'api/client';
import { IState } from './InitState';


import { User } from 'models/user';
import { GeoLocation, GeoMarker } from 'models/geo';
import { Endpoint } from 'api/endpoint';
import { UberService } from 'models/uberservice';
import { SERVER_KEY } from 'constant';
interface RequestAction {
    type: string,
}
interface ReceivedAction {
    type: string,
    data: any
}
interface FieldChangeAction {
    type: string,
    fieldName: string,
    fieldValue: any
}
interface CommitedAction {
    type: string,
}


type KnownAction = RequestAction | ReceivedAction | FieldChangeAction | CommitedAction;


export const ActionCreators = {
  
    REQUEST_NEAR_BY_SERVICES: async (
        dispatch: React.Dispatch<KnownAction>,
        longitude: number,
        latitude: number
    ) => {
        const queryBody = {
            server_key: SERVER_KEY,

            latitude: 20.958021,
            longitude: 107.091785
        };
        const response = await client.post(Endpoint.SEARCH_NEAR_BY, queryBody);

        if (response && response.status == 200) {
            let realData = response?.data?.data?.listShop;
            dispatch({
                type: ActionType.RECEIVE_NEAR_SERIVCE,
                data: realData
            });
        }
    },
    GET_CAROUSEL: async (dispatch: React.Dispatch<KnownAction>) => {
        Promise.all([client.post(Endpoint.GET_SLIDER, { server_key: SERVER_KEY })]).then(([response]) => {
            if (response && response.status == 200) {
                let realData = response?.data?.data;
                dispatch({
                    type: ActionType.RECEIVE_ITEMS,
                    data: realData
                });
            }
        })

    },
}
export const reducer = (state: IState, incomingAction: KnownAction): IState => {
    let action
    switch (incomingAction.type) {
        case ActionType.RECEIVE_NEAR_SERIVCE:
            action = incomingAction as ReceivedAction;
            let nearByService: UberService[] = action.data ?? [];
            nearByService = nearByService.filter((item, index) => index < 10);
            nearByService.forEach(item => {
                item.distance = parseFloat((item.distance ?? 0).toFixed(1));
                if (item.rating === null) {
                    item.rating = '0';
                }
                if (item.logo) {
                    item.logo = Endpoint.BASE_URL + "/" + item.logo;
                }
                if (!item?.star) {
                    item.star = 0;
                }
            })
            return {
                ...state,
                nearByservices: nearByService
            }
        case ActionType.RECEIVE_ITEMS:
            action = incomingAction as ReceivedAction;
            const carousels = action.data as Array<any>;
            let sliders = new Array<string>();
            carousels.forEach(ite => {
                sliders.push(Endpoint.BASE_URL + ite?.photo);
            })
            return {
                ...state,
                slides: sliders
            }
        default:
            return state
    }
}


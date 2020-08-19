import { Endpoint } from 'api/endpoint';
import { InitState, IState } from './InitState';
import { Reducer as ReduxReducer } from 'redux';
import { ActionType } from './ActionType';

import { ThunkAction } from 'store/configureAction';
import { client } from 'api/client';
import { PassPhaseCert } from 'models/cert';




interface RequestItemsAction {
    type: string
    data?: any,
    billCode?: string
}
interface RequestItemAction {
    type: string,
    data?: any
}
interface CommitedItemAction {
    type: string,
    data?: any

}
export type KnowAction = RequestItemsAction | RequestItemAction | CommitedItemAction;

export const ActionCreators = {

    RequestItems: (): ThunkAction<KnowAction> => (dispatch, getState) => {
        const state = getState().CertState;
        dispatch({
            type: ActionType.REQUESTING_ITEMS,
        });
        (async () => {
            if (state.relayParty) {
                const certListRes = await client.post(Endpoint.CertList, state.relayParty ?? {});
                console.warn(certListRes);
                const certificates = certListRes?.data.certificates as Array<any>;
                const reqPromises = new Array<any>();
                certificates.forEach((cert) => {
                    const relayDetailBody = {
                        ...state.relayParty,
                        ...state.relayPartyDetail,
                        thumbprint: cert.thumbprint
                    }
                    const request = client.post(Endpoint.CertDetail, relayDetailBody)
                    reqPromises.push(request);

                })
                Promise.all(reqPromises).then((values) => {
                    const certificates = new Array<any>();
                    values.forEach((res) => {
                        certificates.push(res.data.certificate);
                    })
                    dispatch({
                        type: ActionType.REQUESTED_ITEMS,
                        data: certificates,
                        billCode: certListRes?.data.billCode,
                    })
                }).catch((error) => {

                });



            }
        })();
    },

    RequestItem: (cert: any): ThunkAction<KnowAction> => (dispatch, getState) => {
        dispatch({
            type: ActionType.REQUESTED_ITEM,
            data: cert
        })
    },
    CommitItem: (passPhaseBody:any): ThunkAction<KnowAction> => (dispatch, getState) => {
      
        dispatch({
            type: ActionType.COMMITING_ITEM,
        })
        const state = getState().CertState;
 
        const requestBody: PassPhaseCert = {
           thumbprint: state.item.thumbprint,
           ...passPhaseBody,
           relyingPartyBillCode:state.billCode,
           lang:"EN"
        }

        (async()=>{
            const request = await client.post(Endpoint.CertChangePassphase, requestBody);
            console.warn(request?.data);
    
        })();
       
      
    }
}

export const Reducer: ReduxReducer<IState, KnowAction> =
    (state: IState | undefined, incomingAction: KnowAction): IState => {
        if (state == undefined) {
            return InitState;
        }
        let action;
        switch (incomingAction.type) {
            case ActionType.REQUESTED_ITEMS:

                action = incomingAction as RequestItemsAction;
                return {
                    ...state,
                    billCode: action.billCode,
                    listItems: action.data

                }
            case ActionType.REQUESTED_ITEM:

                action = incomingAction as RequestItemsAction;
                return {
                    ...state,
                    item: action.data

                }
            default:
                return state;
        }

    }



import { ActionType } from './ActionType';

import { client, } from 'api/client';
import { IState } from './InitState';
import { Stats } from 'fs';
import { Endpoint } from 'api/endpoint';
import { SERVER_KEY } from 'constant';



interface CommitedAction {
  type: string;
  data?: any
}
interface LoadingAction {
  type: string
}
interface FieldChangeAction {
  type: string,
  fieldName: string,
  fieldValue?: any

}
type KnownAction = CommitedAction | LoadingAction | FieldChangeAction;

export const ActionCreators = {

  FIELD_CHANGE: (dispatch: React.Dispatch<KnownAction>, fieldName: string, fieldValue: any) => {

    dispatch({
      type: ActionType.FIELD_CHANGE,
      fieldName: fieldName,
      fieldValue: fieldValue
    })
  },
  Update: (dispatch: React.Dispatch<KnownAction>, body: any, updateNoti?: boolean) => {
    let bodyParam = {};
    let url = Endpoint.USER_UPDATE;
    if (updateNoti) {
      bodyParam = {
        is_notification: body?.is_notification
      }
      url = Endpoint.UPDATE_GET_NOTIFI;
    } else {
      bodyParam = {
        GIOITINH: JSON.stringify([body.GIOITINH]),
        NOI_THUONGTRU: body?.NOI_THUONGTRU,
        SO_DIEN_THOAI: body?.SO_DIEN_THOAI,
        SO_CANCUOC: parseInt(body?.SO_CANCUOC),
        name: body?.name ?? "",
        phone: body?.phone ?? "",
        address: body?.address ?? "",
        birth_day: body?.birth_day ?? "",
        // gender: body?.gender ?? "",
        server_key: SERVER_KEY
      }
    }
    Promise.all([
      client.post(url, bodyParam)
    ]).then(([response]) => {
      if (response && response.status == 200) {
        let responseJson = response.data;
        if (responseJson.status == 200) {
          dispatch({
            type: ActionType.UPDATE_USER_SUCCESS
          });
        }
      } else {
        dispatch({
          type: ActionType.UPDATE_USER_FAIL,
        });
      }
    }).catch((error) => {
      dispatch({
        type: ActionType.UPDATE_USER_FAIL,
      });
    })

  },
};
export const reducer = (state: IState, incomingAction: KnownAction): IState => {
  let action
  switch (incomingAction.type) {
    case ActionType.FIELD_CHANGE:
      action = incomingAction as FieldChangeAction;

      if (action.fieldName.includes('.')) {
        let names = action.fieldName.split('.');
        var dataType = names[0];
        let objectState = { ...state } as any;
        var cloneObject = objectState[dataType];
        cloneObject[names[1]] = action.fieldValue;
        return {
          ...state,
          [dataType]: cloneObject
        }
      }
      else {
        return {
          ...state,
          [action.fieldName]: action.fieldValue
        }
      }
    case ActionType.UPDATE_USER_SUCCESS:
      return {
        ...state,
        message: 'Cập nhật thông tin thành công!',
        updateSuccess: true
      };
    case ActionType.UPDATE_USER_FAIL:
      return {
        ...state,
        message: 'Cập nhật thông tin không thành công!'
      }
    default:
      return state;
  }
}

import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { Header, Button, TextInputUI, Camera } from 'components';
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { ApplicationState } from 'store/configureAction';
import { ActionCreators as ReduxAction } from 'store/cert';
import { RouteName } from 'constant';
import { ImageSource } from 'assets';
import { convertHeight } from 'utils/convertSize';
import * as Icon from 'constant/icons';
import { reducer } from 'screens/UserScreen/store/Reducer';
import { InitState } from 'screens/UserScreen/store/InitState';
import { ActionCreators as ContextActions } from 'store/context';
import { User } from 'models/user';
import { useFormik } from 'formik';
import { ActionCreators } from 'screens/UserScreen/store/Reducer';
import alertDefaultTitle from 'utils/alertDefaultTitle';
import store from 'store/configureStore';
import { ActionType as ContextActionType } from 'store/context/ActionType';
import { Endpoint } from 'api/endpoint';
interface UIProps {
    image: any,
    text?: string,
    hasText?: boolean,
    style?: any,
    listItems?: any[],
    user?: User,
    onShowCamera?: Function
    onChangeImage?: Function
    showCamera?: boolean,
}
type Props = UIProps & typeof ReduxAction;

const UserScreen = (props: Props) => {

    const [state, dispatch] = React.useReducer(reducer, InitState)

    const navigation = useNavigation();

    const formik = useFormik({
        enableReinitialize: true,
        validationSchema: state.validationSchema,
        initialValues: { ...state.initValues },
        onSubmit: (values) => {

            ActionCreators.Update(dispatch, values);
        }
    });

    useEffect(() => {
        ActionCreators.FIELD_CHANGE(dispatch, 'initValues', props.user);
    }, [])

    useEffect(() => {
        if (state.message && state.message != '') {
            alertDefaultTitle.show(state.message, 'Đóng', () => { navigation.goBack(); checkClearError(); });
        }
    }, [state.message]);

    // cập nhật thành công thì update lại context state
    useEffect(() => {
        if (state.updateSuccess) {
            store.dispatch({
                type: ContextActionType.FIELD_CHANGE,
                fieldName: 'user',
                fieldValue: formik.values
            })
        }
    }, [state.updateSuccess]);

    const checkClearError = () => {
        ActionCreators.FIELD_CHANGE(dispatch, 'message', '');
    }

    const errorMessage = (fieldName: string) => {
        if (formik.touched[fieldName] && formik.errors[fieldName]) {
            return formik.errors[fieldName]?.toString()
        }
        return undefined;
    }

    const ChangeForm = () => {

        const renderIcon = (icon: any) => {
            switch (icon) {
                case 'name':
                    return <Icon.Pencil size={25} color="#C2C2C2" />
                case 'phone':
                    return <Icon.Phone size={25} color="#C2C2C2" />
                case 'address':
                    return <Icon.Location size={25} color="#C2C2C2" />
                case 'birth_day':
                    return <Icon.Birthday size={25} color="#C2C2C2" />
                default:
                    return <Icon.Gender size={25} color="#C2C2C2" />
            }
        }

        return (<WrapperForm>
            {
                state.controls.map((elem, index) => (
                    <TextInputUI
                        key={index}
                        placeholder={elem.placeholder}
                        uistyle={{ paddingTop: 15, paddingHorizontal: 15 }}
                        leftIcon={renderIcon(elem?.fieldName)}
                        type={elem.type}
                        keyboardType={elem.keyboardType}
                        errorMessage={errorMessage(elem.fieldName)}
                        textValue={formik.values[elem.fieldName]}
                        onChangeText={(value) => {
                            formik.setFieldValue(elem.fieldName, value)
                        }}
                    />
                ))
            }
            <Button text='Cập nhật' uistyle={{ marginTop: 22 }} onPress={() => {
                formik.handleSubmit()
            }}></Button>
        </WrapperForm>)
    }

    const onCameraTakeImageChange = (sources: any) => {
        if (props.onShowCamera) {
            props.onShowCamera(false);
        }
        if (props.onChangeImage) {
            props.onChangeImage(sources, true);
        }
    }
    const onCameraImageChange = (sources: any) => {
        if (props.onShowCamera) {
            props.onShowCamera(false);
        }
        const images = state.user ? state.user['avatar'] : [];
        let cloneImages = [...images ?? []];
        cloneImages = cloneImages.concat(sources);

        ActionCreators.FIELD_CHANGE(dispatch, 'user.avatar', cloneImages);
    }

    const displayCamera = () => {
        return (
            <Camera onClose={() => {
                if (props.onShowCamera) {
                    props.onShowCamera(false);
                }
            }}
                onCature={onCameraTakeImageChange}
                onSelectImages={onCameraImageChange}
            ></Camera>
        )
    }

    return (
        <Container>
            <Header
                text='THÔNG TIN CÁ NHÂN'
                backColor="#FFF"
                style={{ backgroundColor: '#65DF7B' }}
                titleStyle={{ marginLeft: -30, color: '#FFFF' }}
                navigation={navigation}>
            </Header>
            <ScrollWrapper>
                <AvatarWrapper>
                    <AvatarImage onPress={() => {
                        if (props.onShowCamera) {
                            props.onShowCamera(true);
                        }
                    }}>
                        {/* {
                            state.user?.avatar && state.user?.avatar.length > 0
                                ?
                                <Avatar source={state.user?.avatar} resizeMode="cover" />
                                :
                                <Avatar source={ImageSource.spa} resizeMode="cover" />
                        } */}
                        <Avatar source={props.user?.avatar ? Endpoint.BASE_URL + "/" + props.user?.avatar : ImageSource.spa} resizeMode="cover" />
                    </AvatarImage>
                </AvatarWrapper>
                <ChangeForm />
            </ScrollWrapper>
            {props.showCamera && displayCamera()}
        </Container >
    )
}
const mapStateToProps = (state: ApplicationState) => ({
    listItems: state.CertState.listItems,
    user: state.ContextState.user,
    showCamera: state.ContextState.showCamera
})
const mapDispatchToProps = {
    RequestItems: ReduxAction.RequestItems,
    RequestItem: ReduxAction.RequestItem,
    onShowCamera: ContextActions.ShowCamera,
    onChangeImage: ContextActions.ChangeImage
};

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps
);

export default compose(withConnect)(UserScreen as any);
const Container = styled.View`
flex:1;
backgroundColor: #FFFF;
`;

const WrapperForm = styled.View``;
const ScrollWrapper = styled.ScrollView`
flex: 1`;

const AvatarWrapper = styled.View`
alignItems: center;
marginVertical:20;
`;
const AvatarImage = styled.TouchableOpacity``;

const Avatar = styled.Image`
  width: ${convertHeight(80)};
  height: ${convertHeight(80)};
  borderRadius: ${convertHeight(40)};

`;
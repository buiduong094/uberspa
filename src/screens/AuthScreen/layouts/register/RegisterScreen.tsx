
import React, { useState, useReducer, useEffect } from 'react';
import { Image, View, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reducer, ActionCreators } from 'screens/AuthScreen/store/Reducer';
import { InitState } from 'screens/AuthScreen/store/InitState';
import { ApplicationState } from 'store/configureAction';
import styled from 'styled-components/native';
import { ImageSource } from 'assets';
import { fontFamily } from 'utils/Theme';
import { useNavigation } from '@react-navigation/native';
import { Header, TextInputUI, LoginButton, Button } from 'components';
import { Stage } from "screens/AuthScreen/layouts";
import { useFormik } from 'formik';
import * as Icon from 'constant/icons';
import { LoginModel } from 'screens/AuthScreen/model';
import { RouteName } from 'constant';
import { getString, MessageDefine } from 'locales';
import { RegisterModel } from '../../model/index';
import { MessageType } from 'models/message';
import alertDefaultTitle from 'utils/alertDefaultTitle';
import { VerificationScreen } from 'screens/AuthScreen/layouts/verify/VerificationScreen'
interface UIProps {
    isConnection?: boolean
}

export const RegisterScreen = (props: UIProps) => {

    const navigation = useNavigation();

    const [state, dispatch] = useReducer(reducer, InitState);

    useEffect(() => {
        if (state.commited && state.message) {
            const msg = state.message?.message || '';
            alertDefaultTitle.show(msg, 'Đóng');
        }
    }, [state.commited])


    const formik = useFormik({
        enableReinitialize: true,
        validationSchema: state.validationRegisterSchema,
        initialValues: { ...state.registerModel },
        onSubmit: (values) => {
            if (formik.isValid) {
                ActionCreators.REGISTER(dispatch, values as RegisterModel);

            }
        }
    });

    const errorMessage = (fieldName: string) => {
        if (formik.touched[fieldName] && formik.errors[fieldName]) {
            return formik.errors[fieldName]?.toString()
        }
        return undefined;
    }

    const displayIcon = (fieldName: string) => {
        if (fieldName === 'name') return <Icon.Pencil color="#C2C2C2" size={18} />;
        if (fieldName === 'email') return <Icon.Email color="#C2C2C2" size={18} />;
        if (fieldName === 'phone') return <Icon.Phone color="#C2C2C2" size={18} />;
        if (fieldName === 'address') return <Icon.Address color="#C2C2C2" size={18} />;
        if (fieldName === 'password') return <Icon.Lock color="#C2C2C2" size={18} />;
        if (fieldName === 'confirm_password') return <Icon.Lock color="#C2C2C2" size={18} />;
    }


    const formControl = () => {
        return (
            <WrapperForm>
                {
                    state.forms.find(e => e.stage == Stage.REGISTER)?.rows.map((r, i) => (
                        <View style={{ marginVertical: 5 }}>
                            {
                                r.controls.map((c, index) => (
                                    <TextInputUI
                                        key={index}
                                        placeholder={c.placeholder}
                                        uistyle={{ paddingTop: 15 }}
                                        type={c.type}
                                        keyboardType={c.type === "password" ? "default" : c.type as any}
                                        errorMessage={errorMessage(c.fieldName)}
                                        textValue={formik.values[c.fieldName]}
                                        contentstyle={{ backgroundColor: '#F4F5F6', borderWidth: 0 }}
                                        leftIcon={displayIcon(c.fieldName)}
                                        onChangeText={(value) => {
                                            formik.setFieldValue(c.fieldName, value);
                                        }}
                                    />
                                ))

                            }
                        </View>
                    ))
                }
            </WrapperForm>)
    }

    const fieldChange = (fieldName: string, value: string) => {
        ActionCreators.FieldChange(dispatch, fieldName, value);
    }

    const refCode = {
        refCode1: state.refCode1,
        refCode2: state.refCode2,
        refCode3: state.refCode3,
        refCode4: state.refCode4,
        refCode5: state.refCode5,
        refCode6: state.refCode6
    }

    return (
        <Container>
            <BackButton onPress={() => navigation.goBack()}>
                <Icon.Back size={27}></Icon.Back>
            </BackButton>
            <TouchableWithoutFeedback onPress={() => {
                Keyboard.dismiss();
            }} accessible={false}>

                {
                    state.step === 1 ?
                        <Register showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                            <KeyboardAvoidingView behavior="position" enabled>
                                <Image style={{ height: 80, width: 80, marginBottom: 10, borderRadius: 5 }} source={ImageSource.logo}></Image>
                                <Title>Đăng ký tài khoản mới</Title>
                                <SubTitle>Quý khách vui lòng hoàn tất các thông tin sau để sử dụng các dịch vụ trên UberOne</SubTitle>
                                {
                                    formControl()
                                }
                                <LoginButton
                                    uistyle={{ marginTop: 10 }}
                                    textstyle={{ textTransform: 'uppercase', }}
                                    text={getString('screen', 'REGISTER_BUTTON_LABEL')}
                                    onPress={() => {
                                        formik.handleSubmit()
                                    }} />
                                <TermStyled>
                                    Đồng nghĩa với đăng nhập bạn đã chấp thuận với <TextStyled>điều khoản</TextStyled> và <TextStyled>chính sách</TextStyled> của chúng thôi
                        </TermStyled>
                            </KeyboardAvoidingView>
                        </Register>
                        :
                        <VerificationScreen
                            refCode={refCode}
                            submit={() => formik.handleSubmit()}
                            fieldChange={fieldChange}
                            phone={formik['phone']}
                        />
                }
            </TouchableWithoutFeedback>
        </Container >
    )
}
const mapStateToProps = (state: ApplicationState) => ({
    isConnection: state.ContextState.isConnection



})
const mapDispatchToProps = {

};

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps
);

export default compose(withConnect)(RegisterScreen as any);

const Container = styled.View`
justify-content:center;
flex: 1;
`;

const Title = styled.Text`
    fontFamily: ${fontFamily.bold};
    color: #000000;
    fontSize: 18
  
`;
const SubTitle = styled.Text`
    fontSize:14;
    color: #9B9B9B;
    marginVertical:10px;
    fontFamily: ${fontFamily.medium};
  
`;
const Register = styled.ScrollView`
  
    background-color: #F6FBFB;
    padding:20px;
`;
const WrapperForm = styled.View`

`;
const TextStyled = styled.Text`
textDecorationLine:underline;
color:#9B9B9B;
fontFamily: ${fontFamily.regular};
fontSize: 14;
`;
const TermStyled = styled.Text`
color:#9B9B9B;
textAlign:center;
marginTop: 15;
marginBottom: 30;
fontFamily: ${fontFamily.regular};
`;
const WrapperVerify = styled.View`
flex-direction:row;
justify-content:space-between;
`;
const Verify = styled.View`
width: 46px;
height: 46px;
border-radius: 50px;
background-color: #F4F5F6;
justify-content:center;
align-items:center;
`;
const VerifyInput = styled.TextInput`
width: 46px;
height: 46px;
text-align: center
`;
const VerifyText = styled.Text`
margin-top: 15px`;
const Time = styled.Text`
color: red;
`;
const BackButton = styled.TouchableOpacity`
padding:42px 15px 20px 15px;
background-color: #F6FBFB;
`;
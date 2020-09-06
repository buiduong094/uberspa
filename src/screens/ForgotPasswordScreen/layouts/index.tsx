import React, { useState, useEffect, useReducer, useRef } from 'react';
import { Image } from 'react-native'
import styled from 'styled-components/native';
import { Header, TextInputUI, Button } from 'components';
import { reducer, ActionCreators } from '../store/Reducer';
import { InitState, validationPassword } from '../store/InitState';
import { useNavigation } from '@react-navigation/native';
import { fontFamily } from 'utils/Theme';
import { ImageSource } from 'assets';
import * as Icon from 'constant/icons';
import { useFormik } from 'formik';
import { MessageDefine } from 'locales';
import alertDefaultTitle from 'utils/alertDefaultTitle';
import { VerificationScreen } from 'screens/AuthScreen/layouts/verify/VerificationScreen'


type UIProps = {
    navigation?: any,
    style?: any
}

const Layout = (props: UIProps) => {

    const navigation = useNavigation();

    const [state, dispatch] = useReducer(reducer, InitState);

    const formikPhone = useFormik({
        enableReinitialize: true,
        validationSchema: state.validationSchema,
        initialValues: { ...state.initValues },
        onSubmit: (values) => {
            console.log(values);
            if (formikPhone.isValid) {
                if (state.step < 3) {
                    nextStep();
                } return;
            }
        }
    });

    const formikPass = useFormik({
        enableReinitialize: true,
        validationSchema: validationPassword,
        initialValues: {
            newPassword: '',
            re_password: ''
        },
        onSubmit: (values) => {
            alertDefaultTitle.show(MessageDefine.CHANGE_PASSWORD, 'Đóng', () => { }, 'Đồng ý', () => {
                //call api update pass, xử lý goback khi state update thành công
                // ActionCreators.CHANGE_PASSWORD(dispatch, values)
                console.log(values)
                navigation.goBack()
            });
        }
    });

    const errorMessage = (fieldName: string) => {
        if (state.step == 1) {
            if (formikPhone.touched[fieldName] && formikPhone.errors[fieldName]) {
                return formikPhone.errors[fieldName]?.toString()
            }
            return undefined;
        } else {
            if (formikPass.touched[fieldName] && formikPass.errors[fieldName]) {
                return formikPass.errors[fieldName]?.toString()
            }
            return undefined;
        }
    }
    const nextStep = () => {
        let step = state.step;
        ActionCreators.ChangeStep(dispatch, step + 1);
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
        <WrapperContent>
            <BackButton onPress={() => navigation.goBack()}>
                <Icon.Back size={27}></Icon.Back>
            </BackButton>
            {
                state.step == 1 &&
                <Container>
                    <Image style={{height:80, width:80, marginBottom: 10, borderRadius:5}} source={ImageSource.logo}></Image>
                    <Title>Khôi phục tài khoản</Title>
                    <SubTitle>Quý khách vui lòng nhập số điện thoại đăng ký tài khoản. Hệ thống sẽ gửi mã xác nhận cho việc khôi phục mật khẩu của quý khách</SubTitle>
                    {
                        state.controls.map((elem, index) => (
                            index === 0 ?
                                <TextInputUI
                                    key={elem.fieldName}
                                    placeholder={elem.placeholder}
                                    uistyle={{ paddingTop: 15 }}
                                    contentstyle={{ backgroundColor: '#F4F5F6' }}
                                    leftIcon={<Icon.Phone size={25} color="#C2C2C2" />}
                                    type={elem.type}
                                    keyboardType={elem.keyboardType}
                                    errorMessage={errorMessage(elem.fieldName)}
                                    textValue={formikPhone.values[elem.fieldName]}
                                    onChangeText={(phone) => {
                                        formikPhone.setFieldValue(elem.fieldName, phone);
                                    }}
                                />
                                : undefined
                        ))
                    }
                    <Button text='Cập nhật' uistyle={{ marginTop: 22, marginHorizontal: 0 }} onPress={() => formikPhone.handleSubmit()}></Button>
                </Container>
            }
            {
                state.step == 2 &&
                <VerificationScreen
                    refCode={refCode}
                    submit={() => formikPhone.handleSubmit()}
                    fieldChange={fieldChange}
                    phone={formikPhone['phone']}
                />
            }
            {
                state.step == 3 &&
                <Container>
                    <Image style={{height:80, width:80, marginBottom: 10, borderRadius:5}} source={ImageSource.logo}></Image>
                    <Title>Thiết lập mật khẩu</Title>
                    <SubTitle>Quý khách vui lòng thiết lập lại mật khẩu</SubTitle>
                    {
                        state.controls.map((elem, index) => (
                            index === 1 || index === 2 ?
                                <TextInputUI
                                    key={elem.fieldName}
                                    placeholder={elem.placeholder}
                                    uistyle={{ paddingTop: 15 }}
                                    contentstyle={{ backgroundColor: '#F4F5F6' }}
                                    leftIcon={<Icon.Lock size={25} color="#C2C2C2" />}
                                    type={elem.type}
                                    keyboardType={elem.keyboardType}
                                    errorMessage={errorMessage(elem.fieldName)}
                                    textValue={formikPass.values[elem.fieldName]}
                                    onChangeText={(value) => {
                                        formikPass.setFieldValue(elem.fieldName, value);
                                    }}
                                />
                                : undefined
                        ))
                    }

                    <Button text='Hoàn tất' uistyle={{ marginTop: 22, marginHorizontal: 0 }} onPress={() => {
                        formikPass.handleSubmit();
                    }}></Button>
                </Container>
            }
        </WrapperContent>
    )
}
export default Layout;

const WrapperContent = styled.View`
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
const Container = styled.View`
    flex: 1;
    background-color: #F6FBFB;
    padding:20px;
`;
const BackButton = styled.TouchableOpacity`
padding:42px 15px 20px 15px;
background-color: #F6FBFB;
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
`
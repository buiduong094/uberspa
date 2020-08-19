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


type UIProps = {
    navigation?: any,
    style?: any
}

const timeCount = 180; // seconds

const Layout = (props: UIProps) => {
    const navigation = useNavigation();
    const [state, dispatch] = useReducer(reducer, InitState);
    const inputRef1 = useRef(null);
    const inputRef2 = useRef(null);
    const inputRef3 = useRef(null);
    const inputRef4 = useRef(null);
    const inputRef5 = useRef(null);
    const inputRef6 = useRef(null);
    const [countdown, setCountdown] = useState(timeCount)
    const [isReadyCount, setReadyCount] = useState(true)

    const convertTime = (timeSecond: number) => {
        let pad = function (num: number, size: number) { return ('000' + num).slice(size * -1); }
        const minutes = Math.floor(timeSecond / 60) % 60
        const seconds = Math.floor(timeSecond - minutes * 60)
        return pad(minutes, 2) + ':' + pad(seconds, 2);
    }

    useEffect(() => {
        const timer = setInterval(() => {
            if (isReadyCount && state.step === 2) {
                setCountdown(countdown - 1)
            }
        }, 1000)
        return () => clearInterval(timer)
    }, [isReadyCount, countdown, state.step])

    useEffect(() => {
        if (countdown === 0) {
            setReadyCount(false)
        }
    }, [countdown])

    /**
     * Auto focus input ref code when step =2
     */
    useEffect(() => {
        if (state.step === 2) {
            inputRef1?.current?.focus();
        }
    }, [state.step])

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
            } else console.log('aaa');
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


    const goBack = () => {
        navigation.goBack();
    }

    const getRefInput = (index: number) => {
        return [inputRef1, inputRef2, inputRef3, inputRef4, inputRef5, inputRef6].find((item, idx) => idx === index);
    }

    const getValueInput = (index: number) => {
        return [state.refCode1, state.refCode2, state.refCode3, state.refCode4, state.refCode5, state.refCode6].find((item, idx) => idx === index);
    }

    const onChangeRefCode = (indexInput: number, value: string) => {
        let fieldName = 'refCode1';
        if (indexInput === 0) {
            inputRef2.current?.focus();
        } else if (indexInput === 1) {
            fieldName = 'refCode2';
            inputRef3.current?.focus();
        } else if (indexInput === 2) {
            fieldName = 'refCode3';
            inputRef4.current?.focus();
        } else if (indexInput === 3) {
            fieldName = 'refCode4';
            inputRef5.current?.focus();
        } else if (indexInput === 4) {
            fieldName = 'refCode5';
            inputRef6.current?.focus();
        } else if (indexInput === 5) fieldName = 'refCode6';

        ActionCreators.FieldChange(dispatch, fieldName, value);
    }

    const nextStep = () => {
        let step = state.step;
        if (step === 1) {
            ActionCreators.ChangeStep(dispatch, step + 1);
        } else if (step === 2) {
            if ((state.refCode1 ?? ''.length > 0)
                && (state.refCode2 ?? ''.length > 0)
                && (state.refCode3 ?? ''.length > 0)
                && (state.refCode4 ?? ''.length > 0)
                && (state.refCode5 ?? ''.length > 0)
                && (state.refCode6 ?? ''.length > 0)) {
                ActionCreators.ChangeStep(dispatch, step + 1);
            }
        }

    }

    const renderVerify = () => {
        const arrInput = [1, 2, 3, 4, 5, 6];
        return arrInput.map((input, index) => (
            <Verify>
                <VerifyInput
                    maxLength={1}
                    keyboardType="numeric"
                    ref={getRefInput(index)}
                    value={getValueInput(index)}
                    onChangeText={(value) => {
                        onChangeRefCode(index, value);
                    }}
                ></VerifyInput>
            </Verify >
        ))
    }

    return (
        <WrapperContent>
            {/* <Header navigation={navigation} style={{ backgroundColor: '#F6FBFB', borderBottomWidth: 0 }}></Header> */}
            <BackButton onPress={goBack}>
                <Icon.Back size={27}></Icon.Back>
            </BackButton>
            {
                state.step == 1 &&
                <Container>
                    <Image source={ImageSource.logo}></Image>
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
                <Container>
                    <Image source={ImageSource.logo}></Image>
                    <Title>Xác nhận tài khoản</Title>
                    <SubTitle>Vui lòng nhập mã xác nhận được gửi tới số điện thoại {formikPhone.values["phone"]}</SubTitle>
                    <WrapperVerify>{renderVerify()}</WrapperVerify>
                    <Button text='Xác nhận' uistyle={{ marginTop: 22, marginHorizontal: 0 }} onPress={nextStep}></Button>
                    <VerifyText>Gửi lại mã sau: <Time>{convertTime(countdown)}</Time></VerifyText>
                </Container>
            }
            {
                state.step == 3 &&
                <Container>
                    <Image source={ImageSource.logo}></Image>
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
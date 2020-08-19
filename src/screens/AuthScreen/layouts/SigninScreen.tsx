
import React, { useState, useReducer, useEffect } from 'react';
import { Image, View, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import Layout from '../shared';
import { compose } from 'redux';
import { reducer, ActionCreators } from 'screens/AuthScreen/store/Reducer';
import { InitState } from 'screens/AuthScreen/store/InitState';
import * as Icon from 'constant/icons';
import { ApplicationState } from 'store/configureAction';
import styled from 'styled-components/native';
import { ImageSource } from 'assets';
import { fontFamily } from 'utils/Theme';
import { MessageType } from 'models/message';
import alertDefaultTitle from 'utils/alertDefaultTitle';
import { MessageDefine } from 'locales';
import { useFormik } from 'formik';
import TextInputUI from 'components/TextInputUI';
import { Stage } from "screens/AuthScreen/layouts";
import { LoginModel } from '../model';
interface UIProps {
  isConnection?: boolean
}

export const SignInScreen = (props: UIProps) => {
  const [state, dispatch] = useReducer(reducer, InitState);

  useEffect(() => {
    if (state.commited && state.message?.type == MessageType.Error) {
      alertDefaultTitle.show(state.message?.message ?? MessageDefine.LOGIN_FAIL, 'Đóng');
    }
  }, [state.commited])

  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: state.validationLoginSchema,
    initialValues: { ...state.loginModel },
    onSubmit: (values) => {
      ActionCreators.LOGIN(dispatch, values as LoginModel);
    }
  });

  const errorMessage = (fieldName: string) => {
    if (formik.touched[fieldName] && formik.errors[fieldName]) {
      return formik.errors[fieldName]?.toString()
    }
    return undefined;
  }

  const formControl = () => {
    return (
      <WrapperForm>
        {
          state.forms.find(e => e.stage == Stage.LOGIN)?.rows.map((r, i) => (
            <View style={{ marginVertical: 5 }}>
              {
                r.controls.map((c, index) => (
                  <TextInputUI
                    key={index}
                    placeholder={c.placeholder}
                    uistyle={{ paddingTop: 15 }}
                    keyboardType={c.type === "password" ? "default" : c.type as any}
                    type={c.type}
                    errorMessage={errorMessage(c.fieldName)}
                    textValue={formik.values[c.fieldName]}
                    contentstyle={{ backgroundColor: '#F4F5F6', borderWidth: 0 }}
                    leftIcon={c.fieldName === "email" ? <Icon.Phone color="#C2C2C2" size={18} /> : <Icon.Lock color="#C2C2C2" size={18} />}
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

  return (
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss();
    }} accessible={false}>
      <Container>
        <KeyboardAvoidingView behavior="position" enabled>
          <Image source={ImageSource.logo}></Image>
          <Title>Chào mừng bạn quay trở lại</Title>
          <SubTitle>Đăng nhập để tiếp tục</SubTitle>
          {
            formControl()
          }
          <Layout
            handleSubmit={formik.handleSubmit}
          ></Layout>
        </KeyboardAvoidingView>
      </Container>
    </TouchableWithoutFeedback>
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

export default compose(withConnect)(SignInScreen);

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
    justifyContent: center;
    background-color: #F6FBFB;
    padding:20px;
`;

const WrapperForm = styled.View``;

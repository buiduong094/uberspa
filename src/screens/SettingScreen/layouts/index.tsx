
import { View, Switch, StyleSheet } from "react-native";
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';
import { Header } from 'components';
import { User, NotifyReceiveType } from 'models/user';
import { connect } from 'react-redux';
import { ApplicationState } from 'store/configureAction';
import { compose } from 'redux';
import { NextButtonLayout } from 'components';
import { RouteName } from 'constant';
import { ImageSource } from 'assets'
import * as Icon from 'constant/icons';
import { fontFamily } from 'utils/Theme';
import { ActionCreators as ContextActions } from 'store/context';
import alertDefaultTitle from 'utils/alertDefaultTitle';
import { MessageDefine } from 'locales';

import { ActionCreators } from 'screens/UserScreen/store/Reducer';
import { reducer } from 'screens/UserScreen/store/Reducer';
import { InitState } from 'screens/UserScreen/store/InitState';
import { Endpoint } from 'api/endpoint';
interface UIProps {
  user?: User,
  Logout?: Function
}

const Layout = (props: UIProps) => {
  const navigation = useNavigation();

  const [state, dispatch] = React.useReducer(reducer, InitState);

  const [checked, setChecked] = React.useState(false);

  useEffect(() => {
    if (props.user && props.user?.name) {
      if (props.user?.is_notification == NotifyReceiveType.ACTIVE) {
        setChecked(true);
      }
    }
  }, [props.user])

  useEffect(() => {

    if (state.message && state.message != '') {
      alertDefaultTitle.show(state.message, 'Đóng', () => {
        ActionCreators.FIELD_CHANGE(dispatch, 'message', '');
      });
    }

  }, [state.message]);

  const onCheckedChange = () => {
    setChecked(!checked);
    let THONGBAO = checked ? 0 : 1;
    ActionCreators.Update(dispatch, { is_notification: THONGBAO }, true);
  };

  return (
    <Container>
      <Header text='CÁ NHÂN'>
      </Header>
      <InforWrapper>
        <MainInfor>
          <Avatar source={props.user?.avatar ? Endpoint.BASE_URL + "/" + props.user?.avatar : ImageSource.spa} resizeMode="cover" />
          {/* <Avatar source={ImageSource.spa} resizeMode="cover" /> */}
          <CommonInfor>
            <NameStyled>{props.user?.name}</NameStyled>
            <PhoneNumberStyled>{props.user?.phone}</PhoneNumberStyled>
          </CommonInfor>
        </MainInfor>
        <Icon.Tick size={16} />
      </InforWrapper>
      <ScrollWrapper>
        <MainScrollWrapper>
          <NextButtonLayout
            leftIcon={<Icon.User color="#000000" size={18} />}
            text='Thông tin cá nhân'
            haveIconNext={true}
            onPress={() => {
              navigation.navigate(RouteName.USER)
            }} />
          <NextButtonLayout
            leftIcon={<Icon.Code color="#000000" size={18} />}
            text='Mã giảm giá của bạn'
            haveIconNext={true}
            onPress={() => {
              navigation.navigate(RouteName.VOUCHER);
            }} />
          <NotifiToggle>
            <NotifiWrapper>
              <LeftIconStyled><Icon.Establish color="#000000" size={18} /></LeftIconStyled>
              <TextStyled >Nhận thông báo</TextStyled>
            </NotifiWrapper>
            <Switch
            disabled={true}
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={checked ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={onCheckedChange}
              value={true}
           
              
            />
          </NotifiToggle>
          <NextButtonLayout
            leftIcon={<Icon.Sun color="#000000" size={18} />}
            text='Về chúng tôi'
            haveIconNext={true}
            onPress={() => {
            }} />
          <NextButtonLayout
            leftIcon={<Icon.Rule color="#000000" size={18} />}
            text='Điều khoản chính sách'
            haveIconNext={true}
            onPress={() => {
            }} />
          <NextButtonLayout
            leftIcon={<Icon.Friend color="#000000" size={18} />}
            text='Mời bạn bè'
            haveIconNext={true}
            onPress={() => {
            }} />
        </MainScrollWrapper>
        <NextButtonLayout
          leftIcon={<Icon.Logout color="#FF0000" size={18} />}
          text='Đăng xuất'
          textStyle={{ color: '#FF0000' }}
          haveIconNext={false}
          onPress={() => {
            alertDefaultTitle.show(MessageDefine.EXIT_APP, 'Đóng', () => { }, 'Đồng ý', () => {
              if (props.Logout) {
                props.Logout();
              }
            });
          }} />
      </ScrollWrapper>
    </Container >
  );
}
const mapStateToProps = (state: ApplicationState) => ({
  user: state.ContextState.user
})

const mapDispatchToProps = {
  Logout: ContextActions.LogOut
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(Layout);

const Container = styled.View`
  flex: 1;
  width:100%;
  background-color: #F6F6F6;
  height:100%;
`;
const InforWrapper = styled.View`
  marginBottom:15;
  backgroundColor: #FFFF;
  paddingVertical:15;
  paddingHorizontal:15;
  flexDirection:row;
  alignItems:center;
  justifyContent:space-between;`;

const MainInfor = styled.View`
  flexDirection:row;
  alignItems:center;
`;
const CommonInfor = styled.View`
`;
const Avatar = styled.Image`
  margin-right: 10;
  width: 60;
  height: 60;
  borderRadius: 30;
`;
const ScrollWrapper = styled.View`
  flex: 1;
  backgroundColor:#FFFF;
  marginBottom:15;
  justifyContent:space-between;
`;
const MainScrollWrapper = styled.ScrollView`
flex: 1;
`;
const NameStyled = styled.Text`
fontSize:20;
fontFamily: ${fontFamily.semibold}
color:#000000`;
const PhoneNumberStyled = styled.Text`
fontSize:16;
fontFamily: ${fontFamily.semibold};
color:#AFAFAF;
`;

const NotifiToggle = styled.View`
flex-direction:row;
paddingVertical:15;
align-content:center;
align-items:center;
justifyContent:space-between;
border-bottom-width:1;
border-color:#F9F9F9;
paddingHorizontal:15;
`;
const TextStyled = styled.Text`
color: #000000;
fontSize: 16;
fontFamily: ${fontFamily.medium};
marginLeft:5;
`;
const LeftIconStyled = styled.View``;
const NotifiWrapper = styled.View`
flex-direction:row;
align-items:center;
`;
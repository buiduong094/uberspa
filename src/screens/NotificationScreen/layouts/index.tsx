

import React, { useState, useEffect, useReducer } from 'react';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';

import { convertWidth, convertHeight } from 'utils/convertSize';

import { Header, UberItem } from 'components';

import NotifiItem from 'components/NotifiItem';
import { RouteName, UberItemType } from 'constant';
import { reducer, ActionCreators } from '../store/Reducer';
import { InitState } from '../store/InitState';
import { ImageSource } from 'assets';
// import { ActionCreators } from '../store/Reducer';


const Layout = () => {
    const navigation = useNavigation();
    const [state, dispatch] = useReducer(reducer, InitState);
    useEffect(() => {
      ActionCreators.REQUEST_ITEMS(dispatch)
    }, []);
 
    return (
        <Container>
            <Header text='THÔNG BÁO'>
            </Header>
            <ScrollWrapper>
                {
                    state.items.length == 0 &&
                    <NotFoundWrapper>
                        <TextNotFound>Bạn không có thông báo nào!</TextNotFound>
                    </NotFoundWrapper>
                }
                {
                    state.items.length > 0 && state.items?.map((item: any) =>
                        <UberItem
                            uistyle={{ marginBottom: 1, borderRadius: 0 }}
                            item={item}
                            type={UberItemType.NOTIFICATION} />
                    )
                }
            </ScrollWrapper>
        </Container >
    );
}

export default Layout;
const Container = styled.View`
  flex: 1;
  width:100%;
  background-color: #F2F2F2;
  height:100%;
`;

const ScrollWrapper = styled.ScrollView`
  flex: 1;
`;

const NotFoundWrapper = styled.View`
  margin-top: ${convertHeight(50)};
  align-items: center ;
`;

const TextNotFound = styled.Text`
  
  color: #8A8E9C;
  textAlign: center;
  margin-top: ${convertHeight(50)}
`;
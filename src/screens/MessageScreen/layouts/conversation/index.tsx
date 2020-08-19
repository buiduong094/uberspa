import React, { useState, useEffect, useReducer } from 'react';
import styled from 'styled-components/native';
import Header from 'components/Header';
import { useNavigation } from '@react-navigation/native';

import { reducer } from '../../store/Reducer';
import { InitState } from '../../store/InitState';
import { UberItem } from 'components';
import { UberItemType, RouteName } from 'constant';
import { convertHeight } from 'utils/convertSize';
import { ActionCreators } from 'screens/MessageScreen/store/Reducer';
import { ConversationItem } from 'models/conversation';
import { FlatList, ActivityIndicator } from 'react-native';

const Layout = () => {
  const navigation = useNavigation();
  const [state, dispatch] = useReducer(reducer, InitState);

  useEffect(() => {
    ActionCreators.REQUEST_ITEMS(dispatch, 'conversations');
  }, []);
  useEffect(() => {
    console.log('item', state.conversations);
  }, [state.conversations]);

  const goDetail = (item: ConversationItem) => {
    ActionCreators.SelectConversation(dispatch, item);
    navigation.navigate(RouteName.MESSAGE);
  };
  return (
    <Container>
      <Header text="HỘI THOẠI"></Header>
      <ScrollWrapper>
        {state.conversations.length == 0 && (
          <NotFoundWrapper>
            <TextNotFound>Bạn không có cuộc hội thoại nào!</TextNotFound>
          </NotFoundWrapper>
        )}
        {state.loading ? (
          <ActivityIndicator style={{marginTop: 5}}size="small" />
        ) : (
          <FlatList
            data={state.conversations}
            renderItem={({item}) => (
              <UberItem
                uistyle={{marginBottom: 1, borderRadius: 0}}
                item={item}
                type={UberItemType.CHAT}
                onPress={goDetail}
              />
            )}
            keyExtractor={(item) => item.id ?? ''}
            showsHorizontalScrollIndicator={false}
          />
        )}
      </ScrollWrapper>
    </Container>
  );
};
export default Layout;
const Container = styled.View`
    flex: 1;
  width:100%;
  background-color: #F2F2F2;
  height:100%;
`;

const ScrollWrapper = styled.View`
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
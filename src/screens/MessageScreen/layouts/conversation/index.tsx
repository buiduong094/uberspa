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
import { ApplicationState } from 'store/configureAction';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { ActionCreators as ReduxAction } from 'store/context';
interface State {
}
type UIProps = State & typeof ReduxAction;
const Layout = (props: UIProps) => {
  const navigation = useNavigation();
  const [state, dispatch] = useReducer(reducer, InitState);

  useEffect(() => {
    ActionCreators.REQUEST_ITEMS(dispatch, 'conversations');
  }, []);
  useEffect(() => {
    console.warn('item', state.conversations);
  }, [state.conversations]);

  const goDetail = (item: ConversationItem) => {
    props.SelectConversation(item);
    navigation.navigate(RouteName.MESSAGE);
  };

  const  _keyExtractor = (item: ConversationItem, index) => index.toString();
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
            renderItem={({item, index}) => (
              <UberItem
                key={index}
                uistyle={{marginBottom: 1, borderRadius: 0}}
                item={item}
                type={UberItemType.CHAT}
                onPress={goDetail}
              />
            )}
            keyExtractor={_keyExtractor}
            showsHorizontalScrollIndicator={false}
          />
        )}
      </ScrollWrapper>
    </Container>
  );
};

const mapStateToProps = (state: ApplicationState) => ({
})

const mapDispatchToProps = {
  ...ReduxAction
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);
export default compose(withConnect)(Layout as any)
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
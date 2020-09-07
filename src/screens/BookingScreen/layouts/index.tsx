import React, { useState, useEffect, useReducer } from 'react';
import styled from 'styled-components/native';
import { Header, TabList, UberItem, BookingItem } from 'components';
import { reducer, ActionCreators } from '../store/Reducer';
import { InitState } from '../store/InitState';
import { TagItem } from 'models/tag';
import { convertHeight } from 'utils/convertSize';
import { UberItemType } from 'constant';
import Swipeout from 'react-native-swipeout';
import * as Icon from 'constant/icons';
import alertDefaultTitle from 'utils/alertDefaultTitle';
import { MessageDefine } from 'locales';
import { ActivityIndicator } from 'react-native';

type UIProps = {
  navigation?: any;
  style?: any;
};

const Layout = (props: UIProps) => {
  const [state, dispatch] = useReducer(reducer, InitState);
  const { style } = props;

  useEffect(() => {
    ActionCreators.RequestItems(dispatch, 1);
  }, [])

  const onTabItemSelected = (item: TagItem, index: number) => {

    let tabLists = [...(state.tabItems ?? [])];
    tabLists.forEach((s, i) => {
      if (i == index) {
        s.selected = true;
      } else {
        s.selected = false;
      }
    });

    ActionCreators.FieldChange(dispatch, 'tabItems', tabLists);
    ActionCreators.RequestItems(dispatch, Number(item.key));

  };

  let swipeBtns = [

    {
      component: (
        <SwipeWrapper>
          <Icon.Remove color="#FFF" size={20} />
          <DeleteText>HUỶ</DeleteText>
        </SwipeWrapper>
      ),
      backgroundColor: '#FF4F4F',
      onPress: () => {
        alertDefaultTitle.show(MessageDefine.DELETE_BOOKING, 'Đóng', () => { }, 'Đồng ý', () => {
          ActionCreators.CancelBooking(dispatch, state.itemSelected?.id ?? 0)
        });
      }
    },
  ];
  return (
    <Container style={style}>
      <Header text="LỊCH ĐẶT" />
      <Content>
        <TabList
          sources={state.tabItems ?? []}
          onTabItemSelected={onTabItemSelected}
        />
      </Content>
      <ScrollWrapper>
        {state.items.length > 0 &&
          state.items.map((item: any) => (
            item.status == 1 ?
              <Swipeout
                right={swipeBtns}
                autoClose={true}
                backgroundColor="transparent"
                onOpen={() => ActionCreators.SelectItem(dispatch, item)}
              >
                <BookingItem
                  uistyle={{ marginBottom: 1, borderRadius: 0 }}
                  item={item}
                  type={UberItemType.BOOKING}
                />
              </Swipeout> :
              <BookingItem
                uistyle={{ marginBottom: 1, borderRadius: 0 }}
                item={item}
                type={UberItemType.BOOKING}
              />
          ))}
      </ScrollWrapper>
      {
        state.loading &&
        <ActivityIndicator style={{ position: 'absolute', top: '50%', left: '50%' }} size="large" />
      }
    </Container>
  );
};
export default Layout;
const Container = styled.View`
  flex: 1;
`;
const Content = styled.View`
  flex-direction: row;
  background-color: white;
  border-bottom-width: 1;
  border-color: #e8ecef;
`;
const ScrollWrapper = styled.ScrollView`
  flex: 1;
`;

const NotFoundWrapper = styled.View`
  margin-top: ${convertHeight(50)};
  align-items: center;
`;

const TextNotFound = styled.Text`
  color: #8a8e9c;
  text-align: center;
  margin-top: ${convertHeight(50)};
`;
const SwipeWrapper = styled.View`
  flex: 1;
  alignItems: center;
  justifyContent: center;
  flexDirection: column;
`;
const RepairText = styled.Text`
  color: #fff;
  fontSize: 12px;
`;
const DeleteText = styled.Text`
  color: #fff;
  fontSize: 12px;
`;
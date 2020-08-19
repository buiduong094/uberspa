import React, {useState, useEffect, useReducer} from 'react';
import styled from 'styled-components/native';
import {Header, TabList, UberItem} from 'components';
import {reducer, ActionCreators} from '../store/Reducer';
import {InitState} from '../store/InitState';
import {TagItem} from 'models/tag';
import {convertHeight} from 'utils/convertSize';
import {UberItemType} from 'constant';
import Swipeout from 'react-native-swipeout';
import * as Icon from 'constant/icons';
import alertDefaultTitle from 'utils/alertDefaultTitle';
import { MessageDefine } from 'locales';
type UIProps = {
  navigation?: any;
  style?: any;
};

const Layout = (props: UIProps) => {
  const [state, dispatch] = useReducer(reducer, InitState);
  const {style} = props;



  const onTabItemSelected = (item: TagItem, index: number) => {
    let tabLists = [...(state.tabItems ?? [])];
    tabLists.forEach((s, i) => {
      if (i == index) {
        s.selected = item.selected;
      } else {
        s.selected = false;
      }
    });

    ActionCreators.FieldChange(dispatch, 'tabItems', tabLists);
  };

  let swipeBtns = [
    {
      component: (
        <SwipeWrapper>
          <Icon.Pencil color="#FFF" size={20} />
          <RepairText>SỬA</RepairText>
        </SwipeWrapper>
      ),
      backgroundColor: '#68D5FF',
      onPress: () => {
        console.log('Repair Item');
      }, 
    },
    {
      component: (
        <SwipeWrapper>
          <Icon.Remove color="#FFF" size={20} />
          <DeleteText>HUỶ BỎ</DeleteText>
        </SwipeWrapper>
      ),
      backgroundColor: '#FF4F4F',
      onPress: () => {
        alertDefaultTitle.show(MessageDefine.DELETE_BOOKING, 'Đóng', () => { }, 'Đồng ý', () => {
          ActionCreators.DeleteItem(dispatch, state.itemSelected?.id)
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
        {state.items.length == 0 && (
          <NotFoundWrapper>
            <TextNotFound>Bạn không có lịch đặt nào!</TextNotFound>
          </NotFoundWrapper>
        )}
        {state.items.length > 0 &&
          state.items.map((item: any) => (
            <Swipeout
              right={swipeBtns}
              autoClose={true}
              backgroundColor="transparent"
              onOpen={() => ActionCreators.SelectItem(dispatch, item)}
              >
              <UberItem
                uistyle={{marginBottom: 1, borderRadius: 0}}
                item={item}
                type={UberItemType.BOOKING}
              />
            </Swipeout>
          ))}
      </ScrollWrapper>
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
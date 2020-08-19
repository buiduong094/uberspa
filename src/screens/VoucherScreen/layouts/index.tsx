import React, { useState, useEffect, useReducer } from 'react';
import styled from 'styled-components/native';
import { Header, TabList, UberItem } from 'components';
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { ApplicationState } from 'store/configureAction';
import { ActionCreators as ReduxAction } from 'store/cert';
import { RouteName, UberItemType } from 'constant';
import { TagItem } from 'models/tag';
import { reducer, ActionCreators } from '../store/Reducer';
import { InitState } from '../store/InitState';
import { convertHeight } from 'utils/convertSize';
interface UIProps {
    image: any,
    text?: string,
    hasText?: boolean,
    style?: any,
    listItems?: any[]
}
type Props = UIProps & typeof ReduxAction;

const VoucherScreen = (props: Props) => {
    const navigation = useNavigation();
    const [state, dispatch] = useReducer(reducer, InitState);
    useEffect(() => {
        ActionCreators.Loading(dispatch);
    }, [])
    const onTabItemSelected = (item: TagItem, index: number) => {
        let tabLists = [...state.tabItems ?? []];
        tabLists.forEach((s, i) => {
            if (i == index) {
                s.selected = item.selected;
            }
            else {
                s.selected = false;
            }
        })

        ActionCreators.FieldChange(dispatch, 'tabItems', tabLists);
    }

    return (
        <Container>
            <Header
                text='PHIẾU GIẢM GIÁ'
                backColor="#FFF"
                style={{ backgroundColor: '#65DF7B' }}
                titleStyle={{ marginLeft: -30, color: '#FFFF' }}
                navigation={navigation}>
            </Header>
            <Content>
                <TabList
                    sources={state.tabItems ?? []}
                    onTabItemSelected={onTabItemSelected}
                />
            </Content>
            <ScrollWrapper>
                {
                    ((state.tabItems[0].selected && state.itemsNotUsed.length === 0) ||
                    (state.tabItems[1].selected && state.itemsUsed.length === 0)) &&
                    <NotFoundWrapper>
                        <TextNotFound>Bạn không có phiếu giảm giá nào!</TextNotFound>
                    </NotFoundWrapper>
                }
                {
                    state.tabItems[0].selected && state.itemsNotUsed.length > 0 && state.itemsNotUsed?.map((item: any) =>
                        <UberItem
                            uistyle={{ marginBottom: 1, borderRadius: 0 }}
                            item={item}
                            type={UberItemType.VOUCHER} />
                    )
                }
                {
                    state.tabItems[1].selected && state.itemsUsed.length > 0 && state.itemsUsed?.map((item: any) =>
                        <UberItem
                            uistyle={{ marginBottom: 1, borderRadius: 0 }}
                            item={item}
                            type={UberItemType.VOUCHER} />
                    )
                }
            </ScrollWrapper>
        </Container >
    )
}
const mapStateToProps = (state: ApplicationState) => ({

})
const mapDispatchToProps = {

};

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps
);

export default compose(withConnect)(VoucherScreen as any);
const Container = styled.View`
flex:1;
backgroundColor: #FFFF;
`;
const ScrollWrapper = styled.ScrollView`
flex: 1`;
const Content = styled.View`
flex-direction:row;
background-color:white;
border-bottom-width:1;
border-color:#E8ECEF;
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
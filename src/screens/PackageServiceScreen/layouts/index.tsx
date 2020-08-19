import React, { useState, useEffect, useReducer } from 'react';
import styled from 'styled-components/native';
import { Header, SearchInput, UberItem, Button } from 'components';
import { useNavigation } from '@react-navigation/native';
import { reducer } from '../store/Reducer';
import { InitState } from '../store/InitState';
import { UberItemType, RouteName } from 'constant';
import { Dimensions } from 'react-native';
import * as Icon from 'constant/icons';

type UIProps = {

    text?: string,
    hasText?: boolean,
    navigation?: any,
    style?: any,
    children?: any,
    step?: number,
    resetStep?: Function,
}
const Layout = (props: UIProps) => {
    const { style } = props;
    const navigation = useNavigation();
    const [state, dispatch] = useReducer(reducer, InitState);

    return (
        <Container >
            <Header
                text='CHỌN GÓI DỊCH VỤ'
                titleStyle={{ marginLeft: -30 }}
                navigation={navigation}>
            </Header>

            <TextStyled>Quý khách vui lòng chọn gói dịch vụ muốn sử dụng</TextStyled>
            <ScrollWrapper>
                {
                    state.services?.length > 0 && state.services?.map((item) =>
                        <UberItem
                            uistyle={{ marginBottom: 15, }}
                            item={item}
                            type={UberItemType.PACKAGESERVICE}
                        />
                    )
                }
                <Button text='Tiếp tục' uistyle={{ marginTop: 15 }} onPress={() => {
                    navigation.navigate(RouteName.CALENDAR)
                }}></Button>
            </ScrollWrapper>
        </Container>
    )
}
export default Layout;
const Container = styled.View`
flex:1;
backgroundColor: #F2F2F2;
`;
const ScrollWrapper = styled.ScrollView`
padding:15px;
`;
const TextWrapper = styled.View`
marginBottom: 10px
`;
const TextStyled = styled.Text`
marginTop: 10px;
marginLeft: 15px
`;
const SearchBar = styled.View`
flexDirection:row;
alignItems: center;
`;
const IconWrapper = styled.TouchableOpacity`
marginLeft: 10;
`;
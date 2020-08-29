import React, { useState, useEffect, useReducer } from 'react';
import styled from 'styled-components/native';
import { Header, ServiceItem, UberItem, Button } from 'components';
import { useNavigation } from '@react-navigation/native';

import { UberItemType, RouteName } from 'constant';
import { Dimensions } from 'react-native';
import * as Icon from 'constant/icons';
import { ActionCreators as ServiceAction } from 'store/service';
import { ApplicationState } from 'store/configureAction';
import { connect } from 'react-redux';
import { compose } from 'redux';

interface State {

    services?: any[]
}
type UIProps = State & typeof ServiceAction;


const Layout = (props: UIProps) => {

    const navigation = useNavigation();

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
                    props.services && props.services?.map((item) =>
                        <ServiceItem
                            onPress={() => {
                                props.FieldChange('bookService', item);
                            }}
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
const mapStateToProps = (state: ApplicationState) => ({
    services: state.ServiceState.shopServices
})

const mapDispatchToProps = {
    ...ServiceAction
};

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps
);
export default compose(withConnect)(Layout as any)
const Container = styled.View`
flex:1;
backgroundColor: #F2F2F2;
`;
const ScrollWrapper = styled.ScrollView`
padding:15px;
`;

const TextStyled = styled.Text`
marginTop: 10px;
marginLeft: 15px
`;

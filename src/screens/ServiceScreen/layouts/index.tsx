import React, { useState, useEffect, useReducer } from 'react';
import styled from 'styled-components/native';
import { Header, SearchInput, UberItem } from 'components';
import { useNavigation } from '@react-navigation/native';
import { reducer } from '../store/Reducer';
import { InitState } from '../store/InitState';
import { UberItemType, RouteName } from 'constant';
import { Dimensions } from 'react-native';
import * as Icon from 'constant/icons';
import { ActionCreators } from '../store/Reducer';
import { ApplicationState } from 'store/configureAction';
import { connect } from 'react-redux';
import { compose } from 'redux';

type UIProps = {
    searchName?: string,
}
const Layout = (props: UIProps) => {
    const navigation = useNavigation();
    const [state, dispatch] = useReducer(reducer, InitState);

    useEffect(() => {
        if (props.searchName && props.searchName !== '') {
            ActionCreators.FieldChange(dispatch, 'name', props.searchName);
            onSearch();
        }
    }, [])

    const onChangeText = (value: string) => {
        ActionCreators.FieldChange(dispatch, 'name', value);
    }

    const onSearch = () => {
        ActionCreators.QueryShop(dispatch, state.searchBody ?? {});
    }

    return (
        <Container >
            <Header navigation={navigation} >
                <SearchBar>
                    <SearchInput
                        placeHolder="Tìm kiếm cơ sở, dịch vụ"
                        style={{ width: Dimensions.get('screen').width - 140 }}
                        value={state.searchBody?.name}
                        onTextChange={onChangeText}
                        onSubmitEditing={onSearch}
                    />
                    <IconWrapper onPress={() => {
                        navigation.navigate(RouteName.BOOKING)
                    }}>
                        <Icon.Map size={18} color="#000000" />
                    </IconWrapper>
                    <IconWrapper onPress={() => {
                        // navigation.navigate(RouteName.BOOKING)
                    }}>
                        <Icon.ViewMode size={18} color="#000000" />
                    </IconWrapper>
                </SearchBar>
            </Header>
            <ScrollWrapper>
                {
                    state.services?.length > 0 && state.services?.map((item) =>
                        <UberItem
                            uistyle={{ marginBottom: 15 }}
                            item={item}
                            type={UberItemType.SERVICE}
                            onPress={() => {

                                navigation.navigate(RouteName.PACKAGESERVICE);
                            }}
                        />
                    )
                }
                {
                    state.services.length == 0 && state.commited &&
                    <NotFoundWrapper>
                        <TextNotFound>Không tìm thấy kết quả nào!</TextNotFound>
                    </NotFoundWrapper>
                }
            </ScrollWrapper>

        </Container>
    )
}
const mapStateToProps = (state: ApplicationState) => ({
    searchName: state.ContextState.searchName,
})
const mapDispatchToProps = {

};

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps
);

export default compose(withConnect)(Layout as any);

const Container = styled.View`
flex:1;
`;
const ScrollWrapper = styled.ScrollView`
padding:15px;

`;

const SearchBar = styled.View`
flexDirection:row;
alignItems: center;
`;
const IconWrapper = styled.TouchableOpacity`
marginLeft: 10;
`;
const NotFoundWrapper = styled.View`
  justifyContent:center;
  align-items: center;
`;

const TextNotFound = styled.Text`
  color: #8A8E9C;
  textAlign: center;
  margin-top: ${50}
`;
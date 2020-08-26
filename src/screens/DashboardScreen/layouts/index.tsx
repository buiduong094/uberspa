import React, { useState, useEffect, useReducer } from 'react';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { ApplicationState } from 'store/configureAction';
import { ActionCreators as ContextActions } from 'store/context';
import { User } from 'models/user';
import { LoginButton, Welcome, SearchInput, UberItem, ImageButton } from 'components';
import { MessageDefine } from 'locales';
import { useNavigation } from '@react-navigation/native';
import { RouteName, UberItemType } from 'constant';
import FastImage from 'react-native-fast-image';
import Swiper from 'react-native-swiper';
import { reducer } from '../store/Reducer';
import { InitState } from '../store/InitState';
import { ActionCreators } from '../store/Reducer';
import { ImageSource } from 'assets'
import { Dimensions, TouchableOpacity } from 'react-native';
import { fontFamily } from 'utils/Theme';
import clientPermision from 'utils/clientPermission';
import DeviceInfo from "react-native-device-info";
import Geolocation from '@react-native-community/geolocation';
import alertDefaultTitle from 'utils/alertDefaultTitle';
import { ActionCreators as ServiceAction } from 'store/service';
interface State {


}
type UIProps = State & typeof ServiceAction;
const Layout = (props: UIProps) => {
    const navigation = useNavigation();
    const [state, dispatch] = useReducer(reducer, InitState);

    useEffect(() => {
        ActionCreators.GET_CAROUSEL(dispatch);
        props.Services();
        // DeviceInfo.isLocationEnabled().then((enabled: boolean) => {
        //     if (!enabled) {
        //         alertDefaultTitle.show(MessageDefine.REQUIRE_OPEN_GPS, "Đồng ý")
        //         return false;
        //     } else {
        //         clientPermision.GeoLocation().then(geoPermission => {
        //             if (geoPermission) {
        //                 CurrentLocation();
        //             }
        //         });
        //     }
        // })
        ActionCreators.REQUEST_NEAR_BY_SERVICES(dispatch, 0, 0);
    }, [])

    const CurrentLocation = async () => {
        Geolocation.getCurrentPosition(
            (position) => {
                ActionCreators.REQUEST_NEAR_BY_SERVICES(dispatch, position.coords.longitude, position.coords.latitude);
            },
            (error) => {
            },
            { enableHighAccuracy: false, timeout: 15000, }
        );
    }

    const onChangeText = (value: string) => {
        ContextActions.FieldChange('searchName', value);
    }

    const navigateSearch = () => {
        navigation.navigate(RouteName.SERVICE);
    }

    const width = Dimensions.get('window').width - 60;
    return (
        <Container >
            <Welcome>
                <SearchInput
                    placeHolder="Tìm kiếm cơ sở, dịch vụ"
                    onTextChange={onChangeText}
                    onSubmitEditing={navigateSearch}></SearchInput>
            </Welcome>
            <ScrollWrapper showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                <SlideWrapper>
                    <Swiper height={180} autoplay={true} showsButtons={false}>
                        {
                            state.slides?.map((item, index) => (
                                <TouchStyled>
                                    <FastImage
                                        resizeMode='cover'
                                        style={{
                                            height: 180,

                                        }} source={{ uri: item }} ></FastImage>

                                </TouchStyled>
                            ))
                        }
                    </Swiper>
                </SlideWrapper>

                <WrapperStyled>
                    <FlexStyled>
                        <Title>Danh sách dịch vụ</Title>
                        <TouchableOpacity onPress={() => {
                            navigation.navigate(RouteName.SERVICE)
                        }}>
                            <ViewMoreTitle >xem thêm</ViewMoreTitle>
                        </TouchableOpacity>
                    </FlexStyled>

                    <ServiceStyled >
                        <ImageButton onPress={() => {

                        }} height={220} width={width / 3} source={ImageSource.clinic} ></ImageButton>
                        <WrapperStyled style={{ marginLeft: 10 }}>
                            <ImageButton onPress={() => {

                            }} height={100} width={((width / 3) * 2) + 10} source={ImageSource.spa} ></ImageButton>
                            <WrapperStyled style={{ flexDirection: 'row', marginTop: 15 }}>
                                <ImageButton onPress={() => {

                                }} height={100} width={width / 3} source={ImageSource.nail} containerStyle={{ marginRight: 15 }} ></ImageButton>
                                <ImageButton onPress={() => {

                                }} height={100} width={width / 3} source={ImageSource.salon} ></ImageButton>
                            </WrapperStyled>
                        </WrapperStyled>
                    </ServiceStyled>

                </WrapperStyled>



                <LoginButton
                    uistyle={{ marginVertical: 20, alignSelf: 'center', width: 130 }}
                    textstyle={{ fontSize: 16 }}
                    text='ĐẶT NGAY'
                    onPress={() => {
                        navigation.navigate(RouteName.BOOKING);
                    }}></LoginButton>


                <WrapperStyled>
                    <FlexStyled>
                        <Title>Dịch vụ gần đây</Title>
                        <TouchableOpacity onPress={() => {
                            navigation.navigate(RouteName.SERVICE)
                        }}>
                            <ViewMoreTitle >xem thêm</ViewMoreTitle>
                        </TouchableOpacity>
                    </FlexStyled>
                    <ServiceWrapper>
                        {
                            state.nearByservices?.length > 0 && state.nearByservices?.map((item) =>
                                <UberItem
                                    uistyle={{ marginBottom: 15 }}
                                    item={item}
                                    onPress={(r) => {
                                        props.ServiceByShop(item);
                                        navigation.navigate(RouteName.PACKAGESERVICE);
                                    }}
                                    type={UberItemType.SERVICE} />
                            )
                        }
                    </ServiceWrapper>
                </WrapperStyled>
            </ScrollWrapper>
        </Container>
    )
}

const mapStateToProps = (state: ApplicationState) => ({

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
flex: 1;
width:100%;
background-color: #F2F2F2;
height:100%;
`;
const Title = styled.Text`
margin:15px;
fontSize:18px;
color: #000000;
fontFamily: ${fontFamily.bold}
`;
const ViewMoreTitle = styled.Text`
margin:15px;
fontSize:14px;
color: #4A4A4A;
fontFamily: ${fontFamily.medium}
`;

const SlideWrapper = styled.View`
marginHorizontal:15px;
height:180px`;
const TouchStyled = styled.TouchableOpacity`
borderRadius:10px;
overflow: hidden;
`;
const WrapperStyled = styled.View``;
const BookingBaner = styled.View`
height:85px;
backgroundColor:#65DF7B20;
borderRadius:10px;
marginHorizontal:15px;
`;
const FlexStyled = styled.View`
flex-direction:row;
justifyContent:space-between;
`;
const ScrollWrapper = styled.ScrollView``;
const ServiceStyled = styled.View`
marginHorizontal:15px;
flex-direction:row;
`;


const ServiceWrapper = styled.View`
marginHorizontal:15px;
`;
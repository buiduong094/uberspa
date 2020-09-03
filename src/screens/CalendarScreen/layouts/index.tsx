import * as React from 'react';
import { StyleSheet, View, Platform } from "react-native";
import MapboxGL from "@react-native-mapbox-gl/maps";
import { useEffect } from 'react';
import styled from 'styled-components/native';
import Header from 'components/Header';
import { useNavigation } from '@react-navigation/native';

import clientPermision from 'utils/clientPermission';
import { ActionCreators, reducer, InitState } from '../store';
import Geolocation from '@react-native-community/geolocation';

import ModalComponent from 'components/Modal';
import CircleState from 'components/CircleState';
import { TimeStage } from 'models/calendar';
import TextArea from 'components/TextArea';
import { TimeLine, Button, TextInputUI, ServiceItem, UberItem } from 'components';
import * as Icon from 'constant/icons';
import alertDefaultTitle from 'utils/alertDefaultTitle';
import DateUI from 'components/DateUI';

import { ActionCreators as ServiceAction } from 'store/service';
import { ApplicationState } from 'store/configureAction';
import { connect } from 'react-redux';
import { compose } from 'redux';
import ReadOnlyText from 'components/ReadOnlyText';
import { DialogMessage, MessageType } from 'models/message';
import LoadingSpine from 'components/LoadingSpine';
import { RouteName, UberItemType } from 'constant';
import { fontFamily } from 'utils/Theme';
interface State {
    message?: DialogMessage,
    shop?: any,
}
type UIProps = State & typeof ServiceAction;

const Layout = (props: UIProps) => {
    const [state, dispatch] = React.useReducer(reducer, InitState)
    const navigation = useNavigation();
    useEffect(() => {
        props.Loading();
        ActionCreators.Loading(dispatch);
    }, [])
    useEffect(() => {
        if (props.message && props.message.display) {
            if (props.message.type != MessageType.Loading) {
                if (props.message.type == MessageType.Success) {
                    alertDefaultTitle.show(props.message?.message ? props.message.message : 'Đặt chỗ thành công vui lòng kiếm trả trong Lịch đặt', 'OK');
                }
                else {
                    alertDefaultTitle.show(props.message?.message ? props.message.message : 'Đặt chỗ thất bại, vui lòng liên hệ quản trị', 'OK');
                }
            }
        }
    }, [props.message])

    const RenderTimeLine = () => {
        let calendars = new Array<any>();
        const length = state.timeLine?.length ?? 0;
        for (let i = 0; i < length; i = i + 4) {
            let j = i;
            const cells = state.timeLine?.slice(i, i + 4);
            calendars.push(
                <Row>
                    {
                        cells?.map((item, index) => (
                            <TimeLine item={item} index={(index + j)} onPress={() => {
                                ActionCreators.TimeChoice(dispatch, item, state);
                            }} />
                        ))
                    }
                </Row>
            )
        }
        return calendars;

    }

    const Stars = () => {
        const stars = new Array<any>();
        for (let i = 0; i < 5; i++) {
            let color = '#E0E0E0';
            if (props.shop?.rating && i < props.shop?.rating) {
                color = '#F5A623';
            }
            stars.push(
                <Icon.Star size={10} color={color} />)
        }
        return stars;
    }

    return (

        <Container>
            <Header text='Chọn thời gian' navigation={navigation} >
            </Header>
            <ScrollWrapper showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                <Wrapper>
                    <TextTitle>Thông tin shop</TextTitle>
                </Wrapper>
                <Wrapper>
                    <BtnStyle onPress={() => {
                        navigation.navigate(RouteName.PREMESIE);
                    }}>
                        <ImageStyled source={{ uri: props.shop?.logo ?? 'https://benhvienthucuc.vn/wp-content/themes/benh-vien-thu-cuc-vn/assets/images/sec12_1.png' }} />
                        <ContentShop>
                            <TextStyled>{props.shop?.name}</TextStyled>
                            <SubTitleStyled numberOfLines={2}>{props.shop?.address}</SubTitleStyled>
                            <Row>
                                <StarWrapper>
                                    {
                                        Stars()
                                    }
                                </StarWrapper>
                                <StarTitleStyled>{props.shop?.star}</StarTitleStyled>
                            </Row>
                        </ContentShop>
                    </BtnStyle>
                </Wrapper>
                <Wrapper>
                    <TextTitle>Dịch vụ đã chọn:</TextTitle>
                </Wrapper>
                <TextTitle>{state.note}</TextTitle>
                <DateWrapper horizontal showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} >
                    {
                        state.calender?.map((item) => (
                            <DateUI onPress={() => {
                                ActionCreators.DateChoice(dispatch, item, state);
                            }} item={item}  ></DateUI>
                        ))
                    }
                </DateWrapper>

                <TextTitle>Giờ sử dụng</TextTitle>
                {
                    RenderTimeLine()
                }
                <Wrapper>
                    <CircleState state={TimeStage.Locked} title='Đã đặt'></CircleState>
                    <CircleState style={{ marginLeft: 15 }} state={TimeStage.Available} title='Còn trống'></CircleState>
                </Wrapper>
                <Wrapper>
                    <CircleState state={TimeStage.Choosing} title='Đang chọn'></CircleState>

                </Wrapper>


                <TextArea numberOfline={5} uistyle={{ marginTop: 15 }} placeholder='Ghi chú đặt lịch' onTextChange={(description: string) => {
                    ActionCreators.FieldChange(dispatch, 'description', description)
                }} />
                <ReadOnlyText uistyle={{ marginTop: 15 }} text='Thanh toán tại cơ sở' title='Phương thức thanh toán' ></ReadOnlyText>

                <TextWrapper>
                    <TextTitle>Mã giảm giá</TextTitle>
                    <CouponStyled style={{ marginTop: 10, flex: 1 }}>
                        <TextInputUI
                            placeholder="Mã giảm giá"
                            uistyle={{ flex: 1 }}
                            textValue={state.coupon}
                            contentstyle={{ borderRadius: 5 }}
                            leftIcon={<Icon.Code size={25} color="#C2C2C2" />}
                            type="text"
                            keyboardType="default"
                            onChangeText={(coupon) => {
                                ActionCreators.FieldChange(dispatch, 'coupon', coupon)
                            }}
                        />
                        <ButtonStyled onPress={() => {
                            if (state.coupon) {
                                props.CouponValid(state.coupon)
                            }
                        }}>
                            <TextTitle style={{ color: 'white', textAlign: 'center', alignSelf: 'center' }}>Áp dụng</TextTitle>
                        </ButtonStyled>
                    </CouponStyled>
                </TextWrapper>


                <Button uistyle={{ marginHorizontal: 0, marginVertical: 20 }} text='Hoàn tất' onPress={() => {
                    if (state.timeSelected && state.dateSelected) {
                        props.Booking(state.dateSelected, state.timeSelected, state.coupon, state.description);
                    }
                    else {
                        alertDefaultTitle.show('Chưa chọn thời gian', 'Đóng');
                    }
                }}></Button>
            </ScrollWrapper>

            {
                (props.message?.display && props.message.type == MessageType.Loading) &&
                <LoadingSpine />
            }

        </Container>
    );
}
const mapStateToProps = (state: ApplicationState) => ({
    shop: state.ServiceState.shop,
    message: state.ServiceState.message
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

  width:100%;
  background-color:white;
  height:100%;
`;

const BtnStyle = styled.TouchableOpacity`
justifyContent:space-between;
align-content:center;
align-items:center;
paddingHorizontal:15;
paddingVertical:15;
flex-direction: row
`;

const ScrollWrapper = styled.ScrollView`

  padding:20px;
`;
const TextTitle = styled.Text`
`;

const Row = styled.View`
flex-direction:row;
`;
const Wrapper = styled.View`
flex:1;
flex-direction:row;

marginTop:15px;
`;
const DateWrapper = styled.ScrollView`
marginVertical:15px;

`;
const TextWrapper = styled.View`
marginTop:15px;
justifyContent:center;
`;
const CouponStyled = styled.View`
alignItems:center;
flex-direction:row;
justifyContent:space-between;`;
const ButtonStyled = styled.TouchableOpacity`
marginLeft:15px;
padding:5px;
alignContent:center;
alignItems:center;
background: #65DF7B;
borderRadius:5px;
 height:48px;
 justifyContent:center;
`;
const ImageStyled = styled.Image`
width: 80;
height: 80;
backgroundColor: #FFF;
marginBottom: 10
`;
const StarWrapper = styled.View`
flex-direction:row;
alignItems:center;
`;
const StarTitleStyled = styled.Text`
fontSize:12px;
fontFamily: ${fontFamily.regular};
color:#9B9B9B;
`;
const ContentShop = styled.View`
flex-direction: column;
marginLeft: 10;
align-content:center;
`;
const SubTitleStyled = styled.Text`
fontSize:14px;
fontFamily: ${fontFamily.regular};
flexWrap: wrap;
color:#9B9B9B;`;
const TextStyled = styled.Text`
color:#000000;
fontSize:16;
width: 200px;
marginBottom:5px;
fontFamily: ${fontFamily.semibold}
`;

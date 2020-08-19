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
import { TimeLine, Button, TextInputUI } from 'components';
import * as Icon from 'constant/icons';
import alertDefaultTitle from 'utils/alertDefaultTitle';
import DateUI from 'components/DateUI';
interface UIProps {

}


const Layout = (props: UIProps) => {
    const [state, dispatch] = React.useReducer(reducer, InitState)
    const navigation = useNavigation();
    useEffect(() => {
        ActionCreators.Loading(dispatch);

    }, [])

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
                                let cloneTimeLine = state.timeLine?.slice() ?? [];
                                let selectItem = cloneTimeLine[index + i];
                                if (selectItem.stage == TimeStage.Available) {
                                    selectItem.stage = TimeStage.Choosing;
                                }
                                else if (selectItem.stage == TimeStage.Locked) {

                                }
                                else {
                                    selectItem.stage = TimeStage.Available;
                                }

                                ActionCreators.FieldChange(dispatch, 'timeLine', cloneTimeLine);

                            }} />
                        ))

                    }
                </Row>
            )
        }
        return calendars;

    }


    return (

        <Container>
            <Header text='Chọn thời gian' navigation={navigation} >
            </Header>
            <ScrollWrapper showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                <Wrapper>
                    <TextTitle>Dịch vụ đã chọn:</TextTitle>
                </Wrapper>
                <TextTitle>{state.note}</TextTitle>
                <DateWrapper horizontal showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} >
                    {
                        state.calender?.map((item) => (
                            <DateUI onPress={() => {

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


                <TextArea numberOfline={5} uistyle={{ marginTop: 15 }} placeholder='Ghi chú đặt lịch' onTextChange={() => { }} />
                <TextWrapper>
                    <TextTitle>Phương thức thanh toán</TextTitle>

                    <TextInputUI
                    uistyle={{marginTop:10}}
                        placeholder="Phương thức thanh toán "
                        contentstyle={{ borderRadius: 5 }}
                        type="text"
                        keyboardType="default"
                        onChangeText={() => {

                        }}
                    />
                </TextWrapper>
                <TextWrapper>
                    <TextTitle>Mã giảm giá</TextTitle>
                    <TextInputUI
                        placeholder="Mã giảm giá"
                        uistyle={{marginTop:10}}
                        contentstyle={{ borderRadius: 5 }}
                        leftIcon={<Icon.Code size={25} color="#C2C2C2" />}
                        type="text"
                        keyboardType="default"
                        onChangeText={() => {

                        }}
                    />
                </TextWrapper>

                <Button uistyle={{ marginHorizontal: 0, marginVertical: 20 }} text='Hoàn tất' onPress={() => alert('Thành công')}></Button>
            </ScrollWrapper>

        </Container>
    );
}
export default Layout;

const Container = styled.View`

  width:100%;
  background-color:white;
  height:100%;
`;


const ScrollWrapper = styled.ScrollView`

  padding:20px;
`;
const TextTitle = styled.Text`
`;

const Row = styled.View`
flex-direction:row;
marginTop:15px;
justifyContent:space-between;
`;
const Wrapper = styled.View`
flex-direction:row;
marginTop:15px;
`;
const DateWrapper = styled.ScrollView`
marginVertical:15px;

`;
const TextWrapper = styled.View`
marginTop:15px;
`;

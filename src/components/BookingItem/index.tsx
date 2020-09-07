import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';

import { View } from 'react-native';
import { fontFamily } from 'utils/Theme';

import { UberItemType } from 'constant';
import { TagItem } from "models/tag";

import FastImage from 'react-native-fast-image';
import { Endpoint } from 'api/endpoint';
interface UIProps {
    onPress?: Function,
    onRightPress?: Function, // bấm vào 1 icon action bên phải
    uistyle?: any,
    type: UberItemType,
    item?: any,
    childs?: Array<TagItem>,
    isExpand?: boolean, // icon acion bên phải có được expand chưa?
    selected?: boolean,
    onChildPress?: Function
}

const BookingItem = (props: UIProps) => {
    const { onPress, onRightPress, uistyle, type, item, childs, isExpand, selected, onChildPress } = props;

    const convertTime = (time) => {
        let date = new Date(time )
        console.warn(date);
        let hours = date.getHours()
        let minutes = "0" + date.getMinutes()
        return hours + ':' + minutes.substr(-2)
    }
    const Logo = () => {
        if (props.item?.shop_info?.logo)
            return Endpoint.BASE_URL + props.item?.shop_info?.logo;
        return 'https://benhvienthucuc.vn/wp-content/themes/benh-vien-thu-cuc-vn/assets/images/sec12_1.png'
    }
    console.warn('item', item.shop_info)
    return (
        <Container style={uistyle}>
            <MainContainer onPress={() => {
                if (onPress) { onPress(item) }
            }}>
                <Wrapper>
                    <FastImage
                        resizeMode='cover'
                        style={{
                            height: 56, width: 56,

                        }} source={{ uri: Logo() }} ></FastImage>


                    <Content>
                        <View style={{ flex: 1 }}>

                            <TextStyled>{item?.shop_info?.name}</TextStyled>

                            <SubTitleStyled>{item?.shop_info?.name}</SubTitleStyled>
                            {
                                item?.reason !== null &&

                                <SubTitleStyled>{item?.reason}</SubTitleStyled>
                            }
                            <TimeStyled>{item?.time_booking_in}</TimeStyled>
                        </View>
                    </Content>
                </Wrapper>
            </MainContainer>

        </Container >
    )
}
export default BookingItem;
const Container = styled.View`
flex:1;
backgroundColor:white;
borderRadius:10px;
`;
const MainContainer = styled.TouchableOpacity`
justify-content:space-between;
align-content:center;
align-items:center;
paddingHorizontal:15;
paddingVertical:15;
`;

const TextStyled = styled.Text`
color:#000000;
fontSize:16;
width: 200px;
marginBottom:5px;
fontFamily: ${fontFamily.semibold}
`;
const SubTitleStyled = styled.Text`
fontSize:14px;
fontFamily: ${fontFamily.regular};
flexWrap: wrap;
color:#FF0077;`;

const Wrapper = styled.View`
flex-direction:row;
alignItems:center;
`;
const ImageStyled = styled.Image`
`;
const Content = styled.View`
marginLeft:10px;
flex-direction:row;
justifyContent: space-between;
flex:1;
`;


const TimeStyled = styled.Text`
marginTop:5px;
fontSize:14px;
fontFamily: ${fontFamily.medium};
color:#68D5FF;
`;


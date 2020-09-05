import React, { useState, useEffect } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { TimeStage, CalendarTime } from 'models/calendar';

export interface UIProps {
    onPress: Function,
    item?: CalendarTime,
    index?: number


}


const TimeLine = (props: UIProps) => {
    const BackgroundColorStyled = () => {

        if (props.item?.stage == TimeStage.Locked) {
            return '#FF4F4F20'
        }
        else if (props.item?.stage == TimeStage.Choosing) {
            return '#65DF7B20';
        }
        else {
            return 'white'
        }
    }
    const ColorStyled = () => {

        if (props.item?.stage == TimeStage.Locked) {
            return '#FF4F4F'
        }
        else if (props.item?.stage == TimeStage.Choosing) {
            return '#65DF7B';
        }
        else {
            return '#D8D8D8'
        }
    }
    const TextColorStyled = () => {

        if (props.item?.stage == TimeStage.Locked) {
            return '#FF4F4F'
        }
        else if (props.item?.stage == TimeStage.Choosing) {
            return '#65DF7B';
        }
        else {
            return '#9B9B9B'
        }
    }
    return (
        <Container style={{ backgroundColor: BackgroundColorStyled(), borderColor: ColorStyled(), margin: 5 }} onPress={() => {
            if (props.onPress) {
                props.onPress(props.item, props.index)
            }
        }}>
            <TextStyled style={{ color: TextColorStyled() }}>{props.item?.title}</TextStyled>
        </Container>
    )
}
export default TimeLine;

const Container = styled.TouchableOpacity`
padding:10px;
borderRadius:20px;
width:80px;
borderWidth:1.5px;
`;

const TextStyled = styled.Text`
fontSize: 12;
`;
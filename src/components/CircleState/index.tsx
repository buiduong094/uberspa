import React, { useState, useEffect } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import styled from 'styled-components/native';

import { TimeStage } from 'models/calendar';
export interface UIProps {
    state: TimeStage,
    title: string,
    style?: any


}


const CircleState = (props: UIProps) => {
    const ColorStyled = () => {

        if (props.state == TimeStage.Locked) {
            return '#FF4F4F'
        }
        else if (props.state == TimeStage.Choosing) {
            return '#65DF7B';

        }
        else {
            return '#9B9B9B'
        }
    }
    return (
        <Container style={props.style} >
            <Circle style={{ backgroundColor: ColorStyled() }} />
            <TextStyled style={{ color: ColorStyled() }}>{props.title}</TextStyled>
        </Container >
    )
}
export default CircleState;

const Container = styled.View`
flex-direction:row;
alignItems:center;
`;
const Circle = styled.View`
backgroundColor:red;
marginRight:5px;
height:15px;
width:15px;
borderRadius:8px;`;
const TextStyled = styled.Text`
fontSize: 14;
`;
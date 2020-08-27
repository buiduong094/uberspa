import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import * as Icon from 'constant/icons';
import { convertWidth, convertHeight } from 'utils/convertSize';
export interface UIProps {
    onPress?: Function,
    type?: number, // type =1 :camera, type = 2: record
    uistyle?: any,
    showTitle?: boolean,
    title?: string
}
const MediaButton = (props: UIProps) => {
    const { onPress, uistyle, type, showTitle, title } = props;
    return (
        <Container style={uistyle} onPress={() => { if (props.onPress) { props.onPress(); } }}>
            {
                type == 1 &&
                <Icon.Camera color='#3CAA6D' size={(40)} />
            }
            {
                type == 2 &&
                <Icon.Voice color='#3CAA6D' size={(40)} />
            }
            {
                showTitle &&
                <Title>{title}</Title>
            }
        </Container>
    )
}
export default MediaButton;
const Container = styled.TouchableOpacity`
border-width:1;
height: ${(80)};
border-color:#F1F5F8;
background-color: #F1F5F8;
align-items:center;
border-radius:5;
justify-content:center;
`;

const Title = styled.Text`
color:#778CA2;
margin-top: ${convertHeight(5)};
`;
import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { fontFamily } from 'utils/Theme';

interface UIProps {
    onPress: Function,
    children?: any,
    uistyle?: any,
    text: string,
    textstyle?: any
}

const LoginButton = (props: UIProps) => {
    const { children, onPress, uistyle } = props;
    return (
        <Container style={uistyle} onPress={() => { onPress(); }}>
            <TextStyled style={props.textstyle}>{props.text}</TextStyled>
        </Container>
    )
}
export default LoginButton;
const Container = styled.TouchableOpacity`

background-color:#65DF7B;
align-items:center;
border-radius:23;
height:46;
justify-content:center;
`;
const TextStyled = styled.Text`
color:white;
fontSize:16px;
fontFamily: ${fontFamily.bold}
`;
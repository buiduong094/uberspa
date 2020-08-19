import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { ButtonUIProps } from './type';

const Button = (props: ButtonUIProps) => {
    const { children, onPress, uistyle, text } = props;
    return (
        <Container style={uistyle} onPress={() => { onPress(); }}>
            {text ? <StyledText>{text}</StyledText> : children}
        </Container>
    )
}
export default Button;
const Container = styled.TouchableOpacity`
align-items:center;
border-radius:23;
height:48;
justify-content:center;
background: #65DF7B;
marginHorizontal: 15px;
`;
const StyledText = styled.Text`
color: #FFF;
font-weight: bold;
text-transform: uppercase
`;
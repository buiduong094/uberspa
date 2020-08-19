import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import * as Icon from 'constant/icons';
import { fontFamily } from 'utils/Theme';
interface UIProps {
    onPress?: Function,
    children?: any,
    uistyle?: any,
    textStyle?: any,
    text?: string,
    haveIconNext?: boolean
    leftIcon?: any
}

const NextButtonLayout = (props: UIProps) => {
    const { children, onPress, uistyle, haveIconNext, textStyle, leftIcon } = props;
    return (
        <Container style={uistyle} onPress={() => { if (onPress) onPress(); }}>
            <Wrapper>
                <IconStyled>
                    {/* <Icon.User size={18} color={haveIconNext? '#000000': '#FF0000'}></Icon.User> */}
                    {leftIcon && <LeftIconStyled>
                        {leftIcon}
                    </LeftIconStyled> 
                    }
                </IconStyled>
                <TextStyled style={textStyle}>{props.text}</TextStyled>
            </Wrapper>
            {
                haveIconNext &&
                <Icon.ArrowRight color='#000000' size={14}></Icon.ArrowRight>
            }
        </Container>
    )
}
export default NextButtonLayout;

const Container = styled.TouchableOpacity`
flex-direction:row;
paddingVertical:15;
align-content:center;
align-items:center;
justifyContent:space-between;
border-bottom-width:1;
border-color:#F9F9F9;
paddingHorizontal:15;
`;
const Wrapper = styled.View`
flex-direction:row;
align-items:center;
`;
const LeftIconStyled = styled.View``;
const IconStyled = styled.View`
marginRight:5`;
const TextStyled = styled.Text`
color: #000000;
fontSize: 16;
fontFamily: ${fontFamily.medium}
`;
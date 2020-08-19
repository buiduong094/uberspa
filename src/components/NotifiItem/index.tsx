import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import * as Icon from 'constant/icons';
import { convertWidth, convertHeight } from 'utils/convertSize';
interface UIProps 
    {
        id: string,
        content: string,
        time: string,
        readed: boolean,
        onPress: Function,
        uiStyle?: any
    }
const NotifiItem = (props: UIProps) => {
    const { id, content, time, readed, onPress, uiStyle } = props;

    return (
        <Container style={[uiStyle,{backgroundColor: readed? 'white': '#E9F6FE'}]} onPress={() => onPress()} >
            <BorderNotiItem>
                <Icon.Notifi size={convertWidth(14)} color="#E0471D" />
            </BorderNotiItem>
            <Wrapper>
                <ContentStyled numberOfLines={3}>{content}</ContentStyled>
                <TimeStyled>{time}</TimeStyled>
            </Wrapper>
        </Container>
    )
}
export default NotifiItem;
const Container = styled.TouchableOpacity`
    flexDirection:row;
    justifyContent:space-between;
    align-items:center;
    borderBottomWidth:1px;
    borderColor:#E8ECEF;
    paddingVertical:${convertHeight(15)};
    padding-left: ${convertWidth(15)};
    padding-right: ${convertWidth(15)};
`;
const Wrapper = styled.View`
    flex:1
`;

const BorderNotiItem = styled.View`
    background-color: #E7D3D1;
    height: ${convertHeight(30)};
    width: ${convertHeight(30)};
    border-radius:${convertHeight(15)};
    margin-right: ${convertWidth(15)};
    justifyContent:center;
    align-items:center;
`;
const ContentStyled = styled.Text`
    
    color:#39434C;
   
    font-weight: 500;
`;
const TimeStyled = styled.Text`
   
    color:#9CA1A5;
    marginTop: ${convertHeight(3)};
    
`;
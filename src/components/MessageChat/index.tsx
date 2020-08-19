import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { fontFamily } from 'utils/Theme';
import { Message } from 'models/message';
import { Dimensions, Image, ImageBase } from 'react-native';
import * as Icon from 'constant/icons';
import { ImageSource } from 'assets';
interface UIProps {
    children?: any,
    uistyle?: any,
    isMyMessage: boolean,
    showAvatar?: boolean
    item: Message,
    onDownloadFile?: Function,
    onViewImage?: Function,
    onPress?: Function,
}

const MessageItem = (props: UIProps) => {
    const { children, onPress, uistyle, isMyMessage, item } = props;

    let date = new Date(item.created ?? new Date().toDateString());

    return (
        <Container style={uistyle}>
            {
                isMyMessage == true ?
                    <MyMessageWrapper>
                        <TimeStyled>{('0' + date.getHours()).substr(-2) + ":" + ('0' + date.getMinutes()).substr(-2)}</TimeStyled>
                        <MyMessage>
                            <MyMessageText>{item.text}</MyMessageText>
                        </MyMessage>
                    </MyMessageWrapper>
                    :
                    <PartnerMessageWrapper>
                        <TimeStyled>{('0' + date.getHours()).substr(-2) + ":" + ('0' + date.getMinutes()).substr(-2)}</TimeStyled>
                        <PartnerMessage>
                            <PartnerMessageText>{item.text}</PartnerMessageText>
                        </PartnerMessage>
                    </PartnerMessageWrapper>
            }
        </Container>


    )
}
export default MessageItem;
const Container = styled.View`

`;
const TimeStyled = styled.Text`
color:#9B9B9B;
fontSize:14px;
fontFamily: ${fontFamily.regular};
textAlign:right;
marginBottom: 5;
`;
const MyMessageWrapper = styled.View`
alignSelf: flex-end;
alignItems: flex-end;
maxWidth:70%;
`;
const MyMessage = styled.View`
alignContent: flex-end;
backgroundColor: #F6F6F6;
paddingVertical:10;
paddingHorizontal:15;
borderRadius:10;
alignSelf: flex-end;
`;
const PartnerMessageWrapper = styled.View`
alignSelf: flex-start;
alignContent: flex-start;
alignItems: flex-start;
maxWidth:70%;
`;
const PartnerMessage = styled.View`
alignSelf: flex-start;
alignContent: flex-start;
alignItems: flex-start;
paddingVertical:10;
paddingHorizontal:15;
borderRadius:10;
backgroundColor:#65DF7B;
`;
const MyMessageText = styled.Text`
fontSize:16;
fontFamily: ${fontFamily.regular};
color: #000000;
`;
const PartnerMessageText = styled.Text`
fontSize:16;
fontFamily: ${fontFamily.regular};
color: #FFFF;
`;
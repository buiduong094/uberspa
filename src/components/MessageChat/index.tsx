import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { fontFamily } from 'utils/Theme';
import { Message, FileItem } from 'models/message';
import { Dimensions, Image, ImageBase } from 'react-native';
import * as Icon from 'constant/icons';
import { ImageSource } from 'assets';
import VideoList from 'components/VideoList';
interface UIProps {
    children?: any,
    uistyle?: any,
    isMyMessage: boolean,
    item: Message,
    onDownloadFile?: Function,
    onViewImage?: Function,
    onPress?: Function,
}

const MessageItem = (props: UIProps) => {
    const { children, onPress, uistyle, isMyMessage, item } = props;

    let date = new Date(item.time ?? new Date().toDateString());

    // const formarDate = (date: Date) => {
    //     let result = '';
    //     result = ('0' + date.getHours()).substr(-2) + ":" + ('0' + date.getMinutes()).substr(-2);
    //     return result
    // }

    const formarDate = (time) => {
        let date = new Date(time * 1000)
        let hours = date.getHours()
        let minutes = "0" + date.getMinutes()
        return hours + ':' + minutes.substr(-2)
    }

    const DEFAULT_WIDTH_IMAGE = 250;

    const getSizeImage = (url: string) => {
        Image.getSize(url,
            (success: number) => {
                let ratio = success / DEFAULT_WIDTH_IMAGE;
                let heightImage = DEFAULT_WIDTH_IMAGE;
                heightImage = DEFAULT_WIDTH_IMAGE * ratio;
                return heightImage;
            },
            (error) => { })
        return DEFAULT_WIDTH_IMAGE;
    }
    // const getSizeImage = (url: string) => {
    //     Image.getSize(url, (width, height) => {
    //         let ratio = height / width;
    //         let heightImage = DEFAULT_WIDTH_IMAGE;
    //         heightImage = DEFAULT_WIDTH_IMAGE * ratio;
    //         console.warn('het', heightImage)
    //         return heightImage

    //     }, (err)=>{

    //     });
    // }

    const renderFile = (file: FileItem): JSX.Element => {
        if (file.image_url && file.image_url !== "") {
            return (
                <Image
                    source={{ uri: file.image_url }}
                    height={getSizeImage(file.image_url ?? "")}
                    width={100}
                    style={{
                        height: getSizeImage(file.image_url ?? ""),
                        width: DEFAULT_WIDTH_IMAGE,
                        marginTop: 5,
                        borderRadius: 5
                    }}
                />
            )
        } else if (file.video_url && file.video_url !== "") {
            let sources = new Array<string>();
            sources.push(file.video_url);
            return (
                <VideoList
                    containerStyle={{ marginTop: 10 }}
                    sources={sources ?? []} />
            )
        }
        return <></>
    }

    return (
        <Container style={uistyle}>
            {
                isMyMessage == true ?
                    <MyMessageWrapper>
                        <TimeStyled>{formarDate(date)}</TimeStyled>
                        <MyMessage>
                            <MyMessageText>{item.text}</MyMessageText>
                            {
                                (item.files ?? [])?.length > 0 && item.files?.map((file: FileItem, index: number) => (
                                    renderFile(file)
                                ))
                            }
                        </MyMessage>
                    </MyMessageWrapper>
                    :
                    <PartnerMessageWrapper>
                        <TimeStyled>{formarDate(date)}</TimeStyled>
                        <PartnerMessage>
                            <PartnerMessageText>{item.text}</PartnerMessageText>
                            {
                                (item.files ?? [])?.length > 0 && item.files?.map((file: FileItem, index: number) => (
                                    renderFile(file)
                                ))
                            }
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
const ImageWrapper = styled.Image`
`
import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import * as Icon from 'constant/icons';

import MediaButton from 'components/MediaButton';
import { FormMode } from 'models/form';
import { Image } from 'react-native';
import ModalComponent from 'components/Modal';
import { CameraItem } from 'components/Camera/PhotoSelect';

export interface UIProps {
    sources?: Array<CameraItem>,

    style?: any,
    allowHiddeCamera?: boolean,
    onPress?: Function,
    onRemove?: Function,
    onSelected?: Function,
    title?: string,
    hideEdit?: boolean,
    containerStyle?: any,
    formMode?: FormMode
}


const ImageScroll = (props: UIProps) => {
    const [preview, setPreview] = useState('');
    const [showPreview, setShowPreview] = useState(false);
    const sources = [...props.sources ?? []];

    return (
        <Container style={props.containerStyle}>
            {
                props.title && <HeaderStyled>{props.title}</HeaderStyled>
            }
            <ScrollWrapper
                style={props.style}
                horizontal
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}>
                {
                    sources.length > 0 && sources?.map((source, index) =>
                        <Wrapper
                            style={{
                                width: source.url.includes('mp4') ? 200 : 80,
                                height: source.url.includes('mp4') ? 200 : 80,
                            }}
                            key={index} onPress={() => {
                                let originSource = source.url.replace('&width=80&height=80', '');
                                if (source.url.includes('mp4')) {
                                    originSource = source.url.replace('&width=200&height=200', '')
                                }
                                setShowPreview(true);
                                setPreview(originSource)

                            }}>
                            <ImageStyled style={{

                                width: source.url.includes('mp4') ? 200 : 80,
                                height: source.url.includes('mp4') ? 200 : 80,

                            }} source={{
                                uri: source.url,
                            }}

                            />
                            {
                                props.formMode != FormMode.Detail &&
                                <ButtonRemove onPress={() => {
                                    if (props.onRemove) {
                                        props.onRemove(index);
                                    }
                                }}>
                                    <Icon.Close color='#778CA2'></Icon.Close>
                                </ButtonRemove>
                            }
                        </Wrapper>
                    )
                }
                {
                    props.formMode != FormMode.Detail &&
                    <MediaButton uistyle={{ width: 80, height: 80 }} type={1} onPress={() => {

                        if (props.onPress) {
                            props.onPress()
                        }
                    }}></MediaButton>
                }
            </ScrollWrapper>
            {
                showPreview &&

                <ModalComponent height='100%' display={showPreview} setVisibleModel={() => {
                    setShowPreview(false);
                }}>
                    <Image style={{ height: '100%', width: '100%', resizeMode: 'contain' }} source={{
                        uri: preview
                    }}>

                    </Image>
                    <CloseStyled onPress={() => {
                        setShowPreview(false);
                    }}>
                        <Icon.Remove color='#314559' size={18} />
                    </CloseStyled>
                </ModalComponent>
            }
        </Container>
    )
}
export default ImageScroll;
const Container = styled.View`
height:120;
`;
const HeaderStyled = styled.Text``;
const Wrapper = styled.TouchableOpacity`
marginRight:10px;
borderRadius: 5px;
overflow: hidden;`;
const ButtonRemove = styled.TouchableOpacity`
position:absolute;
right:10;
top:10;
backgroundColor:#EBEFF5;
borderRadius:10px;
alignItems: center;
justifyContent:center;
width:20px;
height:20px;
`;
const ImageStyled = styled.Image``;
const ScrollWrapper = styled.ScrollView`
marginVertical:10px;
`;

const CloseStyled = styled.TouchableOpacity`
left:20;
top:50;
position:absolute;
padding: 5px;
borderRadius: 20;
backgroundColor:#F1F5F8`;
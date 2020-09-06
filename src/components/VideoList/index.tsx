import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import * as Icon from 'constant/icons';

import { FormMode } from 'models/form';
import { Image, View } from 'react-native';
import ModalComponent from 'components/Modal';
import { WebView } from 'react-native-webview';
import Video from 'react-native-video';
export interface UIProps {
    sources?: Array<string>,
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


const VideoList = (props: UIProps) => {
    const [preview, setPreview] = useState('');
    const [showPreview, setShowPreview] = useState(false);

    const sources = [...props.sources ?? []];
    let player: Video;

    console.warn('props.formMode', props.formMode)

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
                        <>
                            {
                                source && source.includes('mp4') &&
                                <Wrapper
                                    style={{
                                        width: 200,
                                        height: 200,
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                    key={index} onPress={() => {
                                        let originSource = source;
                                        setShowPreview(true);
                                        setPreview(originSource)
                                    }}>
                                    {/* <WebView
                                        allowFileAccess={true}
                                        allowFileAccessFromFileURLs={true}
                                        style={{ height: 200, width: 200 }}
                                        source={{uri: source ?? undefined}}
                                        mediaPlaybackRequiresUserAction={true}
                                        // onLoad={updateSource}
                                        domStorageEnabled
                                        startInLoadingState={true}
                                        originWhitelist={[`*`]}
                                    /> */}
                                    {
                                        source.includes("http") || source.includes("https") ?
                                            <Icon.Recorder size={120} color="#FFFF" />
                                            :
                                            <Video
                                                style={{ height: 200, width: 200 }}
                                                paused={false}
                                                muted={true}
                                                resizeMode="cover"
                                                onProgress={(payload) => {
                                                }}
                                                onEnd={() => {
                                                }}
                                                onLoad={(payload) => {
                                                }}
                                                source={{
                                                    uri: source
                                                }}
                                                ref={(ref: Video) => {
                                                    player = ref;
                                                }} />
                                    }
                                    {
                                        props.formMode && props.formMode != FormMode.Detail &&
                                        <ButtonRemove onPress={() => {
                                            if (props.onRemove) {
                                                props.onRemove(index);
                                            }
                                        }}>
                                            <Icon.Close color='#778CA2'></Icon.Close>
                                        </ButtonRemove>
                                    }
                                </Wrapper>
                            }
                        </>
                    )
                }

            </ScrollWrapper>
            {
                showPreview &&
                <ModalComponent
                    height='100%'
                    display={showPreview}
                    setVisibleModel={() => {
                        setShowPreview(false);
                    }}>
                    {
                        preview.includes('mp4') &&
                        <Wrapper style={{
                            width: '100%',
                            height: '100%'
                        }}>
                            {
                                preview.includes("http") || preview.includes("https") ?
                                    <WebView
                                        allowFileAccess={true}
                                        allowFileAccessFromFileURLs={true}
                                        style={{ height: '100%', width: '100%' }}
                                        source={{
                                            uri: preview,
                                        }}
                                        mediaPlaybackRequiresUserAction={false}
                                        // onLoad={updateSource}
                                        domStorageEnabled
                                        startInLoadingState={true}
                                        originWhitelist={[`*`]}
                                    />
                                    :
                                    <Video
                                        style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }}
                                        fullscreen={true}
                                        resizeMode="contain"
                                        onProgress={(payload) => {
                                        }}
                                        onEnd={() => {
                                        }}
                                        onLoad={(payload) => {
                                        }}
                                        source={{
                                            uri: preview,
                                        }}
                                        ref={(ref: Video) => {
                                        }} />

                            }
                        </Wrapper>
                    }
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
export default VideoList;
const Container = styled.View`
height:240;
`;
const HeaderStyled = styled.Text``;
const Wrapper = styled.TouchableOpacity`
marginRight:10px;
borderRadius: 5px;
width: 200;
backgroundColor:#848484;
height: 200;

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


import React, { useState, useEffect, useReducer } from 'react';
import styled from 'styled-components/native';
import { RNCamera } from 'react-native-camera';
import { Dimensions, Text, View } from 'react-native';
import * as Icon from 'constant/icons';

import CaptureSVG from 'assets/images/capture.svg';
import { FlatList } from 'react-native-gesture-handler';
import { reducer, ActionCreators } from './store/Reducer';
import { InitState } from './store/InitState';



interface PhotoSelect {
    selected?: boolean;
    timespan?: Date,
    fileName?: string
}
interface UIProps {
    type?: number,
    onCature?: Function,
    onSelectImages?: Function,
    onClose?: Function
}
let cameraRef: RNCamera;

const Camera = (props: UIProps) => {
    const [state, dispatch] = useReducer(reducer, InitState);
    const { width, height } = Dimensions.get('screen');


    useEffect(() => {

        ActionCreators.Loading(dispatch);
        ActionCreators.Gallery(dispatch, 1);
    }, [])
    const onCapture = async () => {
        const data = await cameraRef.takePictureAsync();

        if (props.onCature) {
            props.onCature(data.uri);
        }
    }
    const onSend = async () => {
        let sources = [...state.imageSources ?? []];
        const imageSelected = sources.filter(e => e.selected);
        const imageSources = imageSelected.map(e=>{
            return e.node?.node.image.uri;
        })
        console.log('source',imageSources);
        if (props.onSelectImages) {
            props.onSelectImages(imageSources)
        }

    }
    const onChangeSelectedImage = (item: PhotoSelect) => {
        let sources = [...state.imageSources ?? []];
        const photo = sources.find(e => e.fileName == item.fileName);
        if (photo) {
            photo.selected = photo.selected ? !photo.selected : true;
            if (photo.selected) {
                photo.timespan = new Date();
            }
            ActionCreators.FieldChange(dispatch, 'imageSources', sources);
        }


    }

    const onShowCamera = (hiden: boolean) => {
        ActionCreators.FieldChange(dispatch, 'showCamera', hiden);
        if (hiden) {

            ActionCreators.Gallery(dispatch, 1);
        }
    }
    var _keyExtractor = (item: any, index: any) => index.toString();

    return (
        <Container>
            {
                state.showCamera ?
                    <Wrapper>
                        <RNCamera
                        
                            style={{
                                flex: 1,
                                width: width,
                                height: height,
                            }}
                            ref={(ref: RNCamera) => {
                                cameraRef = ref;
                            }}

                            type={RNCamera.Constants.Type.front}

                            androidCameraPermissionOptions={{
                                title: 'Permission to use camera',
                                message: 'We need your permission to use your camera',
                                buttonPositive: 'Ok',
                                buttonNegative: 'Cancel',
                            }}
                            androidRecordAudioPermissionOptions={{
                                title: 'Permission to use audio recording',
                                message: 'We need your permission to use your audio',
                                buttonPositive: 'Ok',
                                buttonNegative: 'Cancel',
                            }}
                            captureAudio={false}
                        />
                        <HeaderStyled>
                            <CloseButton onPress={() => {
                                if (props.onClose) {
                                    props.onClose()
                                }
                            }}>
                                <Icon.Close size={27} color='white' ></Icon.Close>
                            </CloseButton>
                            <LightFlashButton style={{}} onPress={() => {

                            }}>
                                <Icon.LightFlash size={27} color='white' ></Icon.LightFlash>
                            </LightFlashButton>
                        </HeaderStyled>
                        <ButtonGallery onPress={() => {
                            onShowCamera(false);
                        }}>
                            <ImageStyled style={{
                                width: 56,
                                height: 56,
                            }} source={{ uri: state.imagePreview }} />
                        </ButtonGallery>

                        <ButtonStyled onPress={() => {
                            onCapture();
                        }}>
                            <CaptureSVG width={56} height={56}></CaptureSVG>
                        </ButtonStyled>
                    </Wrapper> :
                    <Wrapper style={{
                        flex: 1,
                        width: width,
                        height: height,
                    }}>
                        <Content>
                            <HeaderGallery>
                                <HeaderButton onPress={() => {
                                    onShowCamera(true);
                                }}>
                                    <Icon.ArrowDown color='white'></Icon.ArrowDown>
                                </HeaderButton>
                            </HeaderGallery>
                            <FlatList
                                numColumns={4}
                                onEndReachedThreshold={1}
                                data={state.imageSources}
                                keyExtractor={_keyExtractor}
                                renderItem={({ item }) =>

                                    <HeaderButton style={{ borderWidth: 0.5, borderColor: item.selected ? '#3478F5' : 'black' }} onPress={() => {
                                        onChangeSelectedImage(item);
                                    }}>
                                        <ImageStyled style={{
                                            width: width / 4,
                                            height: width / 4,
                                        }} source={{ uri: item.node?.node.image.uri }} />
                                        {
                                            item.selected &&

                                            <CountCricle>
                                                <Icon.Checked color='white'></Icon.Checked>
                                            </CountCricle>
                                        }
                                    </HeaderButton>
                                }
                            />

                        </Content>
                        <ButtonSend onPress={() => {
                            onSend();
                        }}>
                            <Icon.Send color='#3478F5' size={27}></Icon.Send>
                        </ButtonSend>
                    </Wrapper>
            }
        </Container>
    )
}
export default Camera;

const Container = styled.View`
position:absolute;
flex:1;

`;
const ButtonStyled = styled.TouchableOpacity`
position:absolute;
alignSelf:center;
bottom:0;
marginBottom:100;
`;
const HeaderStyled = styled.View`
flex:1;
width:100%;
flexDirection:row;
position:absolute;
marginTop:64px;
justifyContent:space-between;`;

const CloseButton = styled.TouchableOpacity`
marginLeft:20px;
`;
const LightFlashButton = styled.TouchableOpacity`
marginRight:20px;`;
const HeaderButton = styled.TouchableOpacity`

`;
const ButtonGallery = styled.TouchableOpacity`
borderWidth:1;
borderColor:white;
borderRadius:5;
position:absolute;
bottom:0;
marginLeft:20px;
width:60px;
height:60px;
marginBottom:100;`;
const Wrapper = styled.View`
flex:1;
`;
const Content = styled.View`
flex:1;
backgroundColor:#cdcdcd;
`;
const ImageStyled = styled.Image``;
const HeaderGallery = styled.View`
height:80px;
backgroundColor:#3CAA6D;
paddingTop:40;
paddingLeft:20;
`;
const ButtonSend = styled.TouchableOpacity`
alignSelf:flex-end;
position:absolute;
bottom:100;
right:30;
`;
const CountCricle = styled.View`
 borderRadius:10px;
width:20px;
height:20px;
position: absolute;
right: 10;
top: 10;
backgroundColor:#3478F5;
alignItems:center;
justifyContent:center;
`;

import React, { useState, useEffect, useReducer } from 'react';
import styled from 'styled-components/native';
import { RNCamera } from 'react-native-camera';
import { Dimensions, Text, View, Platform } from 'react-native';
import * as Icon from 'constant/icons';
import CameraRoll, { PhotoIdentifier, SaveToCameraRollOptions } from "@react-native-community/cameraroll";
import CaptureSVG from 'assets/images/capture.svg';
import SwitchCameraSVG from 'assets/images/switchCamera.svg';
import FlashOff from 'assets/images/flashOff.svg';
import { FlatList } from 'react-native-gesture-handler';
import { reducer, ActionCreators } from './store/Reducer';
import { InitState } from './store/InitState';
import RNFetchBlob from 'rn-fetch-blob';
import clientPermision from 'utils/clientPermission';
import { CameraItem } from './PhotoSelect';
// import { CameraItem } from '../PhotoSelect';

interface PhotoSelect {
    selected?: boolean;
    node?: PhotoIdentifier;
    timespan?: Date,
    fileName?: string
}
interface UIProps {
    type?: number,
    onCature?: Function,
    onSelectImages?: Function,
    onClose?: Function,
    
}
let cameraRef: RNCamera;

const Camera = (props: UIProps) => {
    const [state, dispatch] = useReducer(reducer, InitState);
    const { width, height } = Dimensions.get('screen');
   

    useEffect(() => {
        if (Platform.OS == 'android') {
            clientPermision.Camera().then(permissionCamera => {
                if (permissionCamera) {
                    clientPermision.AccessStorage().then(permissionStorage => {
                        checkPermission(permissionStorage);
                        if (permissionStorage) {
                            ActionCreators.FieldChange(dispatch, 'loading', false);
                            ActionCreators.Loading(dispatch);
                            ActionCreators.Gallery(dispatch, 1, props.type ?? 1);
                        }
                    })
                } else {
                    checkPermission(permissionCamera);
                }
            });
        }
        else {
            ActionCreators.FieldChange(dispatch, 'loading', false);
            ActionCreators.Gallery(dispatch, 1, props.type ?? 1);
        }


    }, [])

    const checkPermission = (grant) => {
        if (grant) {
            ActionCreators.FieldChange(dispatch, 'grantPermission', true);
        } else {
            ActionCreators.FieldChange(dispatch, 'grantPermission', false);
            if (props.onClose) {
                props.onClose()
            }
            return;
        }
    }

    const onCapture = () => {
        let pathStorage = RNFetchBlob.fs.dirs.DCIMDir;
        cameraRef.takePictureAsync().then((data) => {
            const specFilename = data.uri.lastIndexOf("/");
            let fileName = data.uri.substr(specFilename + 1, data.uri.length);
            CameraRoll.save(data.uri, { type: 'photo', album: pathStorage }).then(res => {
                if (props.onCature) {
                    let item: CameraItem = {
                        isImage: true,
                        url: "file://" + RNFetchBlob.fs.dirs.PictureDir + pathStorage + "/" + fileName
                    };
                    // props.onCature("file://" + RNFetchBlob.fs.dirs.PictureDir + pathStorage + "/" + fileName)
                    props.onCature(item);
                }
            }).catch(err => { console.warn('err', err) })

        }).catch((er) => {

        })
    }
    const onSend = async () => {
        let sources = [...state.imageSources ?? []];
        const imageSelected = sources.filter(e => e.selected);
        const imageSources = imageSelected.map(e => {
            let item: CameraItem = {
                isImage: e.node?.node.image.playableDuration ? false : true,
                url: e.node?.node.image.uri??''
            };
            return item;
            //return e.node?.node.image.uri;
        })

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

            ActionCreators.Gallery(dispatch, 1,props.type);
        }
    }
    var _keyExtractor = (item: any, index: any) => index.toString();

    return (
        <Container>
            {
                state.showCamera ?
                    <Wrapper>

                        {
                            !state.loading &&

                            <RNCamera

                                style={{
                                    flex: 1,
                                    width: width,
                                    height: height,
                                }}
                                ref={(ref: RNCamera) => {
                                    cameraRef = ref;
                                }}
                                flashMode={state.flash ? 'on' : 'off'}
                                type={state.front ? RNCamera.Constants.Type.front : RNCamera.Constants.Type.back}

                                captureAudio={false}
                            />
                        }
                        
                        <HeaderStyled>
                            <CloseButton onPress={() => {
                                if (props.onClose) {
                                    props.onClose()
                                }
                            }}>
                                <Icon.Close size={27} color='white' ></Icon.Close>
                            </CloseButton>

                            <LightFlashButton style={{}} onPress={() => {
                                const flashMode = state.flash;
                                if (ActionCreators.FieldChange)
                                    ActionCreators.FieldChange(dispatch, 'flash', !flashMode);
                            }}>
                                {
                                    state.flash ? <Icon.LightFlash size={27} color='white' ></Icon.LightFlash> :
                                        <FlashOff />
                                }

                            </LightFlashButton>

                        </HeaderStyled>
                        <CameraActionStyled>
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
                            <SwitchCamera style={{}} onPress={() => {

                                const frontMode = state.front;
                                if (ActionCreators.FieldChange)
                                    ActionCreators.FieldChange(dispatch, 'front', !frontMode);
                            }}>

                                {/* <Icon.Switch size={27} color='white' ></Icon.Switch> */}
                                <SwitchCameraSVG width={16} height={16}></SwitchCameraSVG>

                            </SwitchCamera>
                        </CameraActionStyled>


                    </Wrapper>
                    :
                    <Wrapper style={{
                        flex: 1,
                        width: width,
                        height: height,
                    }}>
                        <Content>
                            <HeaderGallery>

                                <GalleryStyled>
                                    Gallery
                                </GalleryStyled>
                                <HeaderButton style={{ position: 'absolute', paddingTop: 40, left: 20, }} onPress={() => {
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
                                onEndReached={() => {
                                    ActionCreators.Gallery(dispatch, state.page ?? 1,props.type);
                                }}
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
                                                {/* <Icon.Checked color='white'></Icon.Checked> */}
                                            </CountCricle>
                                        }
                                    </HeaderButton>
                                }
                            />

                        </Content>
                        <ButtonSend onPress={() => {
                            onSend();
                        }}>
                            <Icon.Send color='white' size={30}></Icon.Send>
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
marginLeft:20px;
width:60px;
height:60px;
`;
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
alignContent:center;
`;
const ButtonSend = styled.TouchableOpacity`
alignSelf:flex-end;
position:absolute;
backgroundColor:#3CAA6D;
borderRadius:30;
height:60;
width:60;
bottom:100;
alignItems:center;
justifyContent:center;
right:30;
`;
const CountCricle = styled.View`
 borderRadius:10px;
width:20px;
height:20px;
position: absolute;
right: 10;
top: 10;
backgroundColor:#3CAA6D;
alignItems:center;
justifyContent:center;
borderWidth:1.5;
borderColor:#FFFF;
`;
const SwitchCamera = styled.TouchableOpacity`
marginLeft:20px;`;
const CameraActionStyled = styled.View`
flex-direction:row;
position:absolute;
bottom:100;
alignItems:center;
justifyContent:space-between;

right:20;
left:0;


`;
const GalleryStyled = styled.Text`
textAlign:center;
color:white;
fontSize: 16;
`;
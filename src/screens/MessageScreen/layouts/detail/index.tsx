import React, { useState, useEffect, useReducer, useRef } from 'react';
import styled from 'styled-components/native';
import Header from 'components/Header';
import { useNavigation } from '@react-navigation/native';
import * as Icon from 'constant/icons';
import { reducer } from '../../store/Reducer';
import { InitState } from '../../store/InitState';
import { UberItem, MessageItem, TextInputUI, ModalUI, Camera } from 'components';
import { UberItemType } from 'constant';
import { ActionCreators } from 'screens/MessageScreen/store/Reducer';
import { Message, GetChatEnum, MessageTypeEnum } from 'models/message';
import { Dimensions, KeyboardAvoidingView, Platform, Keyboard, FlatList, View, ActivityIndicator } from 'react-native';
import { User } from 'models/user';
import { ApplicationState } from 'store/configureAction';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { ConversationItem } from 'models/conversation';
import { CameraItem } from 'components/Camera/PhotoSelect';
import ImageScroll from 'components/ImageScroll';
import { FormMode } from 'models/form';

interface UIProps {
    user?: User,
    conversationSelected?: ConversationItem
}
const Layout = (props: UIProps) => {
    const navigation = useNavigation();
    const [state, dispatch] = useReducer(reducer, InitState);
    const flatListRef = useRef<FlatList | null>(null);
    useEffect(() => {
        if (state.isSent) {
            ActionCreators.ChangeText(dispatch, '')
        }
    }, [state.isSent]);

    useEffect(() => {
        ActionCreators.REQUEST_ITEMS(dispatch, GetChatEnum.MESSAGES, state.timeFrom, state.pageSize, props.conversationSelected?.to_id);
    }, []);

    const sendMessage = () => {
        const message: Message = {
            text: state.message,
            to_id: props.conversationSelected?.to_id,
        }
        Keyboard.dismiss();
        if (state.message && state.message != null) {
            ActionCreators.SendMessage(dispatch, MessageTypeEnum.TEXT, message, state.images);
        }
        goIndex()
    }

    const goIndex = () => {
        flatListRef.current?.scrollToIndex({ animated: true, index: 0 });
    };

    /**
     * Chọn ảnh
     * @param sources 
     */
    const onCameraImageChange = (sources: CameraItem[]) => {
        let cloneImages = [...state.images ?? [], ...sources];
        ActionCreators.FIELD_CHANGE(dispatch, 'images', cloneImages);
        ActionCreators.FIELD_CHANGE(dispatch, 'showCamera', false);
    }

    console.warn('images', state.images)

    /**
     * Chụp ảnh
     * @param sources 
     */
    const onCameraTakeImage = (sources: any) => {
        // const images = state.warning ? state.warning['IMG_NOIDUNGBAOCAO'] : [];
        // const cloneImages = [...images ?? [], sources];
        // ActionCreators.FIELD_CHANGE(dispatch, 'warning.IMG_NOIDUNGBAOCAO', cloneImages);
        ActionCreators.FIELD_CHANGE(dispatch, 'showCamera', false);
    }

    let _keyExtractor = (item: any, index: any) => index.toString();

    const _renderItem = ({ item, index }) => (
        <MessageItem
            uistyle={{ marginTop: 10, marginBottom: 20 }}
            isMyMessage={item?.from_id == props.user?.id ? true : false}
            item={item}
        />
    )
    const viewabilityConfig = {
        minimumViewTime: 500,
        viewAreaCoveragePercentThreshold: 150,
    }

    const onEndReach = () => {
        // if (!state.onEndReachedCalledDuringMomentum) {
        if (state.canLoadMore) {
            ActionCreators.FIELD_CHANGE(dispatch, 'onEndReachedCalledDuringMomentum', false);
            ActionCreators.REQUEST_ITEMS(dispatch, GetChatEnum.MESSAGES, state.timeFrom, state.pageSize, props.conversationSelected?.to_id);
        }
        // }
    }

    const ShowModal = () => {
        return (
            <ModalUI height={'auto'} display={state.showModal ? state.showModal : false} setVisibleModel={() => { }}>
                <ContentWrapper>
                    <WrapperStyled>
                        <RemoveIcon
                            onPress={() => ActionCreators.ShowModal(dispatch, false)}>
                            <Icon.Remove size={20} color="#FFF" />
                        </RemoveIcon>
                        <TitleStyled>Nội dung và công cụ</TitleStyled>
                    </WrapperStyled>
                    <WrapperModal
                        onPress={() => {
                            ActionCreators.FIELD_CHANGE(dispatch, 'showModal', false);
                            ActionCreators.FIELD_CHANGE(dispatch, 'showCamera', true);
                            // ActionCreators.FIELD_CHANGE(dispatch, 'images', []);
                        }}>
                        <WrapImage>
                            <Icon.Image size={25} color="#FFF" />
                        </WrapImage>
                        <WrapText>
                            <TextTitle>Ảnh</TextTitle>
                            <TextContent>Chia sẻ ảnh</TextContent>
                        </WrapText>
                    </WrapperModal>
                    <WrapperModal
                        onPress={() => {
                            ActionCreators.FIELD_CHANGE(dispatch, 'showModal', false);
                            ActionCreators.FIELD_CHANGE(dispatch, 'showVideo', true);
                            // ActionCreators.FIELD_CHANGE(dispatch, 'images', []);
                        }}>
                        <WrapImage>
                            <Icon.Video size={25} color="#FFF" />
                        </WrapImage>
                        <WrapText>
                            <TextTitle>Video</TextTitle>
                            <TextContent>Chia sẻ video</TextContent>
                        </WrapText>
                    </WrapperModal>
                    <WrapperModal
                        onPress={() => { }}>
                        <WrapImage>
                            <Icon.File size={25} color="#FFF" />
                        </WrapImage>
                        <WrapText>
                            <TextTitle>Tệp</TextTitle>
                            <TextContent>Chia sẻ tệp</TextContent>
                        </WrapText>
                    </WrapperModal>
                </ContentWrapper>
            </ModalUI>
        )
    }

    return (
        <KeyboardAvoidingView
            style={{ flex: 1, justifyContent: 'flex-end' }}
            behavior={Platform.OS == "ios" ? "padding" : undefined}
        >
            <Container>
                <Header
                    text={props.conversationSelected?.name ?? "Chi tiết trò chuyện"}
                    leftIcon={props.conversationSelected?.avatar}
                    titleStyle={{ marginLeft: -30 }}
                    navigation={navigation}>
                </Header>
                {state.loading && (
                    <ActivityIndicator style={{ marginTop: 5 }} size="small" />
                )}
                <FlatList
                    ref={flatListRef}
                    keyExtractor={_keyExtractor}
                    inverted
                    style={{ paddingHorizontal: 15 }}
                    viewabilityConfig={viewabilityConfig}
                    onEndReachedThreshold={0.5}
                    onMomentumScrollBegin={() => { ActionCreators.FIELD_CHANGE(dispatch, 'onEndReachedCalledDuringMomentum', false); }}
                    data={state.messageItems}
                    renderItem={_renderItem}
                    onEndReached={onEndReach}
                />
                <View>
                    {
                        state.images && (state.images ?? []).length > 0 &&
                        <ImageScroll
                            formMode={FormMode.AddNew}
                            onRemove={(index: number) => {
                                const cloneImages = [...state.images ?? []];
                                cloneImages.splice(index, 1);

                                ActionCreators.FIELD_CHANGE(dispatch, 'images', cloneImages);
                            }}
                            onPress={() => {
                                ActionCreators.FIELD_CHANGE(dispatch, 'showCamera', true);
                            }}
                            sources={state.images}
                        />
                    }
                    <InputMessage>
                        <WrapPlus onPress={() => {
                            ActionCreators.ShowModal(dispatch, true)
                        }}>
                            <Icon.Plus size={25} color="#AFAFAF" />
                        </WrapPlus>
                        <TextInputUI
                            placeholder="Nội dung trò chuyện"
                            uistyle={{ flex: 1 }}
                            contentstyle={{ borderWidth: 0 }}
                            type="text"
                            keyboardType="default"
                            onChangeText={(message) => {
                                ActionCreators.ChangeText(dispatch, message)
                            }}
                            textValue={state.message}
                        />
                        <SendIcon onPress={sendMessage}>
                            <Icon.Send size={26} color="#65DF7B"></Icon.Send>
                        </SendIcon>
                    </InputMessage>
                </View>
                {ShowModal()}
                {
                    state.showCamera &&
                    <Camera
                        type={1}
                        onClose={() => {
                            ActionCreators.FIELD_CHANGE(dispatch, 'showCamera', false);
                        }}
                        onCature={onCameraTakeImage}
                        onSelectImages={onCameraImageChange}
                    ></Camera>
                }
                {
                    state.showVideo &&
                    <Camera
                        type={2}
                        onClose={() => {
                            ActionCreators.FIELD_CHANGE(dispatch, 'showCamera', false);
                        }}
                        onCature={onCameraTakeImage}
                        onSelectImages={onCameraImageChange}
                    ></Camera>
                }
            </Container >
        </KeyboardAvoidingView >
    );
}

const mapStateToProps = (state: ApplicationState) => ({
    user: state.ContextState.user,
    conversationSelected: state.ContextState.conversationItem
})

const mapDispatchToProps = {
};

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps
);
export default compose(withConnect)(Layout as any)
const Container = styled.View`
  flex: 1;
  width:100%;
  background-color: white;
  height:100%;
`;

const InputMessage = styled.View`
flexDirection:row;
alignItems: center;
backgroundColor: #F8F8F8;
paddingVertical:6;
paddingHorizontal:10;
justifyContent:space-between;
`;
const SendIcon = styled.TouchableOpacity`
paddingVertical:5;
paddingHorizontal:5;
`;
const WrapPlus = styled.TouchableOpacity`
paddingRight:10;
`;
const WrapperModal = styled.TouchableOpacity`
width: 100%;
flexDirection: row;
marginVertical: 10;
marginHorizontal: 10;
alignItems: center;
`;
const WrapImage = styled.View`
backgroundColor: #2d3748;
justifyContent: center;
paddingVertical: 10;
paddingHorizontal: 10;
marginBottom: 10;
borderRadius: 10;
`;
const WrapText = styled.View`
width: 80%;
marginLeft: 10;
borderBottomColor: #2d3748;
borderBottomWidth: 1;
`;
const TextTitle = styled.Text`
color: #FFF;
fontWeight: 700;
marginBottom: 5;
`;
const TextContent = styled.Text`
color: #FFF;
fontSize: 11;
marginBottom: 10;
`;
const WrapperStyled = styled.View`
flexDirection: row;
alignItems: center;
marginBottom: 20;
marginTop: 15;
marginLeft: 10;
`;
const RemoveIcon = styled.TouchableOpacity`
paddingVertical:5;
paddingHorizontal:5
`;
const TitleStyled = styled.Text`
fontSize: 20;
fontWeight: 500;
color: #FFF;
text-align: center;
width: 90%;
`;
const ContentWrapper = styled.View`
backgroundColor: #20232A;
`;
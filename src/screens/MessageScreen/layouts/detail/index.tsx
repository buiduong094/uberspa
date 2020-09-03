import React, { useState, useEffect, useReducer, useRef } from 'react';
import styled from 'styled-components/native';
import Header from 'components/Header';
import { useNavigation } from '@react-navigation/native';
import * as Icon from 'constant/icons';
import { reducer } from '../../store/Reducer';
import { InitState } from '../../store/InitState';
import { UberItem, MessageItem, TextInputUI, ModalUI, Camera } from 'components';
import { UberItemType } from 'constant';
import { convertHeight } from 'utils/convertSize';
import { ActionCreators } from 'screens/MessageScreen/store/Reducer';
import { Message } from 'models/message';
import { Dimensions, KeyboardAvoidingView, Platform, Keyboard, FlatList, TextInput } from 'react-native';
import { User } from 'models/user';
import { ApplicationState } from 'store/configureAction';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { ConversationItem } from 'models/conversation';

interface UIProps {
    user?: User,
    conversationSelected?: ConversationItem
}
const Layout = (props: UIProps) => {
    const navigation = useNavigation();
    const [state, dispatch] = useReducer(reducer, InitState);
    const flatListRef = useRef<FlatList | null>(null)
    useEffect(() => {
        if (state.isSent) {
            ActionCreators.ChangeText(dispatch, '')
        }
    }, [state.isSent]);
    useEffect(() => {
        ActionCreators.REQUEST_ITEMS(dispatch, 'messageItems')
    }, []);

    const sendMessage = () => {
        const message: Message = {
            // _id: '1',
            // created: new Date().toDateString(),
            // message: state.message,
            // // avatar: props.user?.avatar,
            // // sender: props.user?.email,
            // sender: 'abc',
            // messageType: '1',
            // supporter: '0'
        }
        Keyboard.dismiss();
        if (state.message && state.message != null) {
            ActionCreators.SendMessage(dispatch, message)
        }
        goIndex()
    }
    const goIndex = () => {
        flatListRef.current?.scrollToIndex({ animated: true, index: state.messageItems.length - 1 });
    };
    console.warn('sss', props.conversationSelected)

    const onCameraImageChange = (sources: any) => {
        // const images = state.warning ? state.warning['IMG_NOIDUNGBAOCAO'] : [];
        // let cloneImages = [...images ?? []];
        // cloneImages = cloneImages.concat(sources);

        // ActionCreators.FIELD_CHANGE(dispatch, 'warning.IMG_NOIDUNGBAOCAO', cloneImages);
        // ActionCreators.FIELD_CHANGE(dispatch, 'showCamera', false);
        ActionCreators.FIELD_CHANGE(dispatch, 'showCamera', false);
    }

    const onCameraTakeImage = (sources: any) => {
        // const images = state.warning ? state.warning['IMG_NOIDUNGBAOCAO'] : [];
        // const cloneImages = [...images ?? [], sources];
        // ActionCreators.FIELD_CHANGE(dispatch, 'warning.IMG_NOIDUNGBAOCAO', cloneImages);
        ActionCreators.FIELD_CHANGE(dispatch, 'showCamera', false);
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
                    titleStyle={{ marginLeft: -30 }}
                    navigation={navigation}>
                </Header>
                <FlatList
                    style={{ paddingHorizontal: 15 }}
                    data={state.messageItems}
                    renderItem={({ item }) => (
                        <MessageItem
                            uistyle={{ marginTop: 10, marginBottom: 20 }}
                            isMyMessage={item?.supporter == '0' ? true : false}
                            item={item}
                        />
                    )}
                    ref={flatListRef}
                    keyExtractor={item => item.index}

                />
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
        </KeyboardAvoidingView>
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


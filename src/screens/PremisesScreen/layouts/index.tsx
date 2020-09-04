import React, { useState, useEffect, useReducer } from 'react';
import styled from 'styled-components/native';
import { Header, TabList, UberItem, Button } from 'components';
import { reducer, ActionCreators } from '../store/Reducer';
import { InitState } from '../store/InitState';
import { TagItem } from 'models/tag';
import { convertHeight } from 'utils/convertSize';
import { UberItemType } from 'constant';
import { useNavigation } from '@react-navigation/native';
import { Dimensions } from 'react-native';
import { ImageSource } from 'assets';
import { fontFamily } from 'utils/Theme';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { ActionCreators as ServiceAction } from 'store/service';
import { ApplicationState } from 'store/configureAction';
import { stat } from 'fs';
import HTML from 'react-native-render-html';
import { block } from 'react-native-reanimated';

interface State {
    shop?: any,
    style?: any
}

// type UIProps = {
//     navigation?: any,
//     style?: any,
// }

type UIProps = State & typeof ServiceAction;

const Layout = (props: UIProps) => {

    const navigation = useNavigation();
    const [state, dispatch] = useReducer(reducer, InitState);
    const { style } = props;

    useEffect(() => {
        ActionCreators.GetIntroduce(dispatch);
    }, [])

    const onTabItemSelected = (item: TagItem, index: number) => {
        let tabLists = [...state.tabItems ?? []];
        tabLists.forEach((s, i) => {
            if (i == index) {
                s.selected = item.selected;
            }
            else {
                s.selected = false;
            }
        })
     
        ActionCreators.FieldChange(dispatch, 'tabItems', tabLists);
    }
    const width = () => {
        Dimensions.get('window').width
    }

    return (
        <Container style={style} >
            <BackgroundImage source={ImageSource.background}>
                <BackgroundInner>
                    <Header style={{ backgroundColor: 'rgba(255, 0, 0, 0)', borderBottomWidth: 0 }}
                        navigation={navigation}
                        backColor="#FFF"
                    />
                    <WrapperStyled>
                        <Logo source={{ uri: props.shop?.logo ?? 'https://benhvienthucuc.vn/wp-content/themes/benh-vien-thu-cuc-vn/assets/images/sec12_1.png' }} />
                        <TitleStyled>{props.shop?.name}</TitleStyled>
                        <Button text='Theo dõi ' uistyle={{ width: 156, height: 46, marginTop: 9 }} onPress={() => {
                        }}></Button>
                    </WrapperStyled>
                </BackgroundInner>
            </BackgroundImage>
            <Content>
                <TabList
                    sources={state.tabItems ?? []}
                    onTabItemSelected={onTabItemSelected}
                />
            </Content>
            <ScrollWrapper>
                {
                    (state.tabItems ?? [])[0].selected && state.introduce &&
                    <HTML html={state.introduce?.description} containerStyle={{padding: 16 ,backgroundColor: '#fff'}}
                        imagesInitialDimensions={{ width: Dimensions.get('screen').width - 20, height: (Dimensions.get('screen').width - 20) * 3 / 4 }}
                        alterNode={(node) => {
                            const { name, parent } = node;
                            if (name === 'img') {
                                let srcImg = node.attribs.src;
                                let widthImg = Dimensions.get('screen').width - 20;
                                let heightImg = (Dimensions.get('screen').width - 20) * 3 / 4;

                                node.attribs = { ...(node.attribs || {}), style: 'marginBottom:10', src: srcImg, width: widthImg, height: heightImg };
                                return node;
                            }
                            if (name === 'p') {

                                node.attribs = { ...(node.attribs || {}), style: 'fontSize:' + 14};
                                return node;
                            }
                        }}
                        tagsStyles={{
                            p: {marginTop: 20, lineHeight: 25},
                            h2: {lineHeight: 25},
                            figcaption: {lineHeight: 25},
                        }}
                    />
                }
                {
                    (state.tabItems ?? [])[1].selected && state.services?.length > 0 && state.services?.map((item: any) =>
                        <UberItem
                            uistyle={{ marginBottom: 1, borderRadius: 0 }}
                            item={item}
                            type={UberItemType.SERVICE} />
                    )
                }
                {
                    (state.tabItems ?? [])[2].selected && state.items?.length > 0 && state.items?.map((item: any) =>
                        <UberItem
                            uistyle={{ marginBottom: 1, borderRadius: 0 }}
                            item={item}
                            type={UberItemType.BRANCH} />
                    )
                }
            </ScrollWrapper>
        </Container >
    );
}

const mapStateToProps = (state: ApplicationState) => ({
    shop: state.ServiceState.shop,
})

const mapDispatchToProps = {
    ...ServiceAction
};

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps
);
export default compose(withConnect)(Layout as any)
const Container = styled.View`
flex:1;

`;

const BackgroundImage = styled.ImageBackground`
width: ${Dimensions.get('screen').width};
height:34%;
`;
const WrapperStyled = styled.View`
flex: 1;
alignItems: center;
`;
const BackgroundInner = styled.View`
backgroundColor: linear-gradient(180deg, rgba(75, 75, 75, 0.5) 0.07%, rgba(54, 54, 54, 0.5) 100%, rgba(0, 0, 0, 0.5) 100%);
flex: 1;
`;
const Logo = styled.Image`
width: 80;
height: 80;
backgroundColor: #FFF;
marginBottom: 9px;
`;
const TitleStyled = styled.Text`
textTransform: uppercase;
font-size: 18px;
font-weight: bold
color: #FFF
`;
const Content = styled.View`
flex-direction:row;
background-color:white;
border-bottom-width:1;
border-color:#E8ECEF;
`;
const ScrollWrapper = styled.ScrollView`
  flex: 1;
`;
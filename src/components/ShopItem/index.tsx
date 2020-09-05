import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import * as Icon from 'constant/icons';
import { View } from 'react-native';
import { fontFamily } from 'utils/Theme';
import { ImageSource } from 'assets';
import { UberItemType } from 'constant';
import { TagItem } from "models/tag";
import { Tag } from 'components';
import { Endpoint } from 'api/endpoint';
interface UIProps {
    onPress?: Function,
    onRightPress?: Function, // bấm vào 1 icon action bên phải
    uistyle?: any,
    item?: any,
    childs?: Array<TagItem>,
    isExpand?: boolean, // icon acion bên phải có được expand chưa?
    selected?: boolean,
    onChildPress?: Function
}

const ShopItem = (props: UIProps) => {
    const { onPress, onRightPress, uistyle, item, childs, isExpand, selected, onChildPress } = props;
    const Stars = () => {
        const stars = new Array<any>();
        for (let i = 0; i < 5; i++) {
            let color = '#E0E0E0';
            if (item?.rating && i < item?.rating) {
                color = '#F5A623';
            }
            stars.push(
                <Icon.Star size={10} color={color} />)
        }
        return stars;
    }

    const Logo = () => {
        if (props.item?.logo)
            return Endpoint.BASE_URL + props.item?.logo;
        return 'https://benhvienthucuc.vn/wp-content/themes/benh-vien-thu-cuc-vn/assets/images/sec12_1.png'
    }
    return (
        <Container style={uistyle}>
            <MainContainer onPress={() => {
                if (onPress) { onPress(item) }
            }}>
                <Wrapper>

                    <ImageStyled
                        style={{ height: 56, width: 56, alignSelf: 'flex-start' }}
                        resizeMode='stretch'
                        source={{ uri: Logo() }}></ImageStyled>


                    <Content>
                        <View style={{ flex: 1 }}>
                            {
                                item?.name &&
                                <TextStyled>{item?.name}</TextStyled>
                            }


                            <ContentWrapper>
                                <StarWrapper>
                                    {
                                        Stars()
                                    }
                                </StarWrapper>
                                <StarTitleStyled>{item?.star}</StarTitleStyled>
                            </ContentWrapper>


                        </View>

                        {

                            <RightOpacityWrapper onPress={() => { if (onRightPress) onRightPress(); }}>
                                {
                                    !isExpand ?
                                        <Icon.ArrowDown color='#000000' size={22}></Icon.ArrowDown> :
                                        <Icon.ArrowUp color='#000000' size={22}></Icon.ArrowUp>
                                }
                            </RightOpacityWrapper>
                        }

                    </Content>
                </Wrapper>
            </MainContainer>
            {
                childs &&
                <ChildContainer horizontal>
                    {
                        childs.map((child:any, index) => (
                            <Tag
                                item={child}
                                label  ={child.name}
                                style={{
                                    marginLeft: index == 0 ? 0 : 5,
                                    marginRight: index == childs.length ? 5 : 0
                                }}
                                onPress={() => { if (onChildPress) onChildPress(); }}
                            ></Tag>))
                    }
                </ChildContainer>
            }
        </Container >
    )
}
export default ShopItem;
const Container = styled.View`
flex:1;

`;
const MainContainer = styled.TouchableOpacity`
justify-content:space-between;
align-content:center;
align-items:center;
paddingVertical:15;
`;
const ChildContainer = styled.ScrollView`
flex:1;
backgroundColor:#F4F5F6;
paddingVertical:10;
paddingHorizontal:10;
flexDirection:row;
`;
const TextStyled = styled.Text`
color:#000000;
fontSize:16;
width: 200px;
marginBottom:5px;
fontFamily: ${fontFamily.semibold}
`;
const SubTitleStyled = styled.Text`
fontSize:14px;
fontFamily: ${fontFamily.regular};
flexWrap: wrap;
color:#9B9B9B;`;
const DistanceTitleStyled = styled.Text`
fontSize:12px;
fontFamily: ${fontFamily.medium};
color:#9B9B9B;`;
const Wrapper = styled.View`
flex-direction:row;
alignItems:center;
`;
const ImageStyled = styled.Image`
`;
const Content = styled.View`
marginLeft:10px;
flex-direction:row;
justifyContent: space-between;
flex:1;
`;
const ContentWrapper = styled.View`
flex-direction:row;
alignItems:center;
alignContent:center;

`;
const StarWrapper = styled.View`
flex-direction:row;
alignItems:center;
`;
const RightOpacityWrapper = styled.TouchableOpacity`
position: absolute;
right:-10;
top:-10;
paddingHorizontal:10;
paddingVertical:10;
`;

const StarTitleStyled = styled.Text`
fontSize:12px;
fontFamily: ${fontFamily.regular};
color:#9B9B9B;`;
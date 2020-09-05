import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import * as Icon from 'constant/icons';
import { View } from 'react-native';
import { fontFamily } from 'utils/Theme';
import { ImageSource } from 'assets';
import { UberItemType } from 'constant';
import { TagItem } from "models/tag";
import { Tag } from 'components';

interface UIProps {
    onPress?: Function,

    uistyle?: any,

    item?: any,
    type: UberItemType,
    selected?: boolean,
    onChildPress?: Function
}

const ServiceItem = (props: UIProps) => {
    const { onPress, uistyle, type, item, selected } = props;
    const currencyFormat = (num) => {
        return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") + ' đ'
      }
    return (
        <Container style={[{ backgroundColor: props.selected ? '#65DF7B20' : 'white' }, uistyle]}>
            <MainContainer onPress={() => {
                if (onPress) { onPress(item) }
            }}>
                <Wrapper>

                    <ImageStyled
                        style={{ height: 56, width: 56, alignSelf: 'flex-start' }}
                        resizeMode='stretch'
                        source={{ uri: item?.logo ?? 'https://benhvienthucuc.vn/wp-content/themes/benh-vien-thu-cuc-vn/assets/images/sec12_1.png' }}></ImageStyled>


                    <Content>
                        <View style={{ flex: 1 }}>
                            {
                                item?.name &&
                                <TextStyled>{item?.name}</TextStyled>
                            }


                            <PackageDescriptStyled style={{ flex: 1 }} numberOfLines={1}>{item?.description}</PackageDescriptStyled>



                        </View>


                        <PriceActiveStyled style={{ color: props.selected ? '#65DF7B' : 'black', right: 0, textAlign: 'right' }} >{currencyFormat(parseFloat(item?.price))}</PriceActiveStyled>


                    </Content>
                </Wrapper>
            </MainContainer>

        </Container >
    )
}
export default ServiceItem;
const Container = styled.View`
flex:1;

borderRadius:10px;
`;
const MainContainer = styled.TouchableOpacity`
justify-content:space-between;
align-content:center;
align-items:center;
paddingHorizontal:15;
paddingVertical:15;
`;

const TextStyled = styled.Text`
color:#000000;
fontSize:16;
width: 200px;
marginBottom:5px;
fontFamily: ${fontFamily.semibold}
`;

const Wrapper = styled.View`
flex-direction:row;
alignItems:center;
`;
const ImageStyled = styled.Image`
`;
const Content = styled.View`
marginLeft:10px;
flex-direction:row;

flex:1;
`;


const PackageDescriptStyled = styled.Text`
fontSize:12px;
fontFamily: ${fontFamily.mediumItalic};
color:#9B9B9B;
`;
const PriceActiveStyled = styled.Text`
fontSize:14px;
fontFamily: ${fontFamily.bold};
flexWrap:wrap;
flex:1;
alignSelf: center
`;

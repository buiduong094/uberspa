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

    return (
        <Container style={uistyle}>
            <MainContainer onPress={() => {
                if (onPress) { onPress(item) }
            }}>
                <Wrapper>

                    <ImageStyled
                        style={{ height: 56, width: 56, alignSelf: 'flex-start' }}
                        resizeMode='stretch'
                        source={{ uri: item?.logo ?? 'https://benhvienthucuc.vn/wp-content/themes/benh-vien-thu-cuc-vn/assets/images/sec12_1.png' }}></ImageStyled>

                    {
                        type == UberItemType.VOUCHER &&
                        <VoucherBorder>
                            <Voucher
                                source={ImageSource.voucher}
                                style={{
                                    height: 16,
                                    width: 16,
                                    tintColor: '#65DF7B'
                                }}
                                resizeMode="cover" />
                        </VoucherBorder>
                    }
                    <Content>
                        <View style={{ flex: 1 }}>
                            {
                                item?.name &&
                                <TextStyled>{item?.name}</TextStyled>
                            }
                            {
                                item?.address && type == UberItemType.SERVICE &&
                                <SubTitleStyled>{item?.address}</SubTitleStyled>
                            }
                            {
                                type == UberItemType.BOOKING &&
                                <BookingTitleStyled >{item?.bookingName ? item.bookingName : item.name}</BookingTitleStyled>
                            }
                            {
                                item?.bookingDate && type == UberItemType.BOOKING &&
                                <BookingDateTitleStyled >{item?.bookingDate}</BookingDateTitleStyled>
                            }
                            {
                                item?.description && type == UberItemType.BRANCH &&
                                <SubTitleStyled numberOfLines={2}>{item?.description}</SubTitleStyled>
                            }
                            {
                                item?.timeWorking && type == UberItemType.BRANCH &&
                                <WorkingtimeTitleStyled numberOfLines={1}>{item?.timeWorking}</WorkingtimeTitleStyled>
                            }
                            {
                                item && item?.distance !== undefined && type == UberItemType.SERVICE &&
                                <ContentWrapper>
                                    <Icon.MapMaker color='#9B9B9B' size={10}></Icon.MapMaker>
                                    <DistanceTitleStyled>{item?.distance ?? 0} KM </DistanceTitleStyled>
                                </ContentWrapper>
                            }
                            {
                                item?.message && type == UberItemType.CHAT &&
                                <MessageStyled numberOfLines={2}>{item?.message}</MessageStyled>
                            }
                            {
                                item?.last_message?.text && type == UberItemType.CHAT &&
                                <MessageStyled numberOfLines={2}>{item?.last_message?.text}</MessageStyled>
                            }
                            {
                                item?.description && type == UberItemType.NOTIFICATION &&
                                <SubTitleStyled numberOfLines={2}>{item?.description}</SubTitleStyled>
                            }
                            {
                                item?.description && type == UberItemType.PACKAGESERVICE &&
                                <PackageDescriptStyled numberOfLines={1}>{item?.description}</PackageDescriptStyled>
                            }
                            {
                                item?.description && type == UberItemType.VOUCHER &&
                                <TextStyled>{item?.description}</TextStyled>
                            }

                        </View>


                        {
                            type == UberItemType.PACKAGESERVICE && item?.price && selected &&
                            <PriceActiveStyled>{item?.price}</PriceActiveStyled>
                        }

                    </Content>
                </Wrapper>
            </MainContainer>

        </Container >
    )
}
export default ServiceItem;
const Container = styled.View`
flex:1;
backgroundColor:#65DF7B20;
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

const TimeStyled = styled.Text`
fontSize:14px;
fontFamily: ${fontFamily.medium};
color:#9B9B9B;
`;

const BookingTitleStyled = styled.Text`
fontSize:14px;
fontFamily: ${fontFamily.regular};
color:#FF0077;`;

const BookingDateTitleStyled = styled.Text`
fontSize:14px;
fontFamily: ${fontFamily.regular};
color:#68D5FF;
`;

const WorkingtimeTitleStyled = styled.Text`
fontSize:14px;
fontFamily: ${fontFamily.regular};
color:#000000;
`;

const StarTitleStyled = styled.Text`
fontSize:12px;
fontFamily: ${fontFamily.regular};
color:#9B9B9B;`;

const MessageStyled = styled.Text`
fontSize:14px;
fontFamily: ${fontFamily.medium};
color:#9B9B9B;
`;

const PackageDescriptStyled = styled.Text`
fontSize:12px;
fontFamily: ${fontFamily.mediumItalic};
color:#9B9B9B;
`;
const PriceActiveStyled = styled.Text`
fontSize:14px;
fontFamily: ${fontFamily.bold};
color:#65DF7B;
flexWrap:wrap;
flex:1;
marginLeft:100;
alignSelf: center
`;
const PriceInActiveStyled = styled.Text`
fontSize:14px;
fontFamily: ${fontFamily.bold};
color:#000000;
flexWrap:wrap;
flex:1;
marginLeft:100;
alignSelf: center
`;
const DueDateStyled = styled.Text`
fontSize:14px;
fontFamily: ${fontFamily.regular};
color:#FF0000;
`;

const VoucherBorder = styled.View`
backgroundColor: #65DF7B20;
paddingVertical:15;
paddingHorizontal:15;
borderRadius:30;
alignItems:center;
justifyContent:center;
`;
const Voucher = styled.Image`
`;
import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { ImageSourcePropType, View, Text } from 'react-native';
import { fontFamily } from 'utils/Theme';
import { ImageButtonType } from 'constant';

interface UIProps {
    onPress?: Function,
    containerStyle?: any,
    imageStyle?: any
    source: ImageSourcePropType,
    width?: number,
    height: number,
    title?: string,
    type?: ImageButtonType,
}
const ImageButton = (props: UIProps) => {

    const Image = () => {
        return props.type == ImageButtonType.VIEW ?
            <WrapperContent style={props.containerStyle}>
                <ImageWrapperStyled style={props.imageStyle}>
                    <ImageStyled
                        style={{ height: props.height, width: props.width }}
                        resizeMode='stretch'
                        source={props.source}
                    >
                    </ImageStyled>
                </ImageWrapperStyled>
                {props.title && <TextStyled>{props.title}</TextStyled>}
            </WrapperContent>
            :
            <Container style={props.containerStyle} onPress={() => { if (props.onPress) props.onPress(); }}>
               <ImageWrapperStyled style={props.imageStyle}>
                    <ImageStyled
                        style={{ height: props.height, width: props.width }}
                        resizeMode='stretch'
                        source={props.source}
                    >
                    </ImageStyled>
                </ImageWrapperStyled>
                {props.title && <TextStyled>{props.title}</TextStyled>}
            </Container>
    }

    return (
        <Image />
    )
}
export default ImageButton;
const Container = styled.TouchableOpacity`
align-items:center;
justify-content:center;
flex:1;
`;
const ImageWrapperStyled = styled.View``;
const ImageStyled = styled.Image``;

const WrapperContent = styled.View`
align-items: center;

`;
const TextStyled = styled.Text`
font-size: 12px;
fontFamily: ${fontFamily.medium};
marginTop:5;
color:#4A4A4A;
`;
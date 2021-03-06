import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import * as Icon from 'constant/icons';
import { fontFamily } from 'utils/Theme';


type UIProps = {

    text?: string,
    hasText?: boolean,
    navigation?: any,
    style?: any,
    titleStyle?: any,
    children?: any,
    step?: number,
    resetStep?: Function
    backColor?: string
}
const Header = (props: UIProps) => {
    const { style, children, text, navigation, titleStyle, backColor } = props;
    return (
        <Container style={style} >
            <Wrapper>
                <Content>
                    {navigation &&
                        <BackStyled onPress={() => {
                            props.navigation.goBack()
                        }} >
                            <Icon.Back color={backColor} size={27} />
                        </BackStyled>
                    }
                    {
                        props.text &&

                        <TitleWrapper
                            numberOfLines={1}
                            lineBreakMode="tail"
                            style={titleStyle}
                        >
                            {text}
                        </TitleWrapper>
                    }
                </Content>
                <StyledRight>
                    {children}
                </StyledRight>
            </Wrapper>
        </Container>
    )
}
export default Header;
const Container = styled.View`
flex-direction:row;
background-color:white;
border-bottom-width:1;
border-color:#E8ECEF;
`;
const Wrapper = styled.View`

flex-direction:row;
align-items:center;
justify-content:space-between;
padding:42px 15px 20px 15px;
`;
const Content = styled.View`

flex-direction:row;
align-content:center;
align-items:center;

`;
const BackStyled = styled.TouchableOpacity`
align-items:center;
align-content:center;
marginRight:20px;

`;
const TitleWrapper = styled.Text`
fontSize:18px;
color:#000000;
textAlign:center;
flex:1;
fontFamily: ${fontFamily.bold}
`;
const StyledRight = styled.View`
`;

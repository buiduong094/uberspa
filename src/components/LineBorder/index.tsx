import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';

interface UIProps {
    title?: string,

    text?: string
}

const LineBorder = (props: UIProps) => {

    return (
        <Container>
            <ContentWrapper>
                <TitleStyled>{props.title}</TitleStyled>
                <TextStyled>{props.text}</TextStyled>
            </ContentWrapper>
        </Container>
    )
}
export default LineBorder;
const Container = styled.View`

`;
const ContentWrapper = styled.View`

paddingVertical:10px;
border-bottom-width:1;
border-color:#E8EAF3;`;
const TitleStyled = styled.Text`
fontSize:14;
color:#8A8E9C`;
const TextStyled = styled.Text`
marginTop:10;
fontSize:16;
color:#31383F;
`;
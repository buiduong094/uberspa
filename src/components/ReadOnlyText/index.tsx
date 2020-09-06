import React from 'react';
import styled from 'styled-components/native';
import { fontFamily } from 'utils/Theme';
export interface ReadOnlyUIProps {
    text?: string,
    uistyle?: any,
    titlestyle?: any,
    contentstyle?: any,
    title?: string,
    numberOfLines?: number,
    containerStyle?: any;
}
const ReadOnlyText = (props: ReadOnlyUIProps) => {
    const { text, title, uistyle, titlestyle, numberOfLines = 1, contentstyle } = props;
    return (

        <Container style={uistyle}>

            {title && <TitleStyled style={titlestyle}>{title}</TitleStyled>}
            <Wrapper style={props.containerStyle}>
                <TextStyled style={contentstyle} numberOfLines={numberOfLines}>{text}</TextStyled>
            </Wrapper>
        </Container>
    )
}
export default ReadOnlyText;
const Container = styled.View``;
const Wrapper = styled.View`
    background-color: #F0F1F5;
    minHeight: 40;
    paddingVertical:10;
    justify-content: center;
    padding-left: 15;
    padding-right: 15;
    border-radius: 3;
    border-color:  #E8ECEF;
    border-width:  1px;    
`;

const TextStyled = styled.Text`
    color: #778CA2;
    font-size:  14;
    font-family: ${fontFamily.regular};
    textAlignVertical: center;
`;
const TitleStyled = styled.Text`
color: #000000;
fontSize:16;
fontFamily: ${fontFamily.bold}
padding-bottom:10px;`;

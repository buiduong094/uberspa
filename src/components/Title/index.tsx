import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { fontFamily } from 'utils/Theme';

export interface TitleUIProps {
    text?: string,
    uistyle?: any,
    titleStyle?: any
}
const Title = (props: TitleUIProps) => {
    const { text, titleStyle } = props;
    return (
       
            <TextStyled style={titleStyle}>{text}</TextStyled>
      
    )
}
export default Title;


const TextStyled = styled.Text`
    color: #000000;
    fontSize:16;
    fontFamily: ${fontFamily.bold}
`;

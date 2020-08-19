import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
interface UIProps {
    text?: string
}
const ContentHeader = (props: UIProps) => {

    return (
        <HeaderWrapper>{props.text}</HeaderWrapper>
    )
}
export default ContentHeader;
const HeaderWrapper = styled.Text`
 color:#8A8E9C;
 fontSize:16;
 padding:20px;
`;
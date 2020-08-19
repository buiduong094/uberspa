import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
interface UIProps {
    children?: any;
}
const ContentWrapper = (props: UIProps) => {

    return (
        <Wrapper>{props.children}</Wrapper>
    )
}
export default ContentWrapper;
const Wrapper = styled.View`
background-color:white;
paddingHorizontal:20px;
margin-bottom:15px`;
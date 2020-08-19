import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';


type UIProps = {

    text?: string,
    hasText?: boolean,
    navigation?: any,
    style?: any,
    children?: any,
    step?: number,
    resetStep?: Function
}
const Layout = (props: UIProps) => {
    const { style } = props;
    return (
        <Container style={style} >
           
        </Container>
    )
}
export default Layout;
const Container = styled.View`
flex-direction:row;
background-color:white;
border-bottom-width:1;
border-color:#E8ECEF;
`;

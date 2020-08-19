import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';

type UIProps =
    {
        children?: any

    }
const Welcome = (props: UIProps) => {

    return (
        <Container>
            <Wrapper>
                {
                    props.children
                }
            </Wrapper>
        </Container>
    )
}
export default Welcome;
const Container = styled.View`
background-color:white;
`;
const Wrapper = styled.View`
padding:42px 20px 20px 20px;
`;

const LableStyled = styled.Text`
padding-top:10;

font-size:18;`;
const SubTitleWrapper = styled.Text`
`;

import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { Text } from 'react-native';
type BackButonUIProps = {
    image?: any,
    text?: string,
    hasText?: boolean,
    navigation: any,
    style?: any
}
const BackButton = (props: BackButonUIProps) => {
    const { style } = props;
    return (

        <Container style={style} onPress={() => { props.navigation.goBack(); }}>
            <Text>Back</Text>
        </Container>
    )
}
export default BackButton;
const Container = styled.TouchableOpacity`
height:40;
width:80;
position:absolute;
top:80;
`;
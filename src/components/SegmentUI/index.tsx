import React, { useState, useEffect } from 'react';

import styled from 'styled-components/native';
export interface SegmentProps {
    onPress: Function,
    segments?: any


}
const displaySegment = (forms: any, onPress: Function): any => {

    return forms.map((value, key) => {
        return (
            <SegmentWrapper key={key} onPress={() => { onPress(key) }} >
                <TextStyled>{value}</TextStyled>
            </SegmentWrapper>
        )
    })

}
const SegmentUI = (props: SegmentProps) => {
    const { segments, onPress } = props;

    return (
        <Container>
            {
                displaySegment(segments, onPress)
            }
        </Container>
    )
}
export default SegmentUI;
const Container = styled.View`
flex-direction:row;
`;
const SegmentWrapper = styled.TouchableOpacity`
border-width:1;
border-color:red;
align-items:center;
border-radius:5;
height:40;
justify-content:center;
`;
const TextStyled = styled.Text`
color:red;`;
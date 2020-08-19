import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import * as Icon from 'constant/icons';
import { fontFamily } from 'utils/Theme';
import { Keyboard } from 'react-native';
type UIProps = {
    onTextChange?: Function,
    placeHolder?: string,
    style?: any,
    textstyle?: any,
    icon?: any,
    onSubmitEditing?: Function,
    value?: any
}
const SearchInput = (props: UIProps) => {

    return (
        <Container style={props.style}>
            {
                props.icon ? props.icon :
                    <Icon.Search color='#C2C2C2' />
            }
            <InputStyled
                placeholder={props.placeHolder}
                value={props.value ?? ''}
                onChangeText={(value) => {
                    if (props.onTextChange) {
                        props.onTextChange(value)
                    }
                }}
                onSubmitEditing={(event) => {
                    if (props.onSubmitEditing) {
                        props.onSubmitEditing();
                        Keyboard.dismiss();
                    }
                }}
            ></InputStyled>
        </Container>
    )
}
export default SearchInput;
const Container = styled.View`

alignItems:center;
flex-direction:row;
height:40;
borderRadius:23px;
backgroundColor:#F4F5F6;
paddingHorizontal:15px;
`;
const InputStyled = styled.TextInput`
flex:1;
marginLeft:5px;
color: #C2C2C2;
fontFamily: ${fontFamily.regular}
`
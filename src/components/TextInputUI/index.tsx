import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { NativeSyntheticEvent, TextInputSubmitEditingEventData, KeyboardType } from 'react-native';

import * as Icon from 'constant/icons';
export interface TextInputUIProps {
    title?: string,
    onSubmitEditing?: (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => void,
    placeholder?: string,
    onChangeText?: (xText: string) => void,
    titlestyle?: any,
    contentstyle?: any,
    uistyle?: any,
    keyboardType?: KeyboardType,
    textValue?: string,
    errorMessage?: string,
    type?: string,
    leftIcon?: any
}
const TextInputUI = (props: TextInputUIProps) => {
    const { placeholder, keyboardType = 'default', type, errorMessage, onChangeText, onSubmitEditing,
        title, titlestyle, contentstyle, uistyle, leftIcon, textValue } = props;

    const [isPassword, setPassword] = useState(false);

    return (
        <Container style={uistyle}>
            {
                title && <TitleStyled style={titlestyle}>{title}</TitleStyled>
            }
            <Wrapper style={contentstyle}>
                {
                    leftIcon && <LeftIconStyled>
                        {leftIcon}
                    </LeftIconStyled>
                }
                <TextInputStyled
                    returnKeyLabel="Xong"
                    returnKeyType='done'
                    value={textValue}
                    secureTextEntry={type === 'password' && !isPassword && true}
                    keyboardType={keyboardType}
                    onChangeText={(xText) => {
                        if (onChangeText) {
                            onChangeText(xText);
                        }

                    }}
                    placeholder={placeholder}
                    onSubmitEditing={onSubmitEditing}></TextInputStyled>
                {
                    type === 'password' &&
                    <EyeStyled onPress={() => {
                        setPassword(!isPassword)
                    }}>
                        {isPassword ? <Icon.Eye /> : <Icon.EyeSlash />}
                    </EyeStyled>
                }
            </Wrapper>
            {errorMessage && <LableStyled >{errorMessage}</LableStyled>}

        </Container>
    )
}
export default TextInputUI;
const Container = styled.View`
`;
const Wrapper = styled.View`
height:48px;
borderWidth: 1;
borderRadius: 24;
borderColor: #E0E0E0;
background-color: #FFFF;
flex-direction:row;
justify-content:space-between;
align-items:center;
`;

const TextInputStyled = styled.TextInput`
flex:1;
color:#39434C;
paddingHorizontal:10px;
height:48px;
`;
const TitleStyled = styled.Text`

padding-bottom:10px;`;
const EyeStyled = styled.TouchableOpacity` 
marginRight:10`;
const LeftIconStyled = styled.View` 
marginLeft:10`;
const LableStyled = styled.Text`
marginLeft:14px;
padding-top:10;
font-style:italic;
font-size:10;
color:red;`;

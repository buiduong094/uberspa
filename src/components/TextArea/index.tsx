import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { Keyboard } from 'react-native';
import ErrorMessageUI from '../ErrorMessage';
export interface TextAreaUIProps {
    placeholder?: string,
    uistyle?: any,
    onTextChange?: Function,
    onSubmitEditing?: Function,
    readOnly?: boolean,
    numberOfline?: number,
    titlestyle?: any,
    title?: string, // tiêu đề cho textinput
    textValue?: string,
    errorMessage?: string // truyền value từ component cha

}

const TextArea = (props: TextAreaUIProps) => {
    const [text, setTextChange] = useState('');

    const { placeholder, uistyle, errorMessage, numberOfline = 3, title, onTextChange, onSubmitEditing, titlestyle, textValue } = props;
    return (
        <Container style={uistyle}>
            {
                title &&
                <TitleStyled style={titlestyle}>{title}</TitleStyled>
            }
            <TextAreaWrapper>
                <InputStyled
                    multiline={true}
                    numberOfLines={numberOfline}
                    placeholder={placeholder}
                    underlineColorAndroid='transparent'
                    onChangeText={(xtext) => {
                        setTextChange(xtext);
                        if (props.onTextChange) {
                            props.onTextChange(xtext);
                        }
                    }}

                    value={textValue && textValue != '' ? textValue : text}
                    onSubmitEditing={(ev) => {
                        Keyboard.dismiss();
                        onSubmitEditing
                    }}
                    blurOnSubmit={true}
                    returnKeyLabel="Xong"
                    returnKeyType='done' />
            </TextAreaWrapper>
            {errorMessage && <ErrorMessageUI message={errorMessage}></ErrorMessageUI>}
        </Container>
    )
}
export default TextArea;

const Container = styled.View`

`;

const TitleStyled = styled.Text`
    color: #31383F;
    
    padding-bottom: 10;
   
`;

const TextAreaWrapper = styled.View`
backgroundColor:#F4F5F6;
    border-width: 1;
    border-color: #E8ECEF;
    border-radius: 3;
`;

const InputStyled = styled.TextInput`
    minHeight:100px;
    paddingVertical:10;
    paddingLeft: 10;
    paddingRight: 10;
    textAlignVertical: top;
 
`;
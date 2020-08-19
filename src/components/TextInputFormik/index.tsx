import React from 'react';
import styled from 'styled-components/native';
import { TextInputUIProps } from './types'
import ErrorMessageUI from '../ErrorMessage';

const TextInputFormikUI = (props: TextInputUIProps) => {
    const {
        onSubmitEditing,
        label,
        type,
        setRef,
        isHideKeyboard,
        placeholder,
        value = undefined,
        field: { name },
        labelVisbile,
        keyboardType,
        form: { setFieldValue, errors, setErrors }

    } = props;
    return (
        <Container>
            {labelVisbile && <LableStyled>{label}</LableStyled>}

            <InputStyled
                onFocus={() => { setErrors({}) }}
                secureTextEntry={type === 'password' && true}
                onChangeText={(text) => { setFieldValue(name, keyboardType === 'numeric' ? Number(text) : text); setErrors({}) }}
                editable={!isHideKeyboard && true}
                placeholder={placeholder}
                value={value}
                keyboardType={keyboardType}
                ref={(input) => setRef(input)}
                onSubmitEditing={() => onSubmitEditing()}
            ></InputStyled>

            {errors[name] && <ErrorMessageUI message={errors[name]}></ErrorMessageUI>}
        </Container>
    )
}
export default TextInputFormikUI;

const Container = styled.View`
border-width:1;
border-radius:20;
border-color:#E0E0E0;
padding-vertical:10;`;
const LableStyled = styled.Text``;
const InputStyled = styled.TextInput`
marginHorizontal:20`;


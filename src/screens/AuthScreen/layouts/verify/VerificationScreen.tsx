
import React, { useState, useReducer, useEffect, useRef } from 'react';
import { Image } from 'react-native';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reducer, ActionCreators } from 'screens/AuthScreen/store/Reducer';
import { ApplicationState } from 'store/configureAction';
import styled from 'styled-components/native';
import { ImageSource } from 'assets';
import { fontFamily } from 'utils/Theme';
import { Button } from 'components';


interface UIProps {
    submit: Function,
    fieldChange?: Function,
    phone?: string,
    refCode: {
        refCode1: string,
        refCode2: string,
        refCode3: string,
        refCode4: string,
        refCode5: string,
        refCode6: string,
    },
}

export const VerificationScreen = (props: UIProps) => {

    const timeCount = 180;

    const inputRef1 = useRef(null);
    const inputRef2 = useRef(null);
    const inputRef3 = useRef(null);
    const inputRef4 = useRef(null);
    const inputRef5 = useRef(null);
    const inputRef6 = useRef(null);

    const [countdown, setCountdown] = useState(timeCount)
    const [isReadyCount, setReadyCount] = useState(true)

    const convertTime = (timeSecond: number) => {
        let pad = function (num: number, size: number) { return ('000' + num).slice(size * -1); }
        const minutes = Math.floor(timeSecond / 60) % 60
        const seconds = Math.floor(timeSecond - minutes * 60)
        return pad(minutes, 2) + ':' + pad(seconds, 2);
    }

    useEffect(() => {
        const timer = setInterval(() => {
            if (isReadyCount) {
                setCountdown(countdown - 1)
            }
        }, 1000)
        return () => clearInterval(timer)
    }, [isReadyCount, countdown])

    useEffect(() => {
        if (countdown === 0) {
            setReadyCount(false)
        }
    }, [countdown])

    /**
     * Auto focus input ref code when step =2
     */
    useEffect(() => {
        inputRef1?.current?.focus();
    },[])


    const getRefInput = (index: number) => {
        return [inputRef1, inputRef2, inputRef3, inputRef4, inputRef5, inputRef6].find((item, idx) => idx === index);
    }

    const getValueInput = (index: number) => {
        return [props.refCode.refCode1, props.refCode.refCode2, props.refCode.refCode3, props.refCode.refCode4, props.refCode.refCode5, props.refCode.refCode6].find((item, idx) => idx === index);
    }

    const onChangeRefCode = (indexInput: number, value: string) => {
        let fieldName = 'refCode1';
        if (indexInput === 0) {
            inputRef2.current?.focus();
        } else if (indexInput === 1) {
            fieldName = 'refCode2';
            inputRef3.current?.focus();
        } else if (indexInput === 2) {
            fieldName = 'refCode3';
            inputRef4.current?.focus();
        } else if (indexInput === 3) {
            fieldName = 'refCode4';
            inputRef5.current?.focus();
        } else if (indexInput === 4) {
            fieldName = 'refCode5';
            inputRef6.current?.focus();
        } else if (indexInput === 5) fieldName = 'refCode6';

        if(props.fieldChange) {
            props.fieldChange(fieldName, value)
        }
    }

    const nextStep = () => {
        if ((props.refCode?.refCode1 ?? ''.length > 0)
            && (props.refCode?.refCode2 ?? ''.length > 0)
            && (props.refCode?.refCode3 ?? ''.length > 0)
            && (props.refCode?.refCode4 ?? ''.length > 0)
            && (props.refCode?.refCode5 ?? ''.length > 0)
            && (props.refCode?.refCode6 ?? ''.length > 0)) {
                props.submit()
        }

    }

    const renderVerify = () => {
        const arrInput = [1, 2, 3, 4, 5, 6];
        return arrInput.map((input, index) => (
            <Verify>
                <VerifyInput
                    maxLength={1}
                    keyboardType="numeric"
                    ref={getRefInput(index)}
                    value={getValueInput(index)}
                    onChangeText={(value) => {
                        onChangeRefCode(index, value);
                    }}
                ></VerifyInput>
            </Verify >
        ))
    }


    return (
            <Container>
                <Image style={{height:80, width:80, marginBottom: 10, borderRadius:5}} source={ImageSource.logo}></Image>
                <Title>Xác nhận tài khoản</Title>
                <SubTitle>Vui lòng nhập mã xác nhận được gửi tới số điện thoại {props?.phone}</SubTitle>
                <WrapperVerify>{renderVerify()}</WrapperVerify>
                <Button text='Xác nhận' uistyle={{ marginTop: 22, marginHorizontal: 0 }} onPress={nextStep}></Button>
                <VerifyText>Gửi lại mã sau: <Time>{convertTime(countdown)}</Time></VerifyText>
            </Container>
    )
}
const mapStateToProps = (state: ApplicationState) => ({

})
const mapDispatchToProps = {

};

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps
);

export default compose(withConnect)(VerificationScreen as any);

const WrapperContent = styled.View`
justify-content:center;
flex: 1;
`;

const Title = styled.Text`
    fontFamily: ${fontFamily.bold};
    color: #000000;
    fontSize: 18
  
`;
const SubTitle = styled.Text`
    fontSize:14;
    color: #9B9B9B;
    marginVertical:10px;
    fontFamily: ${fontFamily.medium};
  
`;
const Container = styled.View`
    flex: 1;
    background-color: #F6FBFB;
    padding:20px;
`;
const WrapperVerify = styled.View`
flex-direction:row;
justify-content:space-between;
`;
const Verify = styled.View`
width: 46px;
height: 46px;
border-radius: 50px;
background-color: #F4F5F6;
justify-content:center;
align-items:center;
`;
const VerifyInput = styled.TextInput`
width: 46px;
height: 46px;
text-align: center
`;
const VerifyText = styled.Text`
margin-top: 15px`;
const Time = styled.Text`
color: red;
`;
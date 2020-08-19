import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { RouteName } from 'constant';
import TLCKSVG from 'assets/images/tailieucanky.svg';
import TKCHOKSVG from 'assets/images/tailieuchoky.svg';
import { Dimensions } from 'react-native';

type UIProps = {

    text?: string,
    hasText?: boolean,
    navigation?: any,
    style?: any,
    loaitailieu: number


}
const ReportButton = (props: UIProps) => {
    const { style } = props;
    const navigation = useNavigation();
    const width = Dimensions.get('window').width / 2;
    const Content = () => {

    }

    return (
        <Container style={style} onPress={() => {
            navigation.navigate(RouteName.SIGNLIST)
        }} >

            {
                props.loaitailieu == 1 ?
                    <TLCKSVG width={300}>
                        {
                            Content()
                        }
                    </TLCKSVG> :
                    <TKCHOKSVG width={300}>
                        {
                            Content()
                        }
                    </TKCHOKSVG>

            }

        </Container>
    )
}
export default ReportButton;
const Container = styled.TouchableOpacity`
`;


const Content = styled.View`

flex-direction:row;
align-content:center;
align-items:center;

`;
const BackStyled = styled.TouchableOpacity`
align-items:center;
align-content:center;
marginRight:20px;

`;
const TitleWrapper = styled.Text`
flex:1;
fontSize:20px;
color:#31383F;
`;
const StyledRight = styled.View`
right:0;
`;

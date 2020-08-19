import React, { useReducer } from 'react';
import { FormStage } from 'screens/AuthScreen/layouts';
import styled from 'styled-components/native';
import { getString } from 'locales';
import { LoginButton } from 'components';
import { ImageSource } from 'assets';
import { fontFamily } from 'utils/Theme';
import { useNavigation } from '@react-navigation/native';
import { RouteName } from 'constant';
import { Keyboard } from 'react-native';

interface LayoutProps {
    handleSubmit?: any,
    formSchema?: FormStage
}
const Layout = (props: LayoutProps) => {

    const navigation = useNavigation();

    return (
        <WrapperKeyboard>
            <Container>
                <RegisterWrapper>
                    <TextStyled
                        onPress={() => {
                            navigation.navigate(RouteName.REGISTER);
                        }}>Đăng ký mới</TextStyled>
                    <TextStyled
                        onPress={() => {
                            navigation.navigate(RouteName.FORGOT_PASSWORD);
                        }}>Quên mật khẩu</TextStyled>
                </RegisterWrapper>

                <LoginButton textstyle={{ textTransform: 'uppercase' }} text={getString('screen', 'LOGIN_BUTTON_LABEL')} onPress={() => {
                    props.handleSubmit();
                    Keyboard.dismiss();
                }} />

                <SeparetorContainer>
                    <SeparetorLine />
                    <SeparetorText>Hoặc đăng nhập với</SeparetorText>
                    <SeparetorLine />
                </SeparetorContainer>
                <SocialLogin>
                    <SocialImage source={ImageSource.google}></SocialImage>
                    <SocialImage source={ImageSource.facebook}></SocialImage>
                    <SocialImage source={ImageSource.apple}></SocialImage>
                </SocialLogin>
                <TermStyled>
                    Đồng nghĩa với đăng nhập bạn đã chấp thuận với <TextStyled>điều khoản</TextStyled> và <TextStyled>chính sách</TextStyled> của chúng thôi
                </TermStyled>
            </Container>
        </WrapperKeyboard>
    )
}
export default Layout;
const WrapperKeyboard = styled.TouchableWithoutFeedback``;
const Container = styled.View``;
const RegisterWrapper = styled.View`
flex-direction:row;
justifyContent:space-between;
marginVertical:15px;
`;
const TextStyled = styled.Text`
textDecorationLine:underline;
color:#9B9B9B;
fontFamily: ${fontFamily.regular};
fontSize: 14;
`;
const TermStyled = styled.Text`
color:#9B9B9B;
textAlign:center;
marginTop:15px;
fontFamily: ${fontFamily.regular}
`;
const SeparetorContainer = styled.View`
marginVertical:20px;
alignItems:center;
flex-direction:row;`;
const SeparetorLine = styled.View`
flex:1;
height:1px;
backgroundColor:#9B9B9B;

`;
const SeparetorText = styled.Text`
color:#9B9B9B;
marginHorizontal:15px;
`;
const SocialImage = styled.Image`
margin:5px;
`;
const SocialLogin = styled.View`

flex-direction:row;
alignItems:center;
justifyContent:center;
`;
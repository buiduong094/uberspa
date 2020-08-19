import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SignInScreen, RegisterScreen } from 'screens/AuthScreen';
import { Layout as ForgotPasswordScreen } from 'screens/ForgotPasswordScreen'
import { RouteName } from 'constant';
const Stack = createStackNavigator();
type Props = {

};

export class AuthStack extends React.Component<Props> {
    render() {
        return (
            <Stack.Navigator screenOptions={{ headerShown: false, }}>
                <Stack.Screen name={RouteName.LOGIN} component={SignInScreen} />
                <Stack.Screen name={RouteName.REGISTER} component={RegisterScreen} />
                <Stack.Screen name={RouteName.FORGOT_PASSWORD} component={ForgotPasswordScreen} />
            </Stack.Navigator>
        );
    }
}
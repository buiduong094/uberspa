import * as React from 'react';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';
import { Layout as SettingScreen } from 'screens/SettingScreen';

import { RouteName } from 'constant';
import { UserScreen } from 'screens/UserScreen';
import { VoucherScreen } from 'screens/VoucherScreen';

const Stack = createStackNavigator();
type Props = {

};

export class SettingStack extends React.Component<Props> {
    render() {
        return (
            <Stack.Navigator screenOptions={{
                headerShown: false,
            }}
            >
                <Stack.Screen
                    name={RouteName.SETTING}
                    component={SettingScreen}
                />
                <Stack.Screen
                    name={RouteName.USER}
                    component={UserScreen}
                    // options={{
                    //     headerLeft: (props) => (
                    //         <HeaderBackButton
                    //             {...props}
                    //             onPress={() => {
                    //                 // Do something
                    //             }}
                    //         />
                    //     ),
                    // }}
                />
                <Stack.Screen
                    name ={RouteName.VOUCHER}
                    component={VoucherScreen}
                />

            </Stack.Navigator>
        );
    }
}
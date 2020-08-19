import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {Layout as NotificationScreen} from 'screens/NotificationScreen';

import { RouteName } from 'constant';

const Stack = createStackNavigator();
type Props = {

};

export class NotifcationStack extends React.Component<Props> {
  render() {
    return (
      <Stack.Navigator  screenOptions={{
        headerShown: false,
      }}>
        <Stack.Screen name={RouteName.NOTIFICATION} component={NotificationScreen} />
   
      </Stack.Navigator>
    );
  }
}
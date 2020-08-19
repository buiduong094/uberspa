import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {Layout as BookingScreen} from 'screens/BookingScreen';

import { RouteName } from 'constant';

const Stack = createStackNavigator();
type Props = {

};

export class CalendarStack extends React.Component<Props> {
  render() {
    return (
      <Stack.Navigator  screenOptions={{
        headerShown: false,
      }}>
        <Stack.Screen name={RouteName.NOTIFICATION} component={BookingScreen} />
   
      </Stack.Navigator>
    );
  }
}
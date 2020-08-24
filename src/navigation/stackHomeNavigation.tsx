import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {Layout as DashboardScreen} from 'screens/DashboardScreen';
import {Layout as ServiceScreen} from 'screens/ServiceScreen';
import {Layout as MapScreen} from 'screens/MapScreen';
import  PackageServiceScreen from 'screens/PackageServiceScreen';
import {Layout as CalendarScreen} from 'screens/CalendarScreen';
// import {Layout as MapScreen} from 'screens/CalendarScreen';
import { RouteName } from 'constant';

const Stack = createStackNavigator();
type Props = {

};

export class HomeStack extends React.Component<Props> {
  render() {
    return (
      <Stack.Navigator  screenOptions={{
        headerShown: false,
      }}>
        <Stack.Screen name={RouteName.APP} component={DashboardScreen} />
        <Stack.Screen name={RouteName.SERVICE} component={ServiceScreen} />
        <Stack.Screen name={RouteName.BOOKING} component={MapScreen} />
        <Stack.Screen name={RouteName.PACKAGESERVICE} component={PackageServiceScreen} />
        <Stack.Screen name={RouteName.CALENDAR} component={CalendarScreen} />
      
      </Stack.Navigator>
    );
  }
}
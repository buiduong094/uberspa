import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {Layout as MessageScreen} from 'screens/MessageScreen';
import {DetailMessageScreenLayout as DetailMessageScreen} from 'screens/MessageScreen';
import { RouteName } from 'constant';

const Stack = createStackNavigator();
type Props = {

};

export class MessagerStack extends React.Component<Props> {
  render() {
    return (
      <Stack.Navigator  screenOptions={{
        headerShown: false,
      }}>
        <Stack.Screen name={RouteName.CONVERSATION} component={MessageScreen} />
        <Stack.Screen name={RouteName.MESSAGE} component={DetailMessageScreen} />
      </Stack.Navigator>
    );
  }
}
import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import {TabContainer} from 'navigation/tabNavigation';
import MenuScreen from 'screens/Menu';
const Drawer = createDrawerNavigator();

export default function AppDrawer() {
  return (
    <Drawer.Navigator
      // eslint-disable-next-line react-native/no-inline-styles
      drawerStyle={{width: 350}}
      drawerContent={() => <MenuScreen />}>
      <Drawer.Screen name="Home" component={TabContainer} />
      <Drawer.Screen name="Menu" component={MenuScreen} />
    </Drawer.Navigator>
  );
}

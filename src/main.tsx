import React, { Component, useEffect } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { Provider } from 'react-redux';
import store from 'store/configureStore';
import NetInfo from "@react-native-community/netinfo";

import SwitchScreen from 'screens/SwitchScreen';
import { ActionType } from 'store/context/ActionType';
import DeviceInfo from "react-native-device-info";

import {  AppState, AppStateStatus } from 'react-native';

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#F1F5F8'
  },
};
export default function App() {

  const unsubscribe = NetInfo.addEventListener(state => {

    store.dispatch({
      type: ActionType.CHANGE_CONNECTION,
      isConnection: state.isConnected
    })
  });
  const Version = async () => {
    let version = await DeviceInfo.getVersion();
    store.dispatch({
      type: ActionType.CHANGE_VERSION,
      version: version
    })
  }
  const Splash = () => {
    setTimeout(() => {
      store.dispatch({
        type: ActionType.LOADED
      });
    }, 2000);
  }
  useEffect(() => {
    Version();
    AppState.addEventListener("change", _handleAppStateChange);

    return () => {
      AppState.removeEventListener("change", _handleAppStateChange);
    };
  }, []);

  const _handleAppStateChange = (nextAppState: AppStateStatus) => {
   

  };
  return (
   
      <Provider store={store}>

        <NavigationContainer theme={navTheme}  >
          <SwitchScreen />
        </NavigationContainer>

      </Provider>

  );
}

import React, { Component } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import { HomeStack } from 'navigation/stackHomeNavigation';
import { RouteName } from 'constant';
import * as Icon from 'constant/icons';
import { SettingStack } from './stackSetting';
import { NotifcationStack } from './stackNotification';
import { CalendarStack } from './stackCalendar';
import { MessagerStack } from './stackMessager';
const Tab = createBottomTabNavigator();
type Props = {};
export class TabContainer extends Component<Props> {
    render() {

        return (
            <Tab.Navigator tabBarOptions={{
                activeTintColor: '#65DF7B',
                inactiveTintColor: '#C2C2C2',

            }}>
                <Tab.Screen name={RouteName.APP} component={HomeStack}
                    options={() => ({
                        tabBarLabel: 'Trang chủ',
                        tabBarIcon: ({ color, size }) => {
                            return <Icon.Home color={color} />
                        }
                    })}
                />
                <Tab.Screen name={RouteName.CALENDAR} component={CalendarStack}
                    options={() => ({
                        tabBarLabel: 'Lịch đặt',
                        tabBarIcon: ({ color, size }) => {
                            return <Icon.Calendar color={color} />
                        }
                    })}
                />
                <Tab.Screen name={RouteName.MESSAGE} component={MessagerStack}
                    options={() => ({
                        tabBarLabel: 'Trò chuyện',
                        tabBarIcon: ({ color, size }) => {
                            return <Icon.Messenger color={color} />
                        }
                    })}
                />
                <Tab.Screen name={RouteName.NOTIFICATION} component={NotifcationStack}
                    options={() => ({
                        tabBarLabel: 'Thông báo',
                        tabBarIcon: ({ color, size }) => {
                            return <Icon.Notification color={color} />
                        }
                    })}
                />
                <Tab.Screen name={RouteName.SETTING} component={SettingStack}
                    options={() => ({
                        tabBarLabel: 'Cá nhân',
                        tabBarIcon: ({ color, size }) => {
                            return <Icon.Setting color={color} />
                        }
                    })}
                />
            </Tab.Navigator>
        );
    }
}
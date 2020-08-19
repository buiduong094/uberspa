import React, { useEffect, useReducer } from "react";
import { connect } from "react-redux"
import { AuthStack } from 'navigation/stackAuthNavigation';
import { TabContainer } from 'navigation/tabNavigation'
import { View, TouchableWithoutFeedback, Keyboard } from "react-native";


import { compose } from "redux";

import { ApplicationState } from "store/configureAction";
 
interface Props {
    isLoggedIn: boolean;
  
}
const SwitchScreen = (props: Props) => {
    const { isLoggedIn } = props;


    useEffect(() => {
    }, [props.isLoggedIn]);

    

    const ScreenRender = () => {
        if (!isLoggedIn) {
            return (
                <AuthStack />
            )
        } else {
            return (
                <TabContainer />
            )
        }

    }

    return (
        <View style={{ flex: 1, backgroundColor: "#F6FBFB" }}>
            {ScreenRender()}
           
        </View>
    )

}
const mapStateToProps = (state: ApplicationState) => ({
    isLoggedIn: state.ContextState.isLoggedIn,
   
})
const mapDispatchToProps = {
  
};

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps
);

export default compose(withConnect)(SwitchScreen as  any);


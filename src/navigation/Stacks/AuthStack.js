import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import Login from '../../screens/Login';
import SignUp from '../../screens/SignUp';
import Home from '../../screens/Home';

// import ForgotPassword from '../../Screens/ForgotPassword';

//AuthStack
const authStack = createStackNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions: {
        headerShown: false,
      },
    },
    SignUp: {
      screen: SignUp,
      navigationOptions: {
        headerShown: false,
      },
    },
    Home: {
      screen: Home,
      navigationOptions: {
        headerShown: false,
      },
    },
  },
  {initialRouteName: 'Home'},
);

export default authStack;

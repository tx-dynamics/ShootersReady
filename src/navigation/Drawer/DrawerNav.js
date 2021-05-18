import React, {Component} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {createDrawerNavigator} from 'react-navigation-drawer';
import Content from './Content';
import theme from '../../theme';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
//Stacks
import AmmoInventoryStack from '../Stacks/AmmoInventoryStack';
import BulletCalStack from '../Stacks/BulletCalStack';
import GunInventoryStack from '../Stacks/GunInventoryStack';
import GunProfileStack from '../Stacks/GunProfileStack';
import GunReportStack from '../Stacks/GunReportStack';
import MissingGunStack from '../Stacks/MissingGunStack';
import NfsStack from '../Stacks/NfsStack';
import VaultStack from '../Stacks/VaultStack';
const drawerNav = createDrawerNavigator(
  {
    'Guns Inventory': {
      screen: GunInventoryStack,
      navigationOptions: {
        drawerIcon: ({tintColor}) => (
          <MaterialCommunityIcons name="cards" size={24} color={tintColor} />
        ),
      },
    },
    'Guns Profile': {
      screen: GunProfileStack,
      navigationOptions: {
        drawerIcon: ({tintColor}) => (
          <MaterialCommunityIcons name="pistol" size={24} color={tintColor} />
        ),
      },
    },
    'Ammo Inventory': {
      screen: AmmoInventoryStack,
      navigationOptions: {
        drawerIcon: ({tintColor}) => (
          <MaterialCommunityIcons
            name="ammunition"
            size={24}
            color={tintColor}
          />
        ),
      },
    },
    'NFA Items': {
      screen: NfsStack,
      navigationOptions: {
        drawerIcon: ({tintColor}) => (
          <AntDesign name="appstore-o" size={24} color={tintColor} />
        ),
      },
    },
    'Missing Gun Report': {
      screen: GunReportStack,
      navigationOptions: {
        drawerIcon: ({tintColor}) => (
          <Ionicons name="document-text-outline" size={24} color={tintColor} />
        ),
      },
    },
    'Log a Gun Missing/Stolen': {
      screen: MissingGunStack,
      navigationOptions: {
        drawerIcon: ({tintColor}) => (
          <MaterialCommunityIcons name="math-log" size={24} color={tintColor} />
        ),
      },
    },
    'Bullet Drop Calculator': {
      screen: BulletCalStack,
      navigationOptions: {
        drawerIcon: ({tintColor}) => (
          <MaterialCommunityIcons
            name="calculator-variant"
            size={24}
            color={tintColor}
          />
        ),
      },
    },
    Vault: {
      screen: VaultStack,
      navigationOptions: {
        drawerIcon: ({tintColor}) => (
          <MaterialCommunityIcons
            name="card-text-outline"
            size={24}
            color={tintColor}
          />
        ),
      },
    },
  },
  {
    initialRouteName: 'Guns Inventory',
    drawerLockMode: 'unlocked',
    drawerType: 'front',
    drawerBackgroundColor: 'white',
    drawerPosition: 'left',
    contentComponent: Content,
    contentOptions: {
      activeTintColor: theme.colors.secondary,
      inactiveTintColor: theme.colors.primary,
      activeBackgroundColor: '#f1f1f1',
    },
  },
);

export default drawerNav;

import React from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import {logo} from '../assets';
import theme from '../theme';

const HeaderCenterComponent = ({name}) => {
  return (
    <View style={{flexDirection: 'row'}}>
      <Image source={logo} resizeMode={'contain'} style={styles.drawerIcon} />
      <Text style={styles.textStyle}>{name}</Text>
    </View>
  );
};
export default HeaderCenterComponent;
export const styles = StyleSheet.create({
  textStyle: {
    fontSize: 20,
    color: 'black',
    textAlign: 'center',
  },
  drawerIcon: {
    height: 30,
    width: 30,
    // tintColor: 'white',
    // backgroundColor: 'tomato',
  },
});

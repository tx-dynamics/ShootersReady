import React from 'react';
import {View, StyleSheet, Image, TouchableWithoutFeedback} from 'react-native';
// import {back} from '../aseets';
import Entypo from 'react-native-vector-icons/Entypo';
const HeaderLeftComponent = ({navigation, icon}) => {
  return (
    <View>
      {icon === 'back' ? (
        <TouchableWithoutFeedback
          activeOpacity={0}
          style={styles.drawerIcon}
          onPress={() => {
            navigation.navigate('BusniessTypes');
          }}>
          {/* <Image
            source={back}
            resizeMode={'contain'}
            style={styles.drawerIcon}
          /> */}
        </TouchableWithoutFeedback>
      ) : (
        <TouchableWithoutFeedback
          activeOpacity={0}
          style={styles.drawerIcon}
          onPress={() => {
            navigation.toggleDrawer();
          }}>
          <Entypo name="menu" size={27} color="black" />
        </TouchableWithoutFeedback>
      )}
    </View>
  );
};

export default HeaderLeftComponent;

const styles = StyleSheet.create({
  drawerIcon: {
    height: 25,
    width: 25,
    tintColor: 'white',
    // backgroundColor: 'tomato',
  },
});

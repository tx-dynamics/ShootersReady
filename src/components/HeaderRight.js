import React from 'react';
import {
  TouchableWithoutFeedback,
  StyleSheet,
  Text,
  Image,
  View,
} from 'react-native';

import theme from '../theme';
// import {Fonts} from '../utils/Fonts';
import Ionicons from 'react-native-vector-icons/Ionicons';

const HeaderRight = ({navigation}) => {
  return (
    <View style={{flexDirection: 'row'}}>
      {
        <TouchableWithoutFeedback
          style={{
            backgroundColor: 'skyblue',

            borderRadius: 4,
            flexDirection: 'row',
          }}
          onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={36} color={'black'} />
        </TouchableWithoutFeedback>
      }
    </View>
  );
};

export const styles = StyleSheet.create({
  textStyle: {
    // fontSize: 20,

    // fontFamily: Fonts.GoogleSansBold,
    color: theme.colors.primaryDark,
    backgroundColor: 'black',
  },
});
export default HeaderRight;

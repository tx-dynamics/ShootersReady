import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
  ImageBackground,
  FlatList,
  Animated,
} from 'react-native';
import styles from './styles';
import theme from '../../theme';
import {Header, Divider} from 'react-native-elements';
import {user, m416, akm, tommy} from '../../assets';
import HeaderCenterComponent from '../../components/HeaderCenterComponent';
import HeaderLeftComponent from '../../components/HeaderLeftComponent';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
export default class MissingReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ammo: [
        {
          id: 0,
          name: 'M416',
          img: user,
          status: 'stolen',
          serial: '1962 AMC M422A1',
        },
        {
          id: 0,
          name: 'AKM',
          img: user,
          status: 'lost',
          serial: '1962 AMC M422A1',
        },
        {
          id: 0,
          name: 'AWM',
          img: user,
          status: 'stolen',
          serial: '1962 AMC M422A1',
        },
      ],
    };
  }
  datarender = ({item, index}) => {
    return (
      <TouchableOpacity
        // onPress={() => {
        //   this.props.navigation.navigate('StolenData');
        // }}
        key={index}>
        <LinearGradient
          colors={['#000000', '#9C1313']}
          style={{
            flex: 1,
            marginTop: 20,
            width: '90%',
            backgroundColor: theme.colors.primary,
            alignSelf: 'center',
            padding: 10,
            borderRadius: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Image
            borderRadius={25}
            source={item.img}
            style={{height: 50, width: 50}}
          />
          <View
            style={{
              // backgroundColor: 'tomato',
              width: '65%',
              justifyContent: 'space-around',
            }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: 'white',
              }}>
              {item.name}
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: 'white',
              }}>
              {`${item.serial} - ${item.status}`}
            </Text>
          </View>
          <AntDesign
            style={{
              color: 'white',
              textAlign: 'center',
              alignSelf: 'center',
            }}
            name="arrowdown"
            color="white"
            size={20}
          />
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <Header
          backgroundColor={'white'}
          containerStyle={{borderBottomWidth: 0}}
          centerComponent={<HeaderCenterComponent name="SHOOTERS READY" />}
          leftComponent={
            <HeaderLeftComponent navigation={this.props.navigation} />
          }
        />
        <View style={{alignItems: 'center', marginTop: 30}}>
          <Divider
            style={{
              backgroundColor: theme.colors.primary,
              height: 1,
              width: '50%',
            }}
          />
          <TouchableOpacity activeOpacity={1} style={[styles.button]}>
            <Text style={[styles.loginText]}>Missing/Stolen Reports</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={this.state.ammo}
          extraData={this.state.ammo}
          contentContainerStyle={
            {
              // alignSelf: 'center',
            }
          }
          showsHorizontalScrollIndicator={false}
          renderItem={this.datarender}
          // numColumns={2}
          keyExtractor={(item, index) => item + index.toString()}
        />
      </View>
    );
  }
}

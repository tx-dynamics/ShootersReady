import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  FlatList,
} from 'react-native';
import styles from './styles';
import theme from '../../theme';
import {Header, Divider} from 'react-native-elements';
import {button} from '../../assets';
import HeaderCenterComponent from '../../components/HeaderCenterComponent';
import HeaderLeftComponent from '../../components/HeaderLeftComponent';
import LinearGradient from 'react-native-linear-gradient';
export default class Vault extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

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
        <View
          style={{
            alignItems: 'center',
            marginTop: 10,
            // flex: 0.1,
          }}>
          <Divider
            style={{
              backgroundColor: theme.colors.primary,
              height: 1,
              width: '50%',
            }}
          />
          <View
            style={{
              marginTop: 20,
              width: '100%',
              justifyContent: 'space-around',
              flexDirection: 'row',
              marginBottom: 20,
            }}>
            <ImageBackground
              style={{
                flex: 0.4,
                height: null,
                width: null,
                resizeMode: 'cover',
                borderRadius: 40,
              }}
              source={button}
              imageStyle={{borderRadius: 10}}>
              <TouchableOpacity activeOpacity={1}>
                <Text
                  style={{
                    color: 'white',
                    // backgroundColor: '#A50202',
                    padding: 20,
                    textAlign: 'center',
                    // borderRadius: 5,
                  }}>
                  Vault
                </Text>
              </TouchableOpacity>
            </ImageBackground>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('Notes');
          }}>
          <LinearGradient
            colors={['#000000', '#9C1313']}
            style={{
              marginTop: 10,
              width: '90%',
              // backgroundColor: theme.colors.primary,
              alignSelf: 'center',
              padding: 15,
              borderRadius: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                flexDirection: 'row',
                width: '15%',
                justifyContent: 'space-around',
              }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: 'white',
                }}>
                Notes
              </Text>
            </View>
            <Text
              style={{
                fontSize: 12,
                // fontWeight: 'bold',
                color: 'white',
              }}>
              View
            </Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('AmmoInventory');
          }}
          // style={{
          //   marginTop: 10,
          //   width: '90%',
          //   backgroundColor: theme.colors.primary,
          //   alignSelf: 'center',
          //   padding: 15,
          //   borderRadius: 10,
          //   flexDirection: 'row',
          //   justifyContent: 'space-between',
          // }}
        >
          <LinearGradient
            colors={['#000000', '#9C1313']}
            style={{
              marginTop: 10,
              width: '90%',
              // backgroundColor: theme.colors.primary,
              alignSelf: 'center',
              padding: 15,
              borderRadius: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                flexDirection: 'row',
                // width: '35%',
                justifyContent: 'space-around',
              }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: 'white',
                }}>
                Ammo Inventory
              </Text>
            </View>
            <Text
              style={{
                fontSize: 12,
                // fontWeight: 'bold',
                color: 'white',
              }}>
              View
            </Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('GunReport');
          }}
          // style={{
          //   marginTop: 10,
          //   width: '90%',
          //   backgroundColor: theme.colors.primary,
          //   alignSelf: 'center',
          //   padding: 15,
          //   borderRadius: 10,
          //   flexDirection: 'row',
          //   justifyContent: 'space-between',
          // }}
        >
          <LinearGradient
            colors={['#000000', '#9C1313']}
            style={{
              marginTop: 10,
              width: '90%',
              // backgroundColor: theme.colors.primary,
              alignSelf: 'center',
              padding: 15,
              borderRadius: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                flexDirection: 'row',
                // width: '40%',
                justifyContent: 'space-around',
              }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: 'white',
                }}>
                Stolen Gun Report
              </Text>
            </View>
            <Text
              style={{
                fontSize: 12,
                color: 'white',
              }}>
              View
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  }
}

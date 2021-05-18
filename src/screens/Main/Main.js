import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
} from 'react-native';
import {logo, bullet, profile} from '../../assets';
import styles from './styles';
import {Header, Divider} from 'react-native-elements';
import theme from '../../theme';
import HeaderCenterComponent from '../../components/HeaderCenterComponent';
import HeaderLeftComponent from '../../components/HeaderLeftComponent';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {name: 'Cortlin Martin', img: ''};
  }
  componentDidMount() {
    this.getData();
  }
  getData() {
    var curuser = auth().currentUser;
    this.setState({name: curuser.displayName});
    const profile = database().ref('users/' + curuser.uid);
    profile.on('value', user => {
      this.setState({img: user.val().dp});
    });
  }
  render() {
    const {name} = this.state;
    return (
      <View style={styles.container}>
        <Header
          backgroundColor={'white'}
          containerStyle={{borderBottomWidth: 0}}
          centerComponent={<HeaderCenterComponent name="SHOOTERS READY" />}
          leftComponent={
            <HeaderLeftComponent navigation={this.props.navigation} />
          }
        />
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Profile')}>
            <Image
              source={
                this.state.img
                  ? {
                      uri: `${this.state.img}`,
                    }
                  : logo
              }
              resizeMode={'cover'}
              style={{
                height: 90,
                width: 90,
                // alignSelf: 'center',
                // justifyContent: 'flex-end',
                marginTop: 10,
                borderColor: theme.colors.primary,
                borderRadius: 50,
                borderWidth: 2,
                // flex: 0.3,
              }}
            />
          </TouchableOpacity>
          <Text style={[styles.largeText, {marginTop: 10}]}> {name} </Text>
          <Divider
            style={{
              marginTop: 10,
              backgroundColor: theme.colors.primary,
              height: 1,
              width: '60%',
            }}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            // flex: 0.35,
            justifyContent: 'space-evenly',
            width: Dimensions.get('screen').width,
            // alignSelf: 'center',
            marginTop: 10,
          }}>
          <TouchableOpacity
            style={{}}
            onPress={() => {
              this.props.navigation.navigate('GunInventory');
            }}>
            <ImageBackground
              borderRadius={17}
              source={bullet}
              // resizeMode={'cover'}
              style={{
                height: 150,
                width: 150,
                alignItems: 'center',
                // alignSelf: 'center',
                justifyContent: 'center',
                // marginLeft: 20,
              }}>
              <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
                Gun
              </Text>
              <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
                Inventory
              </Text>
            </ImageBackground>
          </TouchableOpacity>
          <View
            style={{
              // justifyContent: 'center',
              // alignItems: 'center',
              width: '50%',
            }}>
            <TouchableOpacity
              style={{marginBottom: 10}}
              onPress={() => {
                this.props.navigation.navigate('GunProfile');
              }}>
              <ImageBackground
                borderRadius={20}
                source={profile}
                resizeMode={'cover'}
                style={{
                  // height: 70,
                  width: '110%',
                  // alignContent: 'center',
                  alignSelf: 'center',
                  justifyContent: 'center',
                  padding: 10,
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 14,
                    textAlign: 'center',
                    marginLeft: 10,
                    marginBottom: 5,
                  }}>
                  Gun Profile
                </Text>
              </ImageBackground>
            </TouchableOpacity>
            <TouchableOpacity
              style={{marginTop: 10}}
              onPress={() => this.props.navigation.navigate('AmmoInventory')}>
              <ImageBackground
                borderRadius={20}
                source={profile}
                // resizeMode={'cover'}
                style={{
                  // height: 70,
                  width: '110%',
                  // alignContent: 'center',
                  alignSelf: 'center',
                  justifyContent: 'center',
                  padding: 10,
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 14,
                    textAlign: 'center',
                    marginLeft: 15,
                    marginBottom: 5,
                  }}>
                  Ammo Inventory
                </Text>
              </ImageBackground>
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            // flex: 0.35,
            justifyContent: 'space-evenly',
            width: Dimensions.get('screen').width,
            // alignSelf: 'center',
            marginTop: 10,
          }}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('NfaItems');
            }}>
            <ImageBackground
              borderRadius={17}
              source={bullet}
              // resizeMode={'cover'}
              style={{
                height: 150,
                width: 150,
                alignItems: 'center',
                // alignSelf: 'center',
                justifyContent: 'center',
                // marginLeft: 20,
              }}>
              <Text style={{color: 'white', fontSize: 20}}>NFA ITEMS</Text>
            </ImageBackground>
          </TouchableOpacity>
          <View style={{width: '50%'}}>
            <TouchableOpacity
              style={{marginBottom: 10}}
              onPress={() => this.props.navigation.navigate('MissingGun')}>
              <ImageBackground
                borderRadius={20}
                source={profile}
                resizeMode={'cover'}
                style={{
                  width: '110%',
                  // alignContent: 'center',
                  alignSelf: 'center',
                  justifyContent: 'center',
                  padding: 10,
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 12,
                    textAlign: 'center',
                    marginLeft: 10,
                    marginBottom: 5,
                  }}>
                  MISSING/STOLEN
                </Text>
              </ImageBackground>
            </TouchableOpacity>
            <TouchableOpacity
              style={{marginTop: 10}}
              onPress={() => this.props.navigation.navigate('GunReport')}>
              <ImageBackground
                borderRadius={20}
                source={profile}
                // resizeMode={'cover'}
                style={{
                  width: '110%',
                  // alignContent: 'center',
                  alignSelf: 'center',
                  justifyContent: 'center',
                  padding: 10,
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 11,
                    textAlign: 'center',
                    marginLeft: 13,
                    marginBottom: 5,
                    // fontWeight: 'bold',
                  }}>
                  MISSING GUN REPORTS
                </Text>
              </ImageBackground>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

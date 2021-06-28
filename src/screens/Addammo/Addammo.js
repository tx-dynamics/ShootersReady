import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import styles from './styles';
import {button} from '../../assets';
import theme from '../../theme';
import {Header, Divider} from 'react-native-elements';
import HeaderCenterComponent from '../../components/HeaderCenterComponent';
import HeaderLeftComponent from '../../components/HeaderLeftComponent';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
export default class Addammo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      caliber: '5.56mm x 45',
      rounds: '550',
      fireround: '150',
      ammunation: '',
      lot: 'HK416',
      date: '3/29/2021',
      remaining: '400',
      isLoading: false,
    };
  }
  addData() {
    const {
      caliber,
      rounds,
      fireround,
      ammunation,
      lot,
      date,
      remaining,
    } = this.state;
    const data = {
      caliber,
      rounds,
      fireround,
      ammunation,
      lot,
      date,
      remaining,
    };
    const user = auth().currentUser.uid;
    const ammo = database().ref('Ammo/' + user);
    ammo.push(data).then(res => {
      console.log('====>>>', res);
      this.setState({isLoading: false}, () =>
        this.props.navigation.navigate('AmmoInventory'),
      );
    });
  }

  render() {
    const {
      caliber,
      rounds,
      fireround,
      ammunation,
      lot,
      date,
      remaining,
    } = this.state;
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
            <Text style={[styles.loginText]}>Ammo Inventory</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={{flex: 1, flexGrow: 1}}>
          <View
            style={{
              marginTop: 20,
              width: '100%',
              justifyContent: 'space-around',
              flexDirection: 'row',
            }}>
            <View style={{width: '40%'}}>
              <Text style={styles.rapper}>Total Rounds</Text>
              <TextInput
                style={styles.small}
                onChangeText={text => this.setState({caliber: text})}
                value={caliber}
                underlineColorAndroid="transparent"
              />
            </View>
          </View>
          <View
            style={{
              marginTop: 20,
              width: '100%',
              justifyContent: 'space-around',
              flexDirection: 'row',
            }}>
            <View style={{width: '40%'}}>
              <Text style={styles.rapper}>Total Rounds</Text>
              <TextInput
                style={styles.small}
                onChangeText={text => this.setState({rounds: text})}
                value={rounds}
                underlineColorAndroid="transparent"
              />
            </View>
            <View style={{width: '40%'}}>
              <Text style={styles.rapper}>Rounds Fired</Text>
              <TextInput
                style={styles.small}
                onChangeText={text => this.setState({fireround: text})}
                value={fireround}
                underlineColorAndroid="transparent"
              />
            </View>
          </View>
          <View
            style={{
              marginTop: 20,
              width: '100%',
              justifyContent: 'space-around',
              flexDirection: 'row',
            }}>
            <View style={{width: '40%'}}>
              <Text style={styles.rapper}>Ammunation</Text>
              <TextInput
                style={styles.small}
                onChangeText={text => this.setState({ammunation: text})}
                value={ammunation}
                underlineColorAndroid="transparent"
              />
            </View>
            <View style={{width: '40%'}}>
              <Text style={styles.rapper}>Lot #</Text>
              <TextInput
                style={styles.small}
                onChangeText={text => this.setState({lot: text})}
                value={lot}
                underlineColorAndroid="transparent"
              />
            </View>
          </View>
          <View
            style={{
              marginTop: 20,
              width: '100%',
              justifyContent: 'space-around',
              flexDirection: 'row',
            }}>
            <View style={{width: '40%'}}>
              <Text style={styles.rapper}>Date</Text>
              <TextInput
                style={styles.small}
                onChangeText={text => this.setState({date: text})}
                value={date}
                underlineColorAndroid="transparent"
              />
            </View>
            <View style={{width: '40%'}}>
              <Text style={styles.rapper}>Remaining</Text>
              <TextInput
                style={styles.small}
                onChangeText={text => this.setState({remaining: text})}
                value={remaining}
                underlineColorAndroid="transparent"
              />
            </View>
          </View>

          {/* <View
            style={{
              marginTop: 20,
              width: '100%',
              justifyContent: 'space-around',
              flexDirection: 'row',
              marginBottom: 10,
            }}>
            <TouchableOpacity
              style={{width: '40%'}}
              onPress={() => {
                this.props.navigation.navigate('AmmoInventory');
              }}>
              <Text
                style={{
                  color: 'white',
                  backgroundColor: theme.colors.gray,
                  padding: 20,
                  textAlign: 'center',
                  borderRadius: 5,
                }}>
                Canel
              </Text>
            </TouchableOpacity>
            {this.state.isLoading ? (
              <ActivityIndicator
                animating
                color={'white'}
                style={{
                  color: 'white',
                  backgroundColor: '#A50202',
                  padding: 20,
                  textAlign: 'center',
                  borderRadius: 5,
                  width: '40%',
                }}
              />
            ) : (
              <TouchableOpacity
                style={{width: '40%'}}
                onPress={() => {
                  this.setState({isLoading: true}, () => {
                    // this.props.navigation.navigate('Main');
                  });
                  this.addData();
                }}>
                <Text
                  style={{
                    color: 'white',
                    backgroundColor: '#A50202',
                    padding: 20,
                    textAlign: 'center',
                    borderRadius: 5,
                  }}>
                  + Add
                </Text>
              </TouchableOpacity>
            )}
          </View>
         */}
          <View
            style={{
              marginTop: 10,
              width: '100%',
              justifyContent: 'space-around',
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 10,
            }}>
            <ImageBackground
              style={{
                flex: 0.4,
                height: null,
                width: null,
                resizeMode: 'cover',
                // borderRadius: 40,
              }}
              source={button}
              imageStyle={{borderRadius: 10}}>
              <TouchableOpacity
                // style={{width: '40%'}}
                onPress={() => {
                  this.props.navigation.navigate('AmmoInventory');
                }}>
                <Text
                  style={{
                    color: 'white',
                    // backgroundColor: theme.colors.gray,
                    padding: 20,
                    textAlign: 'center',
                    // borderRadius: 5,
                  }}>
                  Canel
                </Text>
              </TouchableOpacity>
            </ImageBackground>
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
              {this.state.isLoading ? (
                <ActivityIndicator
                  animating
                  color={'white'}
                  style={{
                    color: 'white',
                    // backgroundColor: '#A50202',
                    padding: 20,
                    textAlign: 'center',
                    borderRadius: 5,
                    // width: '40%',
                  }}
                />
              ) : (
                <TouchableOpacity
                  // style={{width: '40%'}}
                  onPress={() => {
                    this.setState({isLoading: true}, () => {
                      // this.props.navigation.navigate('Main');
                    });
                    this.addData();
                  }}>
                  <Text
                    style={{
                      color: 'white',
                      // backgroundColor: '#A50202',
                      padding: 20,
                      textAlign: 'center',
                      borderRadius: 5,
                    }}>
                    + Add
                  </Text>
                </TouchableOpacity>
              )}
            </ImageBackground>
          </View>
        </ScrollView>
      </View>
    );
  }
}

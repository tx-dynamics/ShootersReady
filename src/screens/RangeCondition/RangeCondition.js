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
import {button} from '../../assets';
import theme from '../../theme';
import HeaderRight from '../../components/HeaderRight';
import {Header, Divider, CheckBox} from 'react-native-elements';
import database from '@react-native-firebase/database';
import HeaderCenterComponent from '../../components/HeaderCenterComponent';
import HeaderLeftComponent from '../../components/HeaderLeftComponent';
import LinearGradient from 'react-native-linear-gradient';
export default class RangeCondition extends Component {
  constructor(props) {
    super(props);
    this.state = {
      winddirec: '',
      windspeed: '',
      slantangle: '',
      temperature: '',
      baromateric: '',
      gusts: '',
      elevation: '',
      targetdistance: '',
      scopeheight: '',
      zerodis: '',
      boreyes: '',
      boreno: '',
      pid: '',
      uid: '',
      gid: '',
      itemid: '',
    };
  }
  componentDidMount() {
    // this.loadData();
    const pid = this.props.navigation.getParam('pid');
    const gid = this.props.navigation.getParam('gid');
    const uid = this.props.navigation.getParam('uid');
    const itemid = this.props.navigation.getParam('itemid');
    console.log('ids=====>', uid, pid, gid);
    this.setState({pid, gid, uid});
    if (itemid) {
      console.log(itemid);
      this.setState({itemid});
      this.getData(uid, gid, itemid);
    }
  }
  getData(uid, gid, itemid) {
    const load = database().ref(
      'users/' + uid + '/gun/' + gid + '/data/' + itemid + '/range/',
    );
    load.on('value', child => {
      this.setState({
        winddirec: child.val().winddirec,
        windspeed: child.val().windspeed,
        slantangle: child.val().slantangle,
        temperature: child.val().temperature,
        baromateric: child.val().baromateric,
        gusts: child.val().gusts,
        elevation: child.val().elevation,
        targetdistance: child.val().targetdistance,
        scopeheight: child.val().scopeheight,
        zerodis: child.val().zerodis,
        boreyes: child.val().boreyes,
        boreno: child.val().boreno,
      });
      console.log(child.val());
    });
  }
  loadData() {
    const {
      itemid,
      uid,
      gid,
      pid,
      scopeheight,
      zerodis,
      boreno,
      boreyes,
      winddirec,
      windspeed,
      slantangle,
      temperature,
      baromateric,
      gusts,
      elevation,
      targetdistance,
    } = this.state;
    const data = {
      scopeheight,
      zerodis,
      boreno,
      boreyes,
      winddirec,
      windspeed,
      slantangle,
      temperature,
      baromateric,
      gusts,
      elevation,
      targetdistance,
    };
    console.log(pid, itemid);
    if (itemid) {
      const load = database().ref(
        'users/' + uid + '/gun/' + gid + '/data/' + itemid + '/range',
      );
      load
        .update(data)
        .then(res => {
          console.log('====>>>', res);
          this.setState({isLoading: false}, () =>
            this.props.navigation.navigate('GunInventory'),
          );
        })
        .catch(error => {
          var errorMessage = error.message;
          console.log(errorMessage);
          this.setState({loading: false}, () => {
            alert(errorMessage);
          });
        });
    } else {
      const load = database().ref(
        'users/' + uid + '/gun/' + gid + '/data/' + pid + '/range',
      );
      load
        .set(data)
        .then(res => {
          console.log('====>>>', res);
          this.setState({isLoading: false}, () =>
            this.props.navigation.navigate('GunInventory'),
          );
        })
        .catch(error => {
          var errorMessage = error.message;
          console.log(errorMessage);
          this.setState({loading: false}, () => {
            alert(errorMessage);
          });
        });
    }
  }

  render() {
    const {
      scopeheight,
      zerodis,
      boreno,
      boreyes,
      winddirec,
      windspeed,
      slantangle,
      temperature,
      baromateric,
      gusts,
      elevation,
      targetdistance,
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
          rightComponent={<HeaderRight navigation={this.props.navigation} />}
        />
        <View style={{alignItems: 'center', marginTop: 30}}>
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
                  Range Condition
                </Text>
              </TouchableOpacity>
            </ImageBackground>
          </View>
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
              <LinearGradient colors={['#000000', '#9C1313']}>
                <Text style={styles.rapper}>Wind Direction</Text>
              </LinearGradient>
              <TextInput
                style={styles.small}
                onChangeText={text => this.setState({winddirec: text})}
                value={winddirec}
                underlineColorAndroid="transparent"
              />
            </View>
            <View style={{width: '40%'}}>
              <LinearGradient colors={['#000000', '#9C1313']}>
                <Text style={styles.rapper}>Wind Speed</Text>
              </LinearGradient>
              <TextInput
                style={styles.small}
                onChangeText={text => this.setState({windspeed: text})}
                value={windspeed}
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
              <LinearGradient colors={['#000000', '#9C1313']}>
                <Text style={styles.rapper}>Slant Angles</Text>
              </LinearGradient>
              <TextInput
                style={styles.small}
                onChangeText={text => this.setState({slantangle: text})}
                value={slantangle}
                underlineColorAndroid="transparent"
              />
            </View>
            <View style={{width: '40%'}}>
              <LinearGradient colors={['#000000', '#9C1313']}>
                <Text style={styles.rapper}>Temperature</Text>
              </LinearGradient>
              <TextInput
                style={styles.small}
                onChangeText={text => this.setState({temperature: text})}
                value={temperature}
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
              <LinearGradient colors={['#000000', '#9C1313']}>
                <Text style={styles.rapper}>Biometric Pressure</Text>
              </LinearGradient>
              <TextInput
                style={styles.small}
                onChangeText={text => this.setState({baromateric: text})}
                value={baromateric}
                underlineColorAndroid="transparent"
              />
            </View>
            <View style={{width: '40%'}}>
              <LinearGradient colors={['#000000', '#9C1313']}>
                <Text style={styles.rapper}>Gusts</Text>
              </LinearGradient>
              <TextInput
                style={styles.small}
                onChangeText={text => this.setState({gusts: text})}
                value={gusts}
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
              <LinearGradient colors={['#000000', '#9C1313']}>
                <Text style={styles.rapper}>Elevation</Text>
              </LinearGradient>
              <TextInput
                style={styles.small}
                onChangeText={text => this.setState({elevation: text})}
                value={elevation}
                underlineColorAndroid="transparent"
              />
            </View>
            <View style={{width: '40%'}}>
              <LinearGradient colors={['#000000', '#9C1313']}>
                <Text style={styles.rapper}>Distance To Target</Text>
              </LinearGradient>
              <TextInput
                style={styles.small}
                onChangeText={text => this.setState({targetdistance: text})}
                value={targetdistance}
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
              <LinearGradient colors={['#000000', '#9C1313']}>
                <Text style={styles.rapper}>Scope Height</Text>
              </LinearGradient>
              <TextInput
                style={styles.small}
                onChangeText={text => this.setState({scopeheight: text})}
                value={scopeheight}
                underlineColorAndroid="transparent"
              />
            </View>
            <View style={{width: '40%'}}>
              <LinearGradient colors={['#000000', '#9C1313']}>
                <Text style={styles.rapper}>Zero Distance</Text>
              </LinearGradient>
              <TextInput
                style={styles.small}
                onChangeText={text => this.setState({zerodis: text})}
                value={zerodis}
                underlineColorAndroid="transparent"
              />
            </View>
          </View>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              width: '90%',
              alignSelf: 'center',
              marginTop: 10,
            }}>
            Parallel To Bore Zero :
          </Text>
          <View
            style={{
              // alignSelf: 'center',
              width: '60%',
              // backgroundColor: 'tomato',
              alignContent: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}>
              <CheckBox
                title="Yes"
                containerStyle={{
                  backgroundColor: 'transparent',
                  borderColor: 'transparent',
                }}
                checked={boreyes}
                onPress={() =>
                  this.setState({
                    boreyes: !this.state.boreyes,
                    boreno: false,
                  })
                }
                // fontFamily={Fonts.FontAwesome}
                checkedColor={theme.colors.primary}
              />
              <CheckBox
                // titleProps={{font}}
                title="No"
                containerStyle={{
                  backgroundColor: 'transparent',
                  //   left: 25,
                  borderColor: 'transparent',
                }}
                checked={boreno}
                onPress={() =>
                  this.setState({
                    boreno: !this.state.boreno,
                    boreyes: false,
                  })
                }
                checkedColor={theme.colors.primary}
                // fontFamily={Fonts.FontAwesome}
              />
            </View>
          </View>
          <View
            style={{
              marginTop: 20,
              width: '100%',
              justifyContent: 'space-around',
              flexDirection: 'row',
              marginBottom: 10,
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
              <TouchableOpacity
              // onPress={() => {
              //   this.props.navigation.navigate('MissingGun');
              // }}
              >
                <Text
                  style={{
                    color: 'white',
                    // backgroundColor: theme.colors.gray,
                    padding: 20,
                    textAlign: 'center',
                    // borderRadius: 5,
                  }}>
                  Print
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
                    // textAlign: 'center',
                    borderRadius: 5,
                  }}
                />
              ) : (
                <TouchableOpacity
                  // style={{width: '40%'}}
                  onPress={() => {
                    this.setState({isLoading: true}, () => {
                      // this.props.navigation.navigate('Main');
                    });
                    this.loadData();
                  }}>
                  <Text
                    style={{
                      color: 'white',
                      // backgroundColor: theme.colors.primary,
                      padding: 20,
                      alignSelf: 'center',
                      // textAlign: 'center',
                      // borderRadius: 5,
                    }}>
                    Save
                  </Text>
                </TouchableOpacity>
              )}
            </ImageBackground>
          </View>
          <View
            style={{
              marginTop: 20,
              width: '100%',
              justifyContent: 'space-around',
              flexDirection: 'row',
              marginBottom: 10,
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
              <TouchableOpacity
              // onPress={() => {
              //   this.props.navigation.navigate('MissingGun');
              // }}
              >
                <Text
                  style={{
                    color: 'white',
                    // backgroundColor: theme.colors.gray,
                    padding: 20,
                    textAlign: 'center',
                    // borderRadius: 5,
                  }}>
                  Mail
                </Text>
              </TouchableOpacity>
            </ImageBackground>
            <View
              style={{
                flex: 0.4,
                height: null,
                width: null,
                resizeMode: 'cover',
                borderRadius: 40,
              }}>
              {this.state.isLoading ? (
                <ActivityIndicator
                  animating
                  color={'white'}
                  style={{
                    color: 'white',
                    // backgroundColor: '#A50202',
                    padding: 20,
                    // textAlign: 'center',
                    borderRadius: 5,
                  }}
                />
              ) : (
                <TouchableOpacity
                // style={{width: '40%'}}
                >
                  <Text
                    style={{
                      color: 'white',
                      // backgroundColor: theme.colors.primary,
                      padding: 20,
                      alignSelf: 'center',
                      // textAlign: 'center',
                      // borderRadius: 5,
                    }}
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

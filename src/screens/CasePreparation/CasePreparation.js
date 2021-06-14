import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Animated,
} from 'react-native';
import styles from './styles';
import {button} from '../../assets';
import HeaderRight from '../../components/HeaderRight';
import database from '@react-native-firebase/database';
import theme from '../../theme';
import {Header, Divider, CheckBox} from 'react-native-elements';
import HeaderCenterComponent from '../../components/HeaderCenterComponent';
import HeaderLeftComponent from '../../components/HeaderLeftComponent';
import {ImageBackground} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
export default class CasePreparation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemid: '',
      uid: '',
      gid: '',
      pid: '',
      casep: '',
      caselot: '',
      nooffire: '',
      trimlength: '',
      chamferyes: false,
      chamferno: false,
      deburyes: false,
      deburno: false,
      primerpocyes: false,
      primerpocno: false,
      flashholeyes: false,
      flashholeno: false,
      neckturnyes: false,
      neckturnno: false,
      neckwall: '',
      finishdia: '',
      maxvar: '',
      notes: '',
      isLoading: false,
    };
  }
  componentDidMount() {
    // this.loadData();
    const pid = this.props.navigation.getParam('newPostKey');
    const gid = this.props.navigation.getParam('gid');
    const uid = this.props.navigation.getParam('uid');
    const itemid = this.props.navigation.getParam('itemid');

    this.setState({pid, gid, uid});
    if (itemid) {
      console.log(itemid);
      this.setState({itemid});
      this.getData(uid, gid, itemid);
    }
  }
  getData(uid, gid, itemid) {
    const load = database().ref(
      'users/' + uid + '/gun/' + gid + '/data/' + itemid + '/case/',
    );
    load.on('value', child => {
      this.setState({
        casep: child.val().casep,
        caselot: child.val().caselot,
        nooffire: child.val().nooffire,
        trimlength: child.val().trimlength,
        chamferyes: child.val().chamferyes,
        chamferno: child.val().chamferno,
        deburyes: child.val().deburyes,
        deburno: child.val().deburno,
        primerpocyes: child.val().primerpocyes,
        primerpocno: child.val().primerpocno,
        flashholeyes: child.val().flashholeyes,
        flashholeno: child.val().flashholeno,
        neckturnyes: child.val().neckturnyes,
        neckturnno: child.val().neckturnno,
        neckwall: child.val().neckwall,
        finishdia: child.val().finishdia,
        maxvar: child.val().maxvar,
        notes: child.val().notes,
      });
      console.log(child.val());
    });
  }
  loadData() {
    const {
      uid,
      itemid,
      gid,
      pid,
      flashholeno,
      flashholeyes,
      neckturnno,
      neckturnyes,
      neckwall,
      finishdia,
      maxvar,
      notes,
      caselot,
      nooffire,
      casep,
      trimlength,
      chamferno,
      chamferyes,
      deburno,
      deburyes,
      primerpocno,
      primerpocyes,
    } = this.state;
    const data = {
      flashholeno,
      flashholeyes,
      neckturnno,
      neckturnyes,
      neckwall,
      finishdia,
      maxvar,
      notes,
      caselot,
      nooffire,
      casep,
      trimlength,
      chamferno,
      chamferyes,
      deburno,
      deburyes,
      primerpocno,
      primerpocyes,
    };
    console.log(itemid, '----');

    if (itemid) {
      const load = database().ref(
        'users/' + uid + '/gun/' + gid + '/data/' + itemid + '/case/',
      );
      load
        .update(data)
        .then(res => {
          console.log('====>>>', res);
          this.setState({isLoading: false}, () =>
            this.props.navigation.navigate('RangeCondition', {
              itemid,
              uid,
              gid,
            }),
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
        'users/' + uid + '/gun/' + gid + '/data/' + pid + '/case',
      );
      load
        .set(data)
        .then(res => {
          console.log('====>>>', res);
          this.setState({isLoading: false}, () =>
            this.props.navigation.navigate('RangeCondition', {pid, uid, gid}),
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
      flashholeno,
      flashholeyes,
      neckturnno,
      neckturnyes,
      neckwall,
      finishdia,
      maxvar,
      notes,
      caselot,
      nooffire,
      casep,
      trimlength,
      chamferno,
      chamferyes,
      deburno,
      deburyes,
      primerpocno,
      primerpocyes,
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
        <View style={{alignItems: 'center', marginTop: 10}}>
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
                  Case Preparation
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
                <Text style={styles.rapper}>Case</Text>
              </LinearGradient>
              <TextInput
                style={styles.small}
                onChangeText={text => this.setState({casep: text})}
                value={casep}
                underlineColorAndroid="transparent"
              />
            </View>
            <View style={{width: '40%'}}>
              <LinearGradient colors={['#000000', '#9C1313']}>
                <Text style={styles.rapper}>Case Lot #</Text>
              </LinearGradient>
              <TextInput
                style={styles.small}
                onChangeText={text => this.setState({caselot: text})}
                value={caselot}
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
                <Text style={styles.rapper}># of Firings</Text>
              </LinearGradient>
              <TextInput
                style={styles.small}
                onChangeText={text => this.setState({nooffire: text})}
                value={nooffire}
                underlineColorAndroid="transparent"
              />
            </View>
            <View style={{width: '40%'}}>
              <LinearGradient colors={['#000000', '#9C1313']}>
                <Text style={styles.rapper}>Trim Length</Text>
              </LinearGradient>
              <TextInput
                style={styles.small}
                onChangeText={text => this.setState({trimlength: text})}
                value={trimlength}
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
            Chamfer :
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
                checked={chamferyes}
                onPress={() =>
                  this.setState({
                    chamferyes: !this.state.chamferyes,
                    chamferno: false,
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
                checked={chamferno}
                onPress={() =>
                  this.setState({
                    chamferno: !this.state.chamferno,
                    chamferyes: false,
                  })
                }
                checkedColor={theme.colors.primary}
                // fontFamily={Fonts.FontAwesome}
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
            Debur :
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
                checked={deburyes}
                onPress={() =>
                  this.setState({
                    deburyes: !this.state.deburyes,
                    deburno: false,
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
                checked={deburno}
                onPress={() =>
                  this.setState({
                    deburno: !this.state.deburno,
                    deburno: false,
                  })
                }
                checkedColor={theme.colors.primary}
                // fontFamily={Fonts.FontAwesome}
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
            Uniform Primer Pocket :
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
                checked={primerpocyes}
                onPress={() =>
                  this.setState({
                    primerpocyes: !this.state.primerpocyes,
                    primerpocno: false,
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
                checked={primerpocno}
                onPress={() =>
                  this.setState({
                    primerpocno: !this.state.primerpocno,
                    primerpocyes: false,
                  })
                }
                checkedColor={theme.colors.primary}
                // fontFamily={Fonts.FontAwesome}
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
            Uniform Flash Hole :
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
                checked={flashholeyes}
                onPress={() =>
                  this.setState({
                    flashholeyes: !this.state.flashholeyes,
                    flashholeno: false,
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
                checked={flashholeno}
                onPress={() =>
                  this.setState({
                    flashholeno: !this.state.flashholeno,
                    flashholeyes: false,
                  })
                }
                checkedColor={theme.colors.primary}
                // fontFamily={Fonts.FontAwesome}
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
            Neck Turn :
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
                checked={neckturnyes}
                onPress={() =>
                  this.setState({
                    neckturnyes: !this.state.neckturnyes,
                    neckturnno: false,
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
                checked={neckturnno}
                onPress={() =>
                  this.setState({
                    neckturnno: !this.state.neckturnno,
                    neckturnyes: false,
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
            }}>
            <View style={{width: '40%'}}>
              <LinearGradient colors={['#000000', '#9C1313']}>
                <Text style={styles.rapper}>Neck Wall Thickness</Text>
              </LinearGradient>
              <TextInput
                style={styles.small}
                onChangeText={text => this.setState({neckwall: text})}
                value={neckwall}
                underlineColorAndroid="transparent"
              />
            </View>
            <View style={{width: '40%'}}>
              <LinearGradient colors={['#000000', '#9C1313']}>
                <Text style={styles.rapper}>Finish Diameter</Text>
              </LinearGradient>
              <TextInput
                style={styles.small}
                onChangeText={text => this.setState({finishdia: text})}
                value={finishdia}
                underlineColorAndroid="transparent"
              />
            </View>
          </View>
          <View
            style={{
              marginTop: 20,
              width: '90%',
              // backgroundColor: 'tomato',
              alignSelf: 'center',
              // justifyContent: 'space-around',
              // flexDirection: 'row',
            }}>
            <View style={{width: '45%'}}>
              <LinearGradient colors={['#000000', '#9C1313']}>
                <Text style={styles.rapper}>Max Variance</Text>
              </LinearGradient>
              <TextInput
                style={styles.small}
                onChangeText={text => this.setState({maxvar: text})}
                value={maxvar}
                underlineColorAndroid="transparent"
              />
            </View>
          </View>
          <View
            style={{
              marginTop: 20,
              width: '90%',
              alignSelf: 'center',
            }}>
            <LinearGradient colors={['#000000', '#9C1313']}>
              <Text style={styles.rapper}>Notes</Text>
            </LinearGradient>
            <TextInput
              numberOfLines={3}
              style={styles.small}
              onChangeText={text => this.setState({notes: text})}
              value={notes}
              underlineColorAndroid="transparent"
            />
          </View>

          <View
            style={{
              marginTop: 20,
              width: '100%',
              justifyContent: 'space-around',
              flexDirection: 'row',
              marginBottom: 10,
            }}>
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
                }}
              />
            </TouchableOpacity>

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
                    Next
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

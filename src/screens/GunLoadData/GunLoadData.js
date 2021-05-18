import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  ImageBackground,
  Animated,
} from 'react-native';
import styles from './styles';
import {button} from '../../assets';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import theme from '../../theme';
import {Header, Divider, CheckBox} from 'react-native-elements';
import HeaderCenterComponent from '../../components/HeaderCenterComponent';
import HeaderLeftComponent from '../../components/HeaderLeftComponent';
import HeaderRight from '../../components/HeaderRight';
import LinearGradient from 'react-native-linear-gradient';
export default class GunLoadData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemid: '',
      uid: '',
      gid: '',
      date: '',
      riffle: '',
      catridge: '',
      bushsize: '',
      offsetamount: '',
      powder: '',
      measure: '',
      weight: '',
      mmseting: '',
      buletbrand: '',
      primer: '',
      primertype: '',
      primerlot: '',
      bullettype: '',
      lot: '',
      bulletweight: '',
      blastic: '',
      catridgelength: '',
      notes: '',
      sizing: false,
      fulllength: false,
      bodydie: false,
      bushyes: false,
      bushno: false,
      buttonsizeyes: false,
      buttonsizeno: false,
      carbide: false,
      tapered: false,
      shellholderyes: false,
      shellholderno: false,
      standard: false,
      premium: false,
      competition: false,
      mmyes: false,
      mmno: false,
      vldyes: false,
      vldno: false,
      isLoading: false,
    };
  }
  componentDidMount() {
    const user = auth().currentUser.uid;
    const gid = this.props.navigation.getParam('gid');
    const item = this.props.navigation.getParam('item');
    this.setState({uid: user, gid});

    if (item) {
      this.setState({itemid: item.id});
      this.getData(user, gid, item.id);
    }
  }
  getData(user, gid, item) {
    // const {uid, gid, itemid} = this.state;

    const load = database().ref(
      'users/' + user + '/gun/' + gid + '/data/' + item + '/load/',
    );
    load.on('value', child => {
      this.setState({
        date: '',
        riffle: child.val().riffle,
        catridge: child.val().catridge,
        bushsize: child.val().bushsize,
        offsetamount: child.val().offsetamount,
        powder: child.val().powder,
        measure: child.val().measure,
        weight: child.val().weight,
        mmseting: child.val().mmseting,
        buletbrand: child.val().buletbrand,
        primer: child.val().primer,
        primertype: child.val().primertype,
        primerlot: child.val().primerlot,
        bullettype: child.val().bullettype,
        lot: child.val().lot,
        bulletweight: child.val().bulletweight,
        blastic: child.val().blastic,
        catridgelength: child.val().catridgelength,
        notes: child.val().notes,
        sizing: child.val().sizing,
        fulllength: child.val().fulllength,
        bodydie: child.val().bodydie,
        bushyes: child.val().bushyes,
        bushno: child.val().bushno,
        buttonsizeyes: child.val().buttonsizeyes,
        buttonsizeno: child.val().buttonsizeno,
        carbide: child.val().carbide,
        tapered: child.val().tapered,
        shellholderyes: child.val().shellholderyes,
        shellholderno: child.val().shellholderno,
        standard: child.val().standard,
        premium: child.val().premium,
        competition: child.val().competition,
        mmyes: child.val().mmyes,
        mmno: child.val().mmno,
        vldyes: child.val().vldyes,
        vldno: child.val().vldno,
        isLoading: child.val().isLoading,
      });
      console.log(child.val());
    });
  }
  uniqueID() {
    // this.setState({indicator: true});
    function chr4() {
      return Math.random().toString(16).slice(-4);
    }
    return (
      chr4() +
      chr4() +
      '-' +
      chr4() +
      '-' +
      chr4() +
      '-' +
      chr4() +
      '-' +
      chr4() +
      chr4() +
      chr4()
    );
  }
  loadData() {
    const {
      itemid,
      uid,
      gid,
      vldno,
      vldyes,
      standard,
      premium,
      competition,
      mmno,
      mmyes,
      shellholderno,
      shellholderyes,
      buttonsizeno,
      buttonsizeyes,
      carbide,
      tapered,
      bushno,
      bushyes,
      sizing,
      fulllength,
      bodydie,
      date,
      primer,
      primertype,
      primerlot,
      bullettype,
      lot,
      bulletweight,
      blastic,
      catridgelength,
      notes,
      riffle,
      catridge,
      bushsize,
      offsetamount,
      powder,
      measure,
      weight,
      mmseting,
      buletbrand,
    } = this.state;
    const data = {
      vldno,
      vldyes,
      standard,
      premium,
      competition,
      mmno,
      mmyes,
      shellholderno,
      shellholderyes,
      buttonsizeno,
      buttonsizeyes,
      carbide,
      tapered,
      bushno,
      bushyes,
      sizing,
      fulllength,
      bodydie,
      date,
      primer,
      primertype,
      primerlot,
      bullettype,
      lot,
      bulletweight,
      blastic,
      catridgelength,
      notes,
      riffle,
      catridge,
      bushsize,
      offsetamount,
      powder,
      measure,
      weight,
      mmseting,
      buletbrand,
    };
    // let productId = this.uniqueID();
    console.log(itemid);
    if (itemid) {
      const load = database().ref(
        'users/' + uid + '/gun/' + gid + '/data/' + itemid + '/load',
      );
      load
        .update(data)
        .then(res => {
          console.log('====>>>', res);
          this.setState({isLoading: false}, () =>
            this.props.navigation.navigate('CasePreparation', {
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
      var newPostKey = database()
        .ref('users/' + uid + '/gun/' + gid)
        .child('/data')
        .push().key;
      console.log('post key===\n', newPostKey);

      const load = database().ref(
        'users/' + uid + '/gun/' + gid + '/data/' + newPostKey + '/load',
      );
      load
        .set(data)
        .then(res => {
          console.log('====>>>', res);
          this.setState({isLoading: false}, () =>
            this.props.navigation.navigate('CasePreparation', {
              newPostKey,
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
    }
  }

  render() {
    const {
      vldno,
      vldyes,
      standard,
      premium,
      competition,
      mmno,
      mmyes,
      shellholderno,
      shellholderyes,
      buttonsizeno,
      buttonsizeyes,
      carbide,
      tapered,
      bushno,
      bushyes,
      sizing,
      fulllength,
      bodydie,
      date,
      primer,
      primertype,
      primerlot,
      bullettype,
      lot,
      bulletweight,
      blastic,
      catridgelength,
      notes,
      riffle,
      catridge,
      bushsize,
      offsetamount,
      powder,
      measure,
      weight,
      mmseting,
      buletbrand,
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
                  Load Data
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
                <Text style={styles.rapper}>Date</Text>
              </LinearGradient>
              <TextInput
                style={styles.small}
                onChangeText={text => this.setState({date: text})}
                value={date}
                underlineColorAndroid="transparent"
              />
            </View>
            <View style={{width: '40%'}}>
              <LinearGradient colors={['#000000', '#9C1313']}>
                <Text style={styles.rapper}>Riffle</Text>
              </LinearGradient>
              <TextInput
                style={styles.small}
                onChangeText={text => this.setState({riffle: text})}
                value={riffle}
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
            <View style={{width: '45%'}}>
              <LinearGradient colors={['#000000', '#9C1313']}>
                <Text style={styles.rapper}>Catridge</Text>
              </LinearGradient>
              <TextInput
                style={styles.small}
                onChangeText={text => this.setState({catridge: text})}
                value={catridge}
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
            Sizing Die :
          </Text>
          <View
            style={{
              alignSelf: 'center',
              width: '90%',
              //   backgroundColor: 'tomato',
              alignContent: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}>
              <CheckBox
                title=" Sizing Die"
                containerStyle={{
                  backgroundColor: 'transparent',
                  borderColor: 'transparent',
                }}
                checked={sizing}
                onPress={() =>
                  this.setState({
                    sizing: !this.state.sizing,
                    fulllength: false,
                    bodydie: false,
                  })
                }
                // fontFamily={Fonts.FontAwesome}
                checkedColor={theme.colors.primary}
              />
              <CheckBox
                // titleProps={{font}}
                title="Fully Length"
                containerStyle={{
                  backgroundColor: 'transparent',
                  //   left: 25,
                  borderColor: 'transparent',
                }}
                checked={fulllength}
                onPress={() =>
                  this.setState({
                    fulllength: !this.state.fulllength,
                    sizing: false,
                    bodydie: false,
                  })
                }
                checkedColor={theme.colors.primary}
                // fontFamily={Fonts.FontAwesome}
              />
              <CheckBox
                // titleProps={{fontFamily: Fonts.FontAwesome}}
                title="Body Die"
                containerStyle={{
                  backgroundColor: 'transparent',
                  //   left: 25,
                  borderColor: 'transparent',
                }}
                checked={bodydie}
                onPress={() =>
                  this.setState({
                    bodydie: !this.state.bodydie,
                    fulllength: false,
                    sizing: false,
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
            Busing Style :
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
                checked={bushyes}
                onPress={() =>
                  this.setState({
                    bushyes: !this.state.bushyes,
                    bushno: false,
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
                checked={bushno}
                onPress={() =>
                  this.setState({
                    bushno: !this.state.bushno,
                    bushyes: false,
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
                <Text style={styles.rapper}>Bushing Size</Text>
              </LinearGradient>
              <TextInput
                style={styles.small}
                onChangeText={text => this.setState({bushsize: text})}
                value={bushsize}
                underlineColorAndroid="transparent"
              />
            </View>
            <View style={{width: '40%'}}>
              <LinearGradient colors={['#000000', '#9C1313']}>
                <Text style={styles.rapper}>Offset Amount</Text>
              </LinearGradient>
              <TextInput
                style={styles.small}
                onChangeText={text => this.setState({offsetamount: text})}
                value={offsetamount}
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
            Competition Shell Holder :
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
                checked={shellholderyes}
                onPress={() =>
                  this.setState({
                    shellholderyes: !this.state.shellholderyes,
                    shellholderno: false,
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
                checked={shellholderno}
                onPress={() =>
                  this.setState({
                    shellholderno: !this.state.shellholderno,
                    shellholderyes: false,
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
            Size Button :
          </Text>
          <View
            style={{
              alignSelf: 'center',
              width: '90%',
              //   backgroundColor: 'tomato',
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
                checked={buttonsizeyes}
                onPress={() =>
                  this.setState({
                    buttonsizeyes: !this.state.buttonsizeyes,
                    buttonsizeno: false,
                    carbide: false,
                    tapered: false,
                  })
                }
                // fontFamily={Fonts.FontAwesome}
                checkedColor={theme.colors.primary}
              />
              <CheckBox
                title="No"
                containerStyle={{
                  backgroundColor: 'transparent',
                  borderColor: 'transparent',
                }}
                checked={buttonsizeno}
                onPress={() =>
                  this.setState({
                    buttonsizeno: !this.state.buttonsizeno,
                    carbide: false,
                    tapered: false,
                    buttonsizeyes: false,
                  })
                }
                checkedColor={theme.colors.primary}
              />
              <CheckBox
                title="Carbide"
                containerStyle={{
                  backgroundColor: 'transparent',

                  borderColor: 'transparent',
                }}
                checked={carbide}
                onPress={() =>
                  this.setState({
                    carbide: !this.state.carbide,
                    buttonsizeno: false,
                    buttonsizeyes: false,
                    tapered: false,
                  })
                }
                checkedColor={theme.colors.primary}
              />
              <CheckBox
                title="Tapered"
                containerStyle={{
                  backgroundColor: 'transparent',
                  borderColor: 'transparent',
                }}
                checked={tapered}
                onPress={() =>
                  this.setState({
                    tapered: !this.state.tapered,
                    carbide: false,
                    buttonsizeno: false,
                    buttonsizeyes: false,
                  })
                }
                checkedColor={theme.colors.primary}
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
                <Text style={styles.rapper}>Powder</Text>
              </LinearGradient>
              <TextInput
                style={styles.small}
                onChangeText={text => this.setState({powder: text})}
                value={powder}
                underlineColorAndroid="transparent"
              />
            </View>
            <View style={{width: '40%'}}>
              <LinearGradient colors={['#000000', '#9C1313']}>
                <Text style={styles.rapper}>Measure</Text>
              </LinearGradient>
              <TextInput
                style={styles.small}
                onChangeText={text => this.setState({measure: text})}
                value={measure}
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
                <Text style={styles.rapper}>Weight in Grains</Text>
              </LinearGradient>
              <TextInput
                style={styles.small}
                onChangeText={text => this.setState({weight: text})}
                value={weight}
                underlineColorAndroid="transparent"
              />
            </View>
            <View style={{width: '40%'}}>
              <LinearGradient colors={['#000000', '#9C1313']}>
                <Text style={styles.rapper}>Micrometer Settings</Text>
              </LinearGradient>
              <TextInput
                style={styles.small}
                onChangeText={text => this.setState({mmseting: text})}
                value={mmseting}
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
                <Text style={styles.rapper}>Bullet Brand</Text>
              </LinearGradient>
              <TextInput
                style={styles.small}
                onChangeText={text => this.setState({buletbrand: text})}
                value={buletbrand}
                underlineColorAndroid="transparent"
              />
            </View>
            <View style={{width: '40%'}}>
              <LinearGradient colors={['#000000', '#9C1313']}>
                <Text style={styles.rapper}>Primer</Text>
              </LinearGradient>
              <TextInput
                style={styles.small}
                onChangeText={text => this.setState({primer: text})}
                value={primer}
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
                <Text style={styles.rapper}>Primer Type</Text>
              </LinearGradient>
              <TextInput
                style={styles.small}
                onChangeText={text => this.setState({primertype: text})}
                value={primertype}
                underlineColorAndroid="transparent"
              />
            </View>
            <View style={{width: '40%'}}>
              <LinearGradient colors={['#000000', '#9C1313']}>
                <Text style={styles.rapper}>Primer Lot #</Text>
              </LinearGradient>
              <TextInput
                style={styles.small}
                onChangeText={text => this.setState({primerlot: text})}
                value={primerlot}
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
                <Text style={styles.rapper}>Bullet Type</Text>
              </LinearGradient>
              <TextInput
                style={styles.small}
                onChangeText={text => this.setState({bullettype: text})}
                value={bullettype}
                underlineColorAndroid="transparent"
              />
            </View>
            <View style={{width: '40%'}}>
              <LinearGradient colors={['#000000', '#9C1313']}>
                <Text style={styles.rapper}>Lot #</Text>
              </LinearGradient>
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
              <LinearGradient colors={['#000000', '#9C1313']}>
                <Text style={styles.rapper}>Bullet Weight</Text>
              </LinearGradient>
              <TextInput
                style={styles.small}
                onChangeText={text => this.setState({bulletweight: text})}
                value={bulletweight}
                underlineColorAndroid="transparent"
              />
            </View>
            <View style={{width: '40%'}}>
              <LinearGradient colors={['#000000', '#9C1313']}>
                <Text style={styles.rapper}>Blastic Cofficient</Text>
              </LinearGradient>
              <TextInput
                style={styles.small}
                onChangeText={text => this.setState({blastic: text})}
                value={blastic}
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
            Seating Die :
          </Text>
          <View
            style={{
              alignSelf: 'center',
              width: '90%',
              //   backgroundColor: 'tomato',
              alignContent: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}>
              <CheckBox
                title="Standard"
                containerStyle={{
                  backgroundColor: 'transparent',
                  borderColor: 'transparent',
                }}
                checked={standard}
                onPress={() =>
                  this.setState({
                    standard: !this.state.standard,
                    premium: false,
                    competition: false,
                  })
                }
                // fontFamily={Fonts.FontAwesome}
                checkedColor={theme.colors.primary}
              />
              <CheckBox
                // titleProps={{font}}
                title="Premium"
                containerStyle={{
                  backgroundColor: 'transparent',
                  //   left: 25,
                  borderColor: 'transparent',
                }}
                checked={premium}
                onPress={() =>
                  this.setState({
                    premium: !this.state.premium,
                    competition: false,
                    standard: false,
                  })
                }
                checkedColor={theme.colors.primary}
                // fontFamily={Fonts.FontAwesome}
              />
              <CheckBox
                // titleProps={{fontFamily: Fonts.FontAwesome}}
                title="Competition"
                containerStyle={{
                  backgroundColor: 'transparent',
                  //   left: 25,
                  borderColor: 'transparent',
                }}
                checked={competition}
                onPress={() =>
                  this.setState({
                    competition: !this.state.competition,
                    standard: false,
                    premium: false,
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
            Micrometer :
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
                checked={mmyes}
                onPress={() =>
                  this.setState({
                    mmyes: !this.state.mmyes,
                    mmno: false,
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
                checked={mmno}
                onPress={() =>
                  this.setState({
                    mmno: !this.state.mmno,
                    mmyes: false,
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
            VLD Stem :
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
                checked={vldyes}
                onPress={() =>
                  this.setState({
                    vldyes: !this.state.vldyes,
                    vldno: false,
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
                checked={vldno}
                onPress={() =>
                  this.setState({
                    vldno: !this.state.vldno,
                    vldyes: false,
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
              width: '90%',
              alignSelf: 'center',
            }}>
            <View style={{width: '55%'}}>
              <LinearGradient colors={['#000000', '#9C1313']}>
                <Text style={styles.rapper}>Catridge Overall Length</Text>
              </LinearGradient>
              <TextInput
                style={styles.small}
                onChangeText={text => this.setState({catridgelength: text})}
                value={catridgelength}
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
                }}></Text>
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

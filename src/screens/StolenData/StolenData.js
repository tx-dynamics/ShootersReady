import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
  ImageBackground,
  Animated,
} from 'react-native';
import styles from './styles';
import theme from '../../theme';
import {Header, Divider, SearchBar} from 'react-native-elements';
import {user, m416, button} from '../../assets';
import HeaderCenterComponent from '../../components/HeaderCenterComponent';
import HeaderLeftComponent from '../../components/HeaderLeftComponent';
import LinearGradient from 'react-native-linear-gradient';
import Mailer from 'react-native-mail';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Snackbar from 'react-native-snackbar';
export default class StolenData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dat: [
        {
          id: 0,
          img: user,
          status: 'Stolen',
          make: 'Germany',
          model: 'hk416',
          caliber: '5.56mm x 45',
          bTwist: 'HK416',
          serial: '1942 AMC M422A1',
          optic: 'M .approx. 481.0 mm',
          notes:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempor lorem ut mattis consectetur. Duis suscipit urna vehicula ante luctus sodales sed in nisi.',
        },
        {
          id: 1,
          img: m416,
          status: 'Stolen',
          make: 'Germany',
          model: 'hk416',
          caliber: '5.56mm x 45',
          bTwist: 'HK416',
          serial: '1962 AMC M422A1',
          optic: 'M .approx. 481.0 mm',
          notes:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempor lorem ut mattis consectetur. Duis suscipit urna vehicula ante luctus sodales sed in nisi.',
        },
        {
          id: 2,
          status: 'Stolen',
          make: 'Germany',
          model: 'hk416',
          caliber: '5.56mm x 45',
          bTwist: 'HK416',
          serial: '1962 AMC M422A1',
          optic: 'M .approx. 481.0 mm',
          notes:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempor lorem ut mattis consectetur. Duis suscipit urna vehicula ante luctus sodales sed in nisi.',
        },
        {
          id: 3,
          status: 'Stolen',
          make: 'Germany',
          model: 'hk416',
          caliber: '5.56mm x 45',
          bTwist: 'HK416',
          serial: '1962 AMC M422A1',
          optic: 'M .approx. 481.0 mm',
          notes:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempor lorem ut mattis consectetur. Duis suscipit urna vehicula ante luctus sodales sed in nisi.',
        },
        {
          id: 4,
          status: 'Stolen',
          make: 'Germany',
          model: 'hk416',
          caliber: '5.56mm x 45',
          bTwist: 'HK416',
          serial: '1962 AMC M422A1',
          optic: 'M .approx. 481.0 mm',
          notes:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempor lorem ut mattis consectetur. Duis suscipit urna vehicula ante luctus sodales sed in nisi.',
        },
        {
          id: 5,
          status: 'Stolen',
          make: 'Germany',
          model: 'hk416',
          caliber: '5.56mm x 45',
          bTwist: 'HK416',
          serial: '1962 AMC M422A1',
          optic: 'M .approx. 481.0 mm',
          notes:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempor lorem ut mattis consectetur. Duis suscipit urna vehicula ante luctus sodales sed in nisi.',
        },
        {
          id: 6,
          status: 'Stolen',
          make: 'Germany',
          model: 'hk416',
          caliber: '5.56mm x 45',
          bTwist: 'HK416',
          serial: '1962 AMC M422A1',
          optic: 'M .approx. 481.0 mm',
          notes:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempor lorem ut mattis consectetur. Duis suscipit urna vehicula ante luctus sodales sed in nisi.',
        },
      ],
      search: '',
      data: [
        {
          id: 0,
          img: user,
          status: 'Stolen',
          make: 'Germany',
          model: 'hk416',
          caliber: '5.56mm x 45',
          bTwist: 'HK416',
          serial: '1942 AMC M422A1',
          optic: 'M .approx. 481.0 mm',
          notes:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempor lorem ut mattis consectetur. Duis suscipit urna vehicula ante luctus sodales sed in nisi.',
        },
        {
          id: 1,
          img: m416,
          status: 'Stolen',
          make: 'Germany',
          model: 'hk416',
          caliber: '5.56mm x 45',
          bTwist: 'HK416',
          serial: '1962 AMC M422A1',
          optic: 'M .approx. 481.0 mm',
          notes:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempor lorem ut mattis consectetur. Duis suscipit urna vehicula ante luctus sodales sed in nisi.',
        },
        {
          id: 2,
          status: 'Stolen',
          make: 'Germany',
          model: 'hk416',
          caliber: '5.56mm x 45',
          bTwist: 'HK416',
          serial: '1962 AMC M422A1',
          optic: 'M .approx. 481.0 mm',
          notes:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempor lorem ut mattis consectetur. Duis suscipit urna vehicula ante luctus sodales sed in nisi.',
        },
        {
          id: 3,
          status: 'Stolen',
          make: 'Germany',
          model: 'hk416',
          caliber: '5.56mm x 45',
          bTwist: 'HK416',
          serial: '1962 AMC M422A1',
          optic: 'M .approx. 481.0 mm',
          notes:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempor lorem ut mattis consectetur. Duis suscipit urna vehicula ante luctus sodales sed in nisi.',
        },
        {
          id: 4,
          status: 'Stolen',
          make: 'Germany',
          model: 'hk416',
          caliber: '5.56mm x 45',
          bTwist: 'HK416',
          serial: '1962 AMC M422A1',
          optic: 'M .approx. 481.0 mm',
          notes:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempor lorem ut mattis consectetur. Duis suscipit urna vehicula ante luctus sodales sed in nisi.',
        },
        {
          id: 5,
          status: 'Stolen',
          make: 'Germany',
          model: 'hk416',
          caliber: '5.56mm x 45',
          bTwist: 'HK416',
          serial: '1962 AMC M422A1',
          optic: 'M .approx. 481.0 mm',
          notes:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempor lorem ut mattis consectetur. Duis suscipit urna vehicula ante luctus sodales sed in nisi.',
        },
        {
          id: 6,
          status: 'Stolen',
          make: 'Germany',
          model: 'hk416',
          caliber: '5.56mm x 45',
          bTwist: 'HK416',
          serial: '1962 AMC M422A1',
          optic: 'M .approx. 481.0 mm',
          notes:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempor lorem ut mattis consectetur. Duis suscipit urna vehicula ante luctus sodales sed in nisi.',
        },
      ],
      item: [],
      status: 'Stolen',
      make: 'Germany',
      model: 'hk416',
      caliber: '5.56mm x 45',
      bTwist: 'HK416',
      serial: '1962 AMC M422A1',
      optic: 'M .approx. 481.0 mm',
      notes:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempor lorem ut mattis consectetur. Duis suscipit urna vehicula ante luctus sodales sed in nisi.',
    };
  }
  handleHelp() {
    console.log('HERE');
    Mailer.mail(
      {
        subject: 'Shooter Ready',
        // recipients: ['malikmati49@gmail.com'],
        attachment: [
          {
            // uri: RNFS.ExternalDirectoryPath+file,
            // path: file, // The absolute path of the file from which to read data.
            type: '.pdf', // Mime Type: jpg, png, doc, ppt, html, pdf
            name: 'Shooter Ready', // Optional: Custom filename for attachment
          },
        ],
      },
      (error, event) => {
        if (error) {
          AlertIOS.alert(
            'Error',
            'Could not send mail. Please send a mail to support@example.com',
          );
        }
      },
    );
  }
  updateSearch = search => {
    this.setState({search});
    let text = search.toLowerCase();
    let dat = this.state.dat;
    const newData = dat.filter(srch => {
      return srch.serial.toLowerCase().match(text);
    });
    console.log(newData);
    this.setState({data: newData});
  };
  componentDidMount() {
    this.getData();
  }
  getData() {
    const item = this.props.navigation.getParam('item');
    console.log('item=====>', item);
    this.setState({item});
  }

  render() {
    const {
      item,
      status,
      make,
      model,
      caliber,
      bTwist,
      serial,
      optic,
      notes,
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
                  Missing/Stolen Gun
                </Text>
              </TouchableOpacity>
            </ImageBackground>
          </View>
        </View>

        <ScrollView style={{flex: 1, flexGrow: 1}}>
          <Image
            source={{uri: `${item.img}`}}
            borderRadius={20}
            style={styles.userImgStyle}
            resizeMode={'contain'}
          />

          <View
            style={{
              marginTop: 5,
              width: '100%',
              // justifyContent: 'space-around',
              flexDirection: 'row',
              marginLeft: 15,
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
                  {item.status}
                </Text>
              </TouchableOpacity>
            </ImageBackground>
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
                <Text style={styles.rapper}>Make</Text>
              </LinearGradient>
              <Text style={styles.small}>{item.make}</Text>
            </View>
            <View style={{width: '40%'}}>
              <LinearGradient colors={['#000000', '#9C1313']}>
                <Text style={styles.rapper}>Model</Text>
              </LinearGradient>
              <Text style={styles.small}>{item.model}</Text>
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
                <Text style={styles.rapper}>Caliber</Text>
              </LinearGradient>
              <Text style={styles.small}>{item.caliber}</Text>
            </View>
            <View style={{width: '40%'}}>
              <LinearGradient colors={['#000000', '#9C1313']}>
                <Text style={styles.rapper}>Twist</Text>
              </LinearGradient>
              <Text style={styles.small}>{item.bTwist}</Text>
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
                <Text style={styles.rapper}>Serial #</Text>
              </LinearGradient>
              <Text style={styles.small}>{item.serial}</Text>
            </View>
            <View style={{width: '40%'}}>
              <LinearGradient colors={['#000000', '#9C1313']}>
                <Text style={styles.rapper}>Optics</Text>
              </LinearGradient>
              <Text style={styles.small}>{item.optic}</Text>
            </View>
          </View>
          <View style={{width: '90%', alignSelf: 'center', marginTop: 10}}>
            <LinearGradient colors={['#000000', '#9C1313']}>
              <Text style={styles.rapper}>Details : How Stolen/Lost</Text>
            </LinearGradient>
            <Text style={styles.small}>{item.notes}</Text>
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
              <TouchableOpacity>
                <Text
                  style={{
                    color: 'white',
                    // backgroundColor: theme.colors.primary,
                    padding: 20,
                    textAlign: 'center',
                    // borderRadius: 5,
                  }}>
                  Log Stolen Gun
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
              <TouchableOpacity
                // style={{width: '40%'}}
                onPress={() => {
                  this.props.navigation.navigate('EditStolenGun', {item});
                }}>
                <Text
                  style={{
                    color: 'white',
                    // backgroundColor: '#A50202',
                    padding: 20,
                    textAlign: 'center',
                    // borderRadius: 5,
                  }}>
                  Edit
                </Text>
              </TouchableOpacity>
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
                // style={{width: '40%'}}
                onPress={() =>
                  this.props.navigation.navigate('MissingReport', {
                    status,
                    make,
                    model,
                    caliber,
                    bTwist,
                    serial,
                    optic,
                    notes,
                  })
                }>
                <Text
                  style={{
                    color: 'white',
                    // backgroundColor: theme.colors.gray,
                    padding: 20,
                    textAlign: 'center',
                    borderRadius: 5,
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
              <TouchableOpacity onPress={() => this.handleHelp()}>
                <Text
                  style={{
                    color: 'white',
                    // backgroundColor: theme.colors.gray,
                    padding: 20,
                    textAlign: 'center',
                    borderRadius: 5,
                    alignSelf: 'center',
                  }}>
                  Email
                </Text>
              </TouchableOpacity>
            </ImageBackground>
          </View>
        </ScrollView>
      </View>
    );
  }
}

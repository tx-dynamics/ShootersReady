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
  Dimensions,
} from 'react-native';
import styles from './styles';
import theme from '../../theme';
import {Header, Divider} from 'react-native-elements';
import {user, m416, akm, tommy} from '../../assets';
import HeaderCenterComponent from '../../components/HeaderCenterComponent';
import HeaderLeftComponent from '../../components/HeaderLeftComponent';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Snackbar from 'react-native-snackbar';
import PDFView from 'react-native-view-pdf';
import Mailer from 'react-native-mail';
import RNPrint from 'react-native-print';
export default class MissingReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filePath: '',
      make: 'Germany',
      buton: '',
      show: false,
      model: 'hk416',
      caliber: '5.56mm x 45',
      serial: '1962 AMC M422A1',
      optic: 'M .approx. 481.0 mm',
      status: 'stolen',
      fire: '500',
      hand: '400',
      whenPurchase: '17-2-2020',
      Where: 'NY, Gun Street',
      bLength: '',
      bTwist: 'HK416',
      bManu: '',
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
      details:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempor lorem ut mattis consectetur. Duis suscipit urna vehicula ante luctus sodales sed in nisi.',
    };
  }
  componentDidMount() {
    const make = this.props.navigation.getParam('make');
    const model = this.props.navigation.getParam('model');
    const Where = this.props.navigation.getParam('Where');
    const bLength = this.props.navigation.getParam('bLength');
    const bTwist = this.props.navigation.getParam('bTwist');
    const details = this.props.navigation.getParam('notes');
    const whenPurchase = this.props.navigation.getParam('whenPurchase');
    const hand = this.props.navigation.getParam('hand');
    const fire = this.props.navigation.getParam('fire');
    const optic = this.props.navigation.getParam('optic');
    const serial = this.props.navigation.getParam('serial');
    const caliber = this.props.navigation.getParam('caliber');

    this.setState({
      make,
      model,
      whenPurchase,
      Where,
      bLength,
      bTwist,
      details,
      hand,
      fire,
      optic,
      serial,
      caliber,
    });
  }

  async htmltopdf() {
    let options = await RNPrint.print({
      // HTML Content for PDF.
      // I am putting all the HTML code in Single line but if you want to use large HTML code then you can use + Symbol to add them.
      html: `<h1 style="text-align: center;"><strong>Shooters Ready</strong></h1>
      <p style=" font-family: courier;",
     " font-family: verdana;",
      "font-size: 80%;",
      "margin-left:10%;">Gun Model: ${this.state.model}</p>
      <p style=" font-family: courier;",
      " font-family: verdana;",
       "font-size: 80%;",
       "margin-left:10%;">Gun Make: ${this.state.model}</p>
       <p style=" font-family: courier;",
       " font-family: verdana;",
        "font-size: 80%;",
        "margin-left:10%;">Gun Status: ${this.state.status}</p>
       <p style=" font-family: courier;",
       " font-family: verdana;",
        "font-size: 80%;",
        "margin-left:10%;">Gun Caliber: ${this.state.caliber}</p>
        <p style=" font-family: courier;",
        " font-family: verdana;",
         "font-size: 80%;",
         "margin-left:10%;">Gun Serial: ${this.state.serial}</p>
         <p style=" font-family: courier;",
         " font-family: verdana;",
          "font-size: 80%;",
          "margin-left:10%;">Gun Optic: ${this.state.optic}</p>
          <p style=" font-family: courier;",
          " font-family: verdana;",
           "font-size: 80%;",
           "margin-left:10%;">Rounds Fired: ${this.state.fire}</p>
           <p style=" font-family: courier;",
           " font-family: verdana;",
            "font-size: 80%;",
            "margin-left:10%;">Rounds on Hands: ${this.state.hand}</p>
            <p style=" font-family: courier;",
            " font-family: verdana;",
             "font-size: 80%;",
             "margin-left:10%;">Where it Purchased: ${this.state.Where}</p>
             <p style=" font-family: courier;",
             " font-family: verdana;",
              "font-size: 80%;",
              "margin-left:10%;">When Purchased: ${this.state.whenPurchase}</p>
              <p style=" font-family: courier;",
              " font-family: verdana;",
               "font-size: 80%;",
               "margin-left:10%;">Barrel Length: ${this.state.bLength}</p>
               <p style=" font-family: courier;",
               " font-family: verdana;",
                "font-size: 80%;",
                "margin-left:10%;">Barrel Twist: ${this.state.bTwist}</p>
                <p style=" font-family: courier;",
                " font-family: verdana;",
                 "font-size: 80%;",
                 "margin-left:10%;">Barrel Manufacture: ${this.state.bManu}</p>
                 <p style=" font-family: courier;",
                 " font-family: verdana;",
                  "font-size: 80%;",
                  "margin-left:10%;">Notes: ${this.state.details}</p>
      `,
      fileName: `${this.state.serial}`,

      //File directory in which the PDF File Will Store.
      directory: 'Download',
    });

    console.log(options);
  }

  render() {
    const {model, serial, status, filePath, show} = this.state;
    const resources = {
      file: filePath,
      // url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      base64: 'JVBERi0xLjMKJcfs',
    };
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
        <TouchableOpacity
          onPress={() => {
            this.htmltopdf();
          }}>
          <LinearGradient
            colors={['#000000', '#9C1313']}
            style={{
              // flex: 1,
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
              source={user}
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
                {model}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: 'white',
                }}>
                {`${serial} - ${status}`}
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
        {/* {show ? (
          <PDFView
            fadeInDuration={250.0}
            style={{flex: 1}}
            resource={resources['file']}
            resourceType={'file'}
            onLoad={() => console.log(`PDF rendered from `)}
            onError={error => console.log('Cannot render PDF', error)}
            enableAnnotations
          />
        ) : null} */}
      </View>
    );
  }
}

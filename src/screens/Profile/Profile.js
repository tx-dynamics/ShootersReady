import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Image,
  FlatList,
  ImageBackground,
} from 'react-native';
import styles from './styles';
import {Header, Divider} from 'react-native-elements';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import style from './styles';
import {logo, user, button} from '../../assets';
import theme from '../../theme';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import HeaderCenterComponent from '../../components/HeaderCenterComponent';
import HeaderLeftComponent from '../../components/HeaderLeftComponent';
import LinearGradient from 'react-native-linear-gradient';
export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      img: '',
      currentUser: '',
      name: 'Cortlin Martin',
      data: [
        {id: 0, name: 'M416', serial: '1962 AMC M422A1', img: ''},
        {id: 1, name: 'AKM', serial: '1962 AMC M422A1', img: ''},
        {id: 2, name: 'Thomson', serial: '1962 AMC M422A1', img: ''},
      ],
    };
  }
  componentDidMount = async () => {
    this.data();
  };
  data = async () => {
    var curuser = auth().currentUser;
    this.setState({name: curuser.displayName});
    const profile = database().ref('users/' + curuser.uid);
    profile.on('value', user => {
      this.setState({img: user.val().dp});
    });
    const d = database().ref('users/' + curuser.uid + '/gun/');
    d.on('value', userdata => {
      var dat = [];
      userdata.forEach(child => {
        dat.push({
          id: child.key,
          name: child.val().name,
          serial: child.val().serial,
          img: child.val().image,
          make: child.val().make,
          model: child.val().model,
          caliber: child.val().caliber,
          fire: child.val().fire,
          hand: child.val().hand,
          notes: child.val().notes,
          whenPurchase: child.val().whenPurchase,
          where: child.val().Where,
          bLength: child.val().blength,
          bManu: child.val().bManu,
          bTwist: child.val().bTwist,
        });
        console.log('dat===>', dat);
        this.setState({data: dat});
      });
    });
  };

  renderGun = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate('GunInventDetail', {item});
        }}
        key={index}
        style={{
          // flex: 1,
          // marginHorizontal: 5,
          alignContent: 'center',
          alignSelf: 'center',
          margin: 10,
          marginRight: 10,
        }}>
        <Image
          borderTopLeftRadius={10}
          borderTopRightRadius={10}
          resizeMode={'cover'}
          source={
            item.img
              ? {
                  uri: `${item.img}`,
                }
              : user
          }
          style={{
            height: 175,
            width: 175,
            // justifyContent: 'flex-end',
            // backgroundColor: 'tomato',
            alignItems: 'center',
            justifyContent: 'flex-end',
            alignSelf: 'center',
            // margin: 5,
            // padding: 20,
          }}
        />
        <View>
          <LinearGradient
            colors={['#000000', '#9C1313']}
            style={{
              backgroundColor: theme.colors.primary,
              width: 175,
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
              padding: 10,
              alignSelf: 'center',
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 14,
                marginLeft: 10,
              }}>
              {item.model}
            </Text>
            <Text
              style={{
                color: 'black',
                fontSize: 14,
                marginLeft: 10,
                color: 'white',
              }}>
              {item.serial}
            </Text>
          </LinearGradient>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    const {fname, lname, cname, cell, email} = this.state;
    return (
      <ScrollView style={style.container}>
        <Header
          backgroundColor={'white'}
          containerStyle={{borderBottomWidth: 0}}
          centerComponent={<HeaderCenterComponent name="SHOOTERS READY" />}
          leftComponent={
            <HeaderLeftComponent navigation={this.props.navigation} icon={''} />
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
                  Profile
                </Text>
              </TouchableOpacity>
            </ImageBackground>
          </View>
        </View>
        <TouchableOpacity
          style={style.edit}
          onPress={() => this.props.navigation.navigate('EditProfile')}>
          <FontAwesome5 name="user-edit" color="black" size={30} />
        </TouchableOpacity>

        <View style={{alignItems: 'center', flex: 0.2}}>
          <View
            style={{
              flexDirection: 'row',
            }}>
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
                height: 100,
                width: 100,
                // alignSelf: 'center',
                // justifyContent: 'flex-end',
                marginTop: 10,
                borderColor: theme.colors.primary,
                borderRadius: 100,
                borderWidth: 2,
                // flex: 0.3,
              }}
            />
          </View>
          <Text style={[styles.largeText, {marginTop: 10}]}>
            {this.state.name}
          </Text>
          <Divider
            style={{
              marginTop: 15,
              backgroundColor: theme.colors.primary,
              height: 2,
              width: '60%',
            }}
          />
        </View>

        <View>
          <Text style={[styles.mediumText, {marginTop: 10}]}>
            Recent Gun Profiles
          </Text>
        </View>
        <FlatList
          data={this.state.data}
          extraData={this.state.data}
          contentContainerStyle={
            {
              // alignSelf: 'center',
            }
          }
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={this.renderGun}
          keyExtractor={(item, index) => item + index.toString()}
        />
      </ScrollView>
    );
  }
}

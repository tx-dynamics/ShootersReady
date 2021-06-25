import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  FlatList,
  Animated,
} from 'react-native';
import styles from './styles';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import theme from '../../theme';
import {Header, Divider} from 'react-native-elements';
import {user, button} from '../../assets';
import HeaderCenterComponent from '../../components/HeaderCenterComponent';
import HeaderLeftComponent from '../../components/HeaderLeftComponent';
import LinearGradient from 'react-native-linear-gradient';
export default class GunInventory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }
  componentDidMount() {
    this.getData();
  }
  getData() {
    const user = auth().currentUser;
    const data = database().ref('users/' + user.uid + '/gun/');
    console.log(data !== null);

    data.on('value', userdata => {
      var dat = [];
      userdata.forEach(child => {
        if (child.val() !== null) {
          console.log('Val', child.val().id);
          dat.push({
            id: child.key,
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
        }
      });
    });
  }
  renderGun = ({item, index}) => {
    const AnimatedLinearGradient = Animated.createAnimatedComponent(
      LinearGradient,
    );
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate('GunInventDetail', {item});
        }}
        key={index}
        style={{
          flex: 0.5,
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
              : null
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
        <View
          style={{
            // backgroundColor: theme.colors.primary,
            width: 175,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            // padding: 10,
            alignSelf: 'center',
          }}>
          <AnimatedLinearGradient
            colors={['#000000', '#9C1313']}
            style={{
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
          </AnimatedLinearGradient>
        </View>
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
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('Main');
                }}>
                <Text
                  style={{
                    color: 'white',
                    // backgroundColor: '#A50202',
                    padding: 20,
                    textAlign: 'center',
                    // borderRadius: 5,
                  }}>
                  Gun Inventory
                </Text>
              </TouchableOpacity>
            </ImageBackground>
          </View>
        </View>
        <FlatList
          data={this.state.data && this.state.data}
          extraData={this.state}
          showsHorizontalScrollIndicator={false}
          renderItem={this.renderGun}
          numColumns={2}
          keyExtractor={(item, index) => item + index.toString()}
        />
      </View>
    );
  }
}

import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ImageBackground,
} from 'react-native';
import {button} from '../../assets';
import LinearGradient from 'react-native-linear-gradient';
import theme from '../../theme';
import {Header, Divider} from 'react-native-elements';
import HeaderCenterComponent from '../../components/HeaderCenterComponent';
import HeaderLeftComponent from '../../components/HeaderLeftComponent';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

export default class Notes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ammo: [
        {
          id: 0,
          name: 'M416',
          notes:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempor lorem ut mattis consectetur. Duis suscipit urna vehicula ante luctus sodales sed in nisi.',
        },
        {
          id: 0,
          name: 'AKM',
          notes:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempor lorem ut mattis consectetur. Duis suscipit urna vehicula ante luctus sodales sed in nisi.',
        },
        {
          id: 0,
          name: 'AWM',
          notes:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempor lorem ut mattis consectetur. Duis suscipit urna vehicula ante luctus sodales sed in nisi.',
        },
      ],
      shownotes: false,
      id: '',
      screen: 'add',
    };
  }
  componentDidMount() {
    this.getData();
  }
  getData() {
    const user = auth().currentUser;
    const data = database().ref('users/' + user.uid + '/gun/');
    data.on('value', userdata => {
      var dat = [];
      userdata.forEach(child => {
        dat.push({
          id: child.key,
          name: child.val().model,
          notes: child.val().notes,
        });
        console.log('dat===>', dat);
        this.setState({ammo: dat});
      });
    });
  }
  datarender = ({item, index}) => {
    return (
      <View style={{flex: 1}}>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('ShowNotes', {
              item,
            });
          }}>
          <LinearGradient
            style={{
              marginTop: 20,
              width: '90%',
              backgroundColor: theme.colors.primary,
              alignSelf: 'center',
              padding: 20,
              borderRadius: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
            colors={['#000000', '#9C1313']}>
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
                {item.name}
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
      </View>
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
        <View
          style={{
            alignItems: 'center',
            marginTop: 30,
            // flex: 0.1,
          }}>
          <Divider
            style={{
              backgroundColor: theme.colors.primary,
              height: 1,
              width: '50%',
            }}
          />
        </View>
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
                Notes
              </Text>
            </TouchableOpacity>
          </ImageBackground>
        </View>

        <FlatList
          data={this.state.ammo}
          extraData={this.state.ammo}
          contentContainerStyle={
            {
              // alignSelf: 'center',
            }
          }
          showsHorizontalScrollIndicator={false}
          renderItem={this.datarender}
          // numColumns={2}
          keyExtractor={(item, index) => item + index.toString()}
        />
      </View>
    );
  }
}

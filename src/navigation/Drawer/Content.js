import React, {Component} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {Header} from 'react-native-elements';
import {DrawerItems} from 'react-navigation-drawer';
import theme from '../../theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {logo} from '../../assets';
import auth from '@react-native-firebase/auth';
import Snackbar from 'react-native-snackbar';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'solutionplayer@gmail.com',
      uname: 'Solution Player',
      isLoggingIn: false,
    };
  }
  componentDidMount = () => {};
  signout = () => {
    auth()
      .signOut()
      .then(() => {
        console.log(' sign out!');
        this.setState({loading: false}, () =>
          this.props.navigation.navigate('Home'),
        );
        Snackbar.show({
          text: ' sign out!',
          backgroundColor: 'black',
          duration: Snackbar.LENGTH_LONG,
        });
      });
  };

  render() {
    return (
      <SafeAreaView
        style={styles.mainContainer}
        forceInset={{top: 'always', horizontal: 'never'}}>
        <Header
          backgroundColor={'white'}
          containerStyle={{borderBottomWidth: 0}}
        />
        {/* <ImageBackground
          style={styles.drawerHeaderContainer}
          resizeMode={'cover'}
          source={splash}> */}
        <View style={styles.blurView}>
          <ImageBackground
            source={logo}
            style={styles.userIcon}
            imageStyle={{borderRadius: 40}}></ImageBackground>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Main')}
              style={{
                alignSelf: 'center',
                // backgroundColor: 'tomato',
                marginTop: 10,
              }}>
              <Ionicons name="arrow-back" size={29} />
            </TouchableOpacity>
            <Text style={styles.largeText}>SHOOTERS READY</Text>
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.drawerItemsContainerStyle}>
          <DrawerItems {...this.props} />
        </ScrollView>
        <View
          onPress={() => this.props.navigation.navigate('SignIn')}
          style={{justifyContent: 'flex-end'}}>
          <View style={styles.item}>
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons
                name="logout"
                size={24}
                color={'white'}
                style={{
                  backgroundColor: theme.colors.primary,
                  borderRadius: 5,
                }}
              />
            </View>

            <TouchableOpacity onPress={this.signout}>
              <Text style={styles.label}>Log Out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
  },
  drawerHeaderContainer: {
    height: Dimensions.get('window').height / 2.5,
    width: '100%',
  },
  drawerItemsContainerStyle: {
    flex: 0.6,
    // backgroundColor: 'tomato',
  },
  userIcon: {
    borderRadius: 35,
    alignItems: 'flex-end',
    height: 70,
    width: 70,
    marginLeft: 5,
  },
  largeText: {
    fontSize: 20,
    marginTop: 10,
    // color: theme.colors.lightGray,
    marginLeft: 8,
    alignSelf: 'center',
  },
  logOutStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    margin: 18,
    fontSize: 14,
    color: 'black',
    fontWeight: 'bold',
  },
  iconContainer: {
    marginHorizontal: 16,
    width: 24,
    tintColor: 'orange',
    alignItems: 'center',
  },
  blurView: {
    backgroundColor: 'white',
    height: Dimensions.get('window').height / 6,
    // flexDirection: 'row',
    // justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 20,
  },
});

export default Content;

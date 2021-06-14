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
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import theme from '../../theme';
import {button} from '../../assets';
import {Header, Divider} from 'react-native-elements';
import HeaderCenterComponent from '../../components/HeaderCenterComponent';
import HeaderLeftComponent from '../../components/HeaderLeftComponent';
import LinearGradient from 'react-native-linear-gradient';
export default class ShowNotes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: '',
      name: '',
      edit: false,
      add: false,
      gid: '',
      isLoading: false,
    };
  }
  componentDidMount() {
    const item = this.props.navigation.getParam('item');

    this.setState({name: item.name, notes: item.notes, gid: item.id});
    console.log(item.id);
  }
  update() {
    const {notes, gid} = this.state;
    const updata = {notes};
    const user = auth().currentUser.uid;
    const data = database().ref('users/' + user + '/gun/' + gid);
    data
      .update(updata)
      .then(res => {
        console.log('====>>>', res);
        this.setState({isLoading: false}, () =>
          this.props.navigation.navigate('Notes'),
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
            flexDirection: 'row',
            // backgroundColor: 'tomato',
            width: '75%',
            justifyContent: 'space-between',
            alignSelf: 'flex-end',
            alignItems: 'flex-end',
          }}>
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
            <TouchableOpacity
              style={{alignSelf: 'center'}}
              onPress={() => {
                this.setState({edit: !this.state.edit});
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  marginRight: 10,
                  fontWeight: 'bold',
                  fontSize: 16,
                }}>
                + edit
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView>
          <View style={{flex: 0.8}}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Notes')}>
              <LinearGradient
                colors={['#000000', '#9C1313']}
                style={{
                  marginTop: 20,
                  width: '90%',
                  backgroundColor: theme.colors.primary,
                  alignSelf: 'center',
                  padding: 20,
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
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
                    {this.state.name}
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
            {this.state.edit ? (
              <TextInput
                multiline
                style={{
                  width: '90%',
                  // backgroundColor: theme.colors.primary,
                  alignSelf: 'center',
                  padding: 20,
                  borderBottomLeftRadius: 10,
                  borderBottomRightRadius: 10,
                  borderWidth: 1,
                  color: 'black',
                  // textAlign: 'left',
                }}
                onChangeText={text => this.setState({notes: text})}
                value={this.state.notes}
                underlineColorAndroid="transparent"
              />
            ) : (
              <Text
                style={{
                  // marginTop: 20,
                  width: '90%',
                  // backgroundColor: theme.colors.primary,
                  alignSelf: 'center',
                  padding: 20,
                  borderBottomLeftRadius: 10,
                  borderBottomRightRadius: 10,
                  borderWidth: 1,
                  textAlign: 'left',
                }}>
                {this.state.notes}
              </Text>
            )}
          </View>
          <View
            style={{
              marginTop: 10,
              width: '100%',
              justifyContent: 'space-around',
              flexDirection: 'row',
              // top: 20,
              // marginBottom: 20,
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
                  }}
                />
              ) : null}
              {this.state.edit ? (
                <TouchableOpacity
                  onPress={() => {
                    this.setState({isLoading: true, edit: false}, () => {
                      // this.props.navigation.navigate('Main');
                    });
                    this.update();
                  }}>
                  <Text
                    style={{
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: 20,
                      textAlign: 'center',
                      padding: 20,
                    }}>
                    Save
                  </Text>
                </TouchableOpacity>
              ) : (
                <Text />
              )}
            </ImageBackground>
          </View>
        </ScrollView>
      </View>
    );
  }
}

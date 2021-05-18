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
  Dimensions,
} from 'react-native';
import styles from '../Vault/styles';
import theme from '../../theme';
import {Header, Divider} from 'react-native-elements';
import {logo, m416, akm, tommy} from '../../assets';
import HeaderCenterComponent from '../../components/HeaderCenterComponent';
import HeaderLeftComponent from '../../components/HeaderLeftComponent';
export default class ShowNotes extends Component {
  constructor(props) {
    super(props);
    this.state = {notes: '', name: '', edit: false, add: false};
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
            marginTop: 10,
            flex: 0.05,
            // backgroundColor: 'tomato',
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
            flex: 0.2,
          }}>
          <TouchableOpacity
            style={{
              width: '70%',
              backgroundColor: '#A50202',
              borderRadius: 8,
              padding: 15,
              marginTop: 10,
              // borderColor: 'white',
              // borderWidth: 1,
              alignSelf: 'center',
            }}>
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: 20,
                textAlign: 'center',
              }}>
              Notes
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{flex: 0.7}}>
          <TouchableOpacity
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
                width: '40%',
              }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: 'white',
                }}>
                Add Notes
              </Text>
            </View>
          </TouchableOpacity>
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
        </View>

        <View
          style={{
            marginTop: 10,
            width: '100%',
            justifyContent: 'space-around',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            style={{width: '40%'}}
            onPress={() => {
              this.props.navigation.navigate('Notes');
            }}>
            <Text
              style={{
                color: 'white',
                backgroundColor: theme.colors.gray,
                padding: 20,
                textAlign: 'center',
                borderRadius: 5,
              }}>
              Canel
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{width: '40%'}}
            onPress={() => {
              this.props.navigation.navigate('Notes');
            }}>
            <Text
              style={{
                color: 'white',
                backgroundColor: '#A50202',
                padding: 20,
                textAlign: 'center',
                borderRadius: 5,
              }}>
              + Add Notes
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

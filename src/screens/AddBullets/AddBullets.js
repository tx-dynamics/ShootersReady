import {Divider, Header} from 'react-native-elements';
import {
  ImageBackground,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,AsyncStorage
} from 'react-native';
import React, {useEffect} from 'react';
import HeaderCenterComponent from '../../components/HeaderCenterComponent';
import HeaderLeftComponent from '../../components/HeaderLeftComponent';
import {button} from '../../assets';
import theme from '../../theme';
import {useState} from 'react';
import styles from '../BulletCalculator/styles';
import Snackbar from 'react-native-snackbar';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import bullets from '../BulletCalculator/bullets';
// console.log(JSON.stringify(result));
function AddBullets({navigation}) {

  const [bulletData, setbulletData] = useState();
  const [balisticCoef, setbalisticCoef] = useState('');
  const [velocity, setvelocity] = useState('');
  const [bweight, setbweight] = useState('');
  const [bcaliber, setbcaliber] = useState('');
  const [name, setname] = useState('');
async  function onaddBullet(){
      if(balisticCoef!==''&& velocity!==''&&bweight!==''&&bcaliber!==''&&name!=='')
   { var newPostKey = database()
    .ref('Bullets/' + auth()?.currentUser?.uid)
    // .child('/data')
    .push().key;
    try {
      console.log('post key===\n', newPostKey);
      const bullet = {
        id: newPostKey,
        name,
        grains: bweight,
        coeff: balisticCoef,
        velocity,
        bcaliber
     
      };
    const dates= await AsyncStorage.getItem('bullets');
    const dat=JSON.parse(dates);
    
    if(dat!==null)
      {  setbulletData([...dat, bullet]);
        console.log('notnull',[...dat, bullet]);
      }else{
        console.log('bulletData',bulletData);
        setbulletData([...bullets,bullet])
      }
       
     await AsyncStorage.setItem('bullets',dat!==null? JSON.stringify([...dat, bullet]):JSON.stringify(bullets));
        navigation.push('BulletCalculator');
      } catch (error) {
        console.log(error.message);
      }
   

}else{
        Snackbar.show({
            text:'Fill all the fields',
            backgroundColor: 'red',
          });
    }
  };
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Header
        backgroundColor={'white'}
        containerStyle={{borderBottomWidth: 0}}
        centerComponent={<HeaderCenterComponent name="SHOOTERS READY" />}
        leftComponent={<HeaderLeftComponent navigation={navigation} />}
      />
      <View style={{alignItems: 'center', marginTop: 30, marginBottom: 15}}>
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
               Add Bullets
              </Text>
            </TouchableOpacity>
          </ImageBackground>
        </View>
      </View>
      <ScrollView>
        <View
          style={{
            flexDirection: 'row',
           
            marginTop: 20,
            width: '90%',
            alignSelf: 'center',
            justifyContent: 'space-between',
            marginBottom: 10,
          }}>
          <Text style={{fontSize: 14, fontWeight: 'bold', alignSelf: 'center'}}>
            Bullet Caliber
          </Text>
          <View style={{ width: '70%', }}>
          <TextInput
            style={[styles.small, {}]}
            onChangeText={value => setbcaliber(value)}
            value={bcaliber}
            underlineColorAndroid="transparent"
          />
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 20,
            width: '90%',
            alignSelf: 'center',
            justifyContent:'space-between',
            marginBottom: 10,
          }}>
          <Text style={{fontSize: 14, fontWeight: 'bold', alignSelf: 'center'}}>
            Bullet Name
          </Text>
          <View style={{borderColor: 'black', width: '70%'}}>
          <TextInput
            style={[styles.small, ]}
            onChangeText={value => setname(value)}
            value={name}
            underlineColorAndroid="transparent"
          />
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 15,
            width: '90%',
            alignSelf: 'center',
            justifyContent: 'space-between',
            marginBottom: 10,
          }}>
          <Text style={{fontSize: 14, fontWeight: 'bold', alignSelf: 'center'}}>
            Ballistic Coefficient
          </Text>
          <TextInput
            style={[styles.small, {width: '50%'}]}
            onChangeText={value => setbalisticCoef(value)}
            value={balisticCoef}
            keyboardType='number-pad'
            underlineColorAndroid="transparent"
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 15,
            width: '90%',
            alignSelf: 'center',
            justifyContent: 'space-between',
            marginBottom: 10,
          }}>
          <Text style={{fontSize: 14, fontWeight: 'bold', alignSelf: 'center'}}>
            Initial Velocity (f/s)
          </Text>
          <TextInput
            style={[styles.small, {width: '50%'}]}
            onChangeText={value => setvelocity(value)}
            keyboardType='number-pad'
            value={velocity}
            underlineColorAndroid="transparent"
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 15,
            width: '90%',
            alignSelf: 'center',
            justifyContent: 'space-between',
            marginBottom: 10,
          }}>
          <Text style={{fontSize: 14, fontWeight: 'bold', alignSelf: 'center'}}>
            Bullet Weight(grans)
          </Text>
          <TextInput
            style={[styles.small, {width: '50%'}]}
            keyboardType='number-pad'
            onChangeText={value => setbweight(value)}
            value={bweight}
            underlineColorAndroid="transparent"
          />
        </View>
        <View
          style={{
            width: '100%',
            marginTop: 20,
            marginBottom: 10,
            paddingHorizontal: 10,
          }}>
          <View
            style={{
              width: '100%',
              alignItems: 'flex-start',
            }}>
            <ImageBackground
              style={{
                height: null,
                width: '100%',
                resizeMode: 'cover',
                borderRadius: 40,
              }}
              source={button}
              imageStyle={{borderRadius: 10}}>
              <TouchableOpacity
                // style={{width: '50%'}}
                onPress={
                    onaddBullet
                }
                // onPress={()=>{onaddBullet(),setadd(!add)}}
                >
                <Text
                  style={{
                    color: 'white',
                    // backgroundColor: theme.colors.primary,
                    padding: 20,
                    textAlign: 'center',
                    borderRadius: 5,
                    fontSize: 16,
                    fontWeight: 'bold',
                  }}>
                  Add Bullet
                </Text>
              </TouchableOpacity>
            </ImageBackground>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

export default AddBullets;

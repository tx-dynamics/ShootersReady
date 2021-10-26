import {Divider, Header} from 'react-native-elements';
import {Grid, LineChart, XAxis, YAxis} from 'react-native-svg-charts';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';

import {DataTable} from 'react-native-paper';
import HeaderCenterComponent from '../../components/HeaderCenterComponent';
import HeaderLeftComponent from '../../components/HeaderLeftComponent';
import LinearGradient from 'react-native-linear-gradient';
import React from 'react';
import styles from './styles';
import theme from '../../theme';

export default function BulletGraph({navigation, route}) {
  const data = navigation.getParam('data', []);
  const tableRows = navigation.getParam('tableRows', []);
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Header
        backgroundColor={'white'}
        containerStyle={{borderBottomWidth: 0}}
        centerComponent={<HeaderCenterComponent name="SHOOTERS READY" />}
        leftComponent={<HeaderLeftComponent navigation={navigation} />}
      />
      <View
        style={{
          alignItems: 'center',
          marginTop: 10,
          marginBottom: 15,
          // flex: 0.15,
        }}>
        <Divider
          style={{
            backgroundColor: theme.colors.primary,
            height: 1,
            width: '50%',
          }}
        />
        <TouchableOpacity>
          <LinearGradient
            colors={['#000000', '#9C1313']}
            style={[styles.button]}>
            <Text style={[styles.loginText]}>Drop Calculator</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          height: 220,
          margin: 5,
          marginTop: 10,
          padding: 5,
        }}>
        <YAxis
          data={[0, -50, -100, -150, -200, -250, -300, -350, -400, -450, -500]}
          contentInset={{top: 10, bottom: 0}}
          svg={{
            fill: 'grey',
            fontSize: 10,
          }}
          numberOfTicks={25}
          formatLabel={(value, index) => value}
        />

        <LineChart
          style={{flex: 1, marginLeft: 16}}
          data={data}
          svg={{stroke: 'rgb(134, 65, 244)'}}
          contentInset={{top: 1, bottom: 0}}>
          <Grid />
        </LineChart>
      </View>
      <XAxis
        data={[0, 50, 100, -150, -200, -250, -300, -350, -400, -450, -500]}
        numberOfTicks={25}
        formatLabel={(value, index) => value}
        contentInset={{left: 50, right: 10}}
        svg={{fontSize: 10, fill: 'black'}}
      />
      <ScrollView>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Range</DataTable.Title>
            <DataTable.Title numeric>Drop (inches)</DataTable.Title>
            <DataTable.Title numeric>Velocity</DataTable.Title>
            {/* <DataTable.Title numeric>Energy</DataTable.Title> */}
            <DataTable.Title numeric>Wind Drift</DataTable.Title>
            <DataTable.Title numeric>Time</DataTable.Title>
          </DataTable.Header>
          {tableRows.map(row => (
            <DataTable.Row>
              <DataTable.Cell numeric>{row.range}</DataTable.Cell>
              <DataTable.Cell numeric>{row.drop}</DataTable.Cell>
              <DataTable.Cell numeric>{row.velocity}</DataTable.Cell>
              {/* <DataTable.Cell numeric>{row.energy}</DataTable.Cell> */}
              <DataTable.Cell numeric>{row.WindDrift}</DataTable.Cell>
              <DataTable.Cell numeric>{row.time}</DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      </ScrollView>
      <TouchableOpacity
        onPress={() => navigation.navigate('BulletCalculator')}
        style={{
          width: '55%',
          borderRadius: 8,
          padding: 15,
          marginTop: 20,
          alignSelf: 'center',
        }}>
        <Text
          style={{
            alignSelf: 'center',
            fontSize: 20,
            color: theme.colors.primary,
          }}>
          Reset & Calculate
        </Text>
      </TouchableOpacity>
    </View>
  );
}

import {
  ActivityIndicator,
  Image,
  ImageBackground,
  Picker,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Divider, Header} from 'react-native-elements';
import {Grid, LineChart, XAxis, YAxis} from 'react-native-svg-charts';
import React, {Component} from 'react';

import {DataTable} from 'react-native-paper';
import HeaderCenterComponent from '../../components/HeaderCenterComponent';
import HeaderLeftComponent from '../../components/HeaderLeftComponent';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';
import theme from '../../theme';

export default class BulletGraph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      line: [
        -1.5,
        -0.17,
        0.91,
        1.75,
        2.33,
        2.63,
        2.65,
        2.35,
        1.73,
        0.76,
        -0.56,
        -2.26,
        -4.35,
        -6.85,
        -9.77,
        -13.13,
        -16.95,
        -21.23,
        -26.0,
        -31.26,
        -37.04,
        -43.35,
        -50.2,
        -57.61,
        -65.6,
        -74.17,
        -83.36,
        -93.16,
        -103.79,
        -114.9,
        -126.68,
        -139.16,
        -152.34,
        -166.24,
        -180.89,
        -196.29,
        -212.48,
        -229.46,
        -247.26,
        -265.9,
        -285.4,
        -306.12,
        -327.41,
        -349.62,
        -372.77,
        -396.89,
        -422.0,
        -448.12,
        -475.74,
        -503.98,
        -533.31,
      ],
      tableRows: [],
    };
  }
  componentDidMount() {
    const tableRows = this.props.navigation.getParam('tableRows');
    console.log('New data', tableRows?.tableRows);
    this.setState({
      line: tableRows?.ballisticsDatasets[0]?.data,
      tableRows: tableRows?.tableRows,
    });
  }

  render() {
    const data = [
      -1.5,
      -0.17,
      0.91,
      1.75,
      2.33,
      2.63,
      2.65,
      2.35,
      1.73,
      0.76,
      -0.56,
      -2.26,
      -4.35,
      -6.85,
      -9.77,
      -13.13,
      -16.95,
      -21.23,
      -26.0,
      -31.26,
      -37.04,
      -43.35,
      -50.2,
      -57.61,
      -65.6,
      -74.17,
      -83.36,
      -93.16,
      -103.79,
      -114.9,
      -126.68,
      -139.16,
      -152.34,
      -166.24,
      -180.89,
      -196.29,
      -212.48,
      -229.46,
      -247.26,
      -265.9,
      -285.4,
      -306.12,
      -327.41,
      -349.62,
      -372.77,
      -396.89,
      -422.0,
      -448.12,
      -475.74,
      -503.98,
      -533.31,
    ];
    return (
      <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
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
            data={data}
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
            data={this.state.line}
            svg={{stroke: 'rgb(134, 65, 244)'}}
            contentInset={{top: 1, bottom: 0}}>
            <Grid />
          </LineChart>
        </View>
        <XAxis
          data={data}
          numberOfTicks={25}
          formatLabel={(value, index) => value}
          contentInset={{left: 50, right: 10}}
          svg={{fontSize: 10, fill: 'black'}}
        />
        <DataTable>
          <DataTable.Header
            style={{
              backgroundColor: 'skyblue',
              width: '98%',
              alignItems: 'space-around',
              alignSelf: 'center',
            }}>
            <DataTable.Title>Range</DataTable.Title>
            <DataTable.Title numeric>Drop(inch)</DataTable.Title>
            <DataTable.Title numeric>Velocity</DataTable.Title>
            <DataTable.Title numeric>Energy</DataTable.Title>
            <DataTable.Title numeric>Wind Drift(inch)</DataTable.Title>
            <DataTable.Title numeric>Time (ms)</DataTable.Title>
          </DataTable.Header>
          {this.state.tableRows.map(row => (
            <DataTable.Row
              style={{
                width: '95%',
                justifyContent: 'space-between',
                // alignSelf: 'center',
              }}>
              <DataTable.Cell numeric style={{right: 30}}>
                {row.range}
              </DataTable.Cell>
              <DataTable.Cell numeric style={{right: 20}}>
                0
              </DataTable.Cell>
              <DataTable.Cell numeric>{row.velocity}</DataTable.Cell>
              <DataTable.Cell numeric>{row.energy}</DataTable.Cell>
              <DataTable.Cell numeric>{row.WindDrift}</DataTable.Cell>
              <DataTable.Cell numeric>{row.time}</DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('BulletCalculator')}
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
      </ScrollView>
    );
  }
  // render() {
  //   const data = [
  //     -1.5,
  //     -0.17,
  //     0.91,
  //     1.75,
  //     2.33,
  //     2.63,
  //     2.65,
  //     2.35,
  //     1.73,
  //     0.76,
  //     -0.56,
  //     -2.26,
  //     -4.35,
  //     -6.85,
  //     -9.77,
  //     -13.13,
  //     -16.95,
  //     -21.23,
  //     -26.0,
  //     -31.26,
  //     -37.04,
  //     -43.35,
  //     -50.2,
  //     -57.61,
  //     -65.6,
  //     -74.17,
  //     -83.36,
  //     -93.16,
  //     -103.79,
  //     -114.9,
  //     -126.68,
  //     -139.16,
  //     -152.34,
  //     -166.24,
  //     -180.89,
  //     -196.29,
  //     -212.48,
  //     -229.46,
  //     -247.26,
  //     -265.9,
  //     -285.4,
  //     -306.12,
  //     -327.41,
  //     -349.62,
  //     -372.77,
  //     -396.89,
  //     -422.0,
  //     -448.12,
  //     -475.74,
  //     -503.98,
  //     -533.31,
  //   ];

  //   const contentInset = {top: 10, bottom: 0};

  //   return (
  //     <View style={{height: 200, flexDirection: 'row'}}>
  //       <YAxis
  //         data={data}
  //         contentInset={contentInset}
  //         svg={{
  //           fill: 'grey',
  //           fontSize: 10,
  //         }}
  //         numberOfTicks={10}
  //         formatLabel={value => `${value}`}
  //       />
  //       <LineChart
  //         style={{flex: 1, marginLeft: 16}}
  //         data={data}
  //         svg={{stroke: 'rgb(134, 65, 244)'}}
  //         contentInset={contentInset}>
  //         <Grid />
  //       </LineChart>
  //     </View>
  //   );
  // }
}

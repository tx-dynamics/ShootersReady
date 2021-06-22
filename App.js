import React, {Component} from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import MainNav from './src/navigation/MainNav';
// import {Provider as PaperProvider} from 'react-native-paper';
import {ThemeProvider} from 'react-native-elements';
import theme from './src/theme';
console.disableYellowBox = true;
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <SafeAreaView style={{flex: 1}}>
          <MainNav />
        </SafeAreaView>
      </ThemeProvider>
    );
  }
}

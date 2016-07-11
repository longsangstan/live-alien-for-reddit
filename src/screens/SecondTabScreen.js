import React, {Component, PropTypes} from 'react';
import {
  Text,
  Image,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert
} from 'react-native';
import { connect } from 'react-redux';
import * as counterActions from '../reducers/counter/actions';

// this is a traditional React component connected to the redux store
class SecondTabScreen extends Component {
  static navigatorStyle = {
    drawUnderNavBar: true,
    drawUnderTabBar: true,
    navBarTranslucent: true
  };

  constructor(props) {
    super(props);
    this.buttonsCounter = 0;
  }

  render() {
    return (
      <ScrollView style={{flex: 1}}>

        <Image style={{width: undefined, height: 100}} source={require('../../img/colors.png')} />

        <View style={{padding: 20}}>

          <Text style={styles.text}>
            <Text style={{fontWeight: '500'}}>Here Too: </Text> {this.props.counter.count}
          </Text>

          <TouchableOpacity onPress={ this.onIncrementPress.bind(this) }>
            <Text style={styles.button}>Increment Counter</Text>
          </TouchableOpacity>

          <Text style={{fontWeight: '500'}}>String prop: {this.props.str}</Text>
          <Text style={{fontWeight: '500'}}>Number prop: {this.props.num}</Text>
          <Text style={{fontWeight: '500'}}>Object prop: {this.props.obj.str}</Text>
          <Text style={{fontWeight: '500'}}>Array prop: {this.props.obj.arr[0].str}</Text>

          <TouchableOpacity onPress={ this.onSetButton.bind(this) }>
            <Text style={styles.button}>Set a button</Text>
          </TouchableOpacity>

        </View>

      </ScrollView>
    );
  }

  onIncrementPress() {
    this.props.dispatch(counterActions.increment());
  }

  onSetButton() {
    this.props.navigator.setButtons({
      rightButtons: [
        {
          title: 'Right',
          icon: require('../../img/navicon_add.png'),
          id: 'right'
        }
      ],
      leftButtons: [
        {
          title: 'Left',
          icon: require('../../img/navicon_add.png'),
          id: 'left'
        }
      ]
    });
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent(event) {
    switch (event.id) {
      case 'left':
        Alert.alert('NavBar', 'Left button pressed');
        break;
      case 'right':
        Alert.alert('NavBar', 'Right button pressed');
        break;
    }
  }
}

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 10,
    marginTop:10,
  },
  button: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 10,
    marginTop:10,
    color: 'blue'
  }
});

// which props do we want to inject, given the global state?
function mapStateToProps(state) {
  return {
    counter: state.counter
  };
}

export default connect(mapStateToProps)(SecondTabScreen);

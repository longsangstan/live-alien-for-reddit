import React, {Component} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Text
} from 'react-native';

const Device = require('react-native-device');

export default class SubredditCard extends Component {
  static propTypes = {
    subredditData: React.PropTypes.object,
    navigator: React.PropTypes.object
  };

  constructor(props) {
    super(props);
  }

  onPress() {
    this.props.navigator.push({
      title: '/r/' + this.props.subredditData.display_name,
      screen: "example.SubredditScreen",
      passProps: {
        subredditData: this.props.subredditData
      }
    });
  }

  render() {
    let public_description = (this.props.subredditData.public_description).replace(/(?:\r\n|\r|\n)/g, ' ');
    let url = '/r/' + this.props.subredditData.display_name;
    let iconSource = this.props.subredditData.icon_img ? 
                     {uri: this.props.subredditData.icon_img} :
                     require('../../img/orange_snoo.png');

    return (
      <TouchableOpacity onPress={() => this.onPress()} style={styles.cardContainer}>
        <View style={styles.row}>
          <Image style={styles.thumb} source={iconSource} />
          <View style={styles.textContainer}>
            <Text style={styles.title}>
              {url}
            </Text>
            <Text style={styles.description}>
              {public_description}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

let sideMargin = Device.isIpad() ? 80 : 1;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0)',
  },
  thumb: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  textContainer: {
    flex: 1,
    marginLeft: 15
  },
  title: {
    fontWeight: 'bold',
  },
  description: {
    color: 'gray'
  },
  cardContainer: {
    margin: 1,
    marginLeft: sideMargin,
    marginRight: sideMargin,
  }
});

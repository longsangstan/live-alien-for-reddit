import React, {Component} from 'react';
import {
  View,
  Image,
  TouchableHighlight,
  StyleSheet,
  Text
} from 'react-native';

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
    let icon_img = this.props.subredditData.icon_img || 'http://rawapk.com/wp-content/uploads/2016/04/Reddit-The-Official-App-Icon.png';

    return (
      <TouchableHighlight onPress={() => this.onPress()} style={styles.cardContainer}>
        <View>
          <View style={styles.row}>
            <Image style={styles.thumb} source={{uri: icon_img}} />
            <View style={styles.textContainer}>
              <Text style={styles.title}>
                {url}
              </Text>
              <Text style={styles.description}>
                {public_description}
              </Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#FFFFFF',
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
    fontWeight: 'bold'
  },
  description: {
    color: 'gray'
  },
  cardContainer: {
    margin: 1,
  }
});

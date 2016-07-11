import React, {Component} from 'react';
import {
  View,
  Image,
  TouchableHighlight,
  StyleSheet,
  Text
} from 'react-native';

export default class SubredditCard extends Component {
  constructor(props) {
    super(props);
  }

  onPress() {
    console.log('press');
  }

  render() {
    return (
      <TouchableHighlight onPress={this.onPress} style={styles.cardContainer}>
        <View>
          <View style={styles.row}>
            <Image style={styles.thumb} source={{uri: 'http://rawapk.com/wp-content/uploads/2016/04/Reddit-The-Official-App-Icon.png'}} />
            <View style={styles.textContainer}>
              <Text style={styles.title}>
                /r/soccer
              </Text>
              <Text style={styles.description}>
                News, results and discussion about the beautiful game.
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

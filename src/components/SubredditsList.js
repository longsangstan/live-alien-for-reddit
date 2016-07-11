import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  Linking
} from 'react-native';
import SubredditCard from './SubredditCard';
import SearchBar from 'react-native-search-bar';

export default class SubredditsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showsCancelButton: false
    }
  }

  test(){
    console.log('test')
  }

  componentDidMount() {
    console.log('mount!')
  }

  render() {
    return (     
      <Image source={require('../../img/background3.jpg')} style={styles.container}>
        <ScrollView style={styles.cardsContainer}>
          <SearchBar
            ref='searchBar'
            placeholder='Subreddits'
            onChangeText={this.test}
            onCancelButtonPress={() => this.setState({showsCancelButton: false})}
            onFocus={() => this.setState({showsCancelButton: true})}
            showsCancelButton={this.state.showsCancelButton} 
            style={styles.searchBar}
          />
          <SubredditCard />
          <SubredditCard />
          <SubredditCard />
        </ScrollView>
      </Image>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: null,
    height: null,
  },
  cardsContainer: {
    marginTop: 65
  },
  searchBar: {
    //marginTop: 64,
    height: 40
  }
});

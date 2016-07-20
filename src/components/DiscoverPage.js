import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  ListView,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  Linking
} from 'react-native';
import SubredditCard from './SubredditCard';
import SearchBar from 'react-native-search-bar';
import LoadingIcon from './LoadingIcon';
import ErrorIcon from './ErrorIcon';


import PresetSubreddits from '../config/PresetSubreddits';

let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

let initialState = {
  showsCancelButton: false,
  dataSource: ds.cloneWithRows(PresetSubreddits),
  isLoading: false,
  hasNoResults: false,
}

export default class DiscoverPage extends Component {
  static propTypes = {
    navigator: React.PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = initialState;

    this.fetchSubreddits = this.fetchSubreddits.bind(this);
    this.renderRow = this.renderRow.bind(this);
  }

  onCancelButtonPress() {
    this.setState(initialState);
  }

  fetchSubreddits(query) {
    return fetch('https://www.reddit.com/search.json?q=' + query + '&type=sr')
      .then((response) => response.json())
      .then((responseJson) => {
        let subredditsArr = [];

        let children = responseJson.data.children;
        for (var i = 0; i < children.length; i++) {
          let subredditData = children[i].data;
          if(subredditData.over18 === true) continue;
          subredditsArr.push(subredditData);
        }

        return subredditsArr;
      })
      .catch((error) => {
        console.log(error);
        return [];
      });
  }

  onSearchButtonPress(searchBar) {
    this.setState({isLoading: true});

    this.fetchSubreddits(searchBar)
    .then((subredditsArr) => this.setState({
      dataSource: ds.cloneWithRows(subredditsArr),
      isLoading: false,
      hasNoResults: !subredditsArr.length
    }))
  }

  renderRow(rowData) {
    return (
      <SubredditCard
        subredditData={rowData}
        navigator={this.props.navigator}
      />
    )
  }

  render() {
    let subredditsList;
    if(this.state.isLoading) {
      subredditsList = <LoadingIcon />
    } else {
      subredditsList = <ListView
                          scrollsToTop={false} // prevent conflict with scroll view
                          dataSource={this.state.dataSource}
                          renderRow={this.renderRow}
                        />
    }
    if(this.state.hasNoResults) {
      subredditsList = <ErrorIcon errorMsg={'Try again:('}/>
    }

    return (     
      <Image source={require('../../img/background.jpg')} style={styles.container}>
        <ScrollView keyboardDismissMode="on-drag">
          <SearchBar
            ref='searchBar'
            placeholder='Subreddits'
            tintColor={'#d24919'}
            textColor={'#d24919'}
            onSearchButtonPress={(searchBar) => this.onSearchButtonPress(searchBar)}
            onCancelButtonPress={() => this.onCancelButtonPress()}
            onFocus={() => this.setState({showsCancelButton: true})}
            showsCancelButton={this.state.showsCancelButton}
            style={styles.searchBar}
          />
          {subredditsList}
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
    paddingTop: 65
  },
  searchBar: {
    height: 40
  }
});

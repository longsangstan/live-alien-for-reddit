import React, {Component} from 'react';
import {
  ListView,
  View,
  Image,
  StyleSheet,
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
    disableAd: React.PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = initialState;

    this.fetchSubreddits = this.fetchSubreddits.bind(this);
    this.renderHeader = this.renderHeader.bind(this);
    this.renderRow = this.renderRow.bind(this);
  }

  onCancelButtonPress() {
    this.setState(initialState);
  }

  fetchSubreddits(query) {
    if(query === 'Noadpls') this.props.disableAd();

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
    this.setState({
      isLoading: true,
      dataSource: ds.cloneWithRows([]),
    });

    this.fetchSubreddits(searchBar)
    .then((subredditsArr) => this.setState({
      dataSource: ds.cloneWithRows(subredditsArr),
      isLoading: false,
      hasNoResults: !subredditsArr.length
    }))
  }

  renderHeader() {
    return (
      <View>
        <SearchBar
          ref='searchBar'
          placeholder='Subreddits'
          tintColor={'#d24919'}
          onSearchButtonPress={(searchBar) => this.onSearchButtonPress(searchBar)}
          onCancelButtonPress={() => this.onCancelButtonPress()}
          onFocus={() => this.setState({showsCancelButton: true})}
          showsCancelButton={this.state.showsCancelButton}
          style={styles.searchBar}
          searchBarStyle={'minimal'}
        />
        {this.state.isLoading ? <LoadingIcon /> : null}
        {this.state.hasNoResults ? <ErrorIcon errorMsg={'Try again:('}/> : null}
      </View>
    )
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
    return (     
      <Image source={require('../../img/background.jpg')} style={styles.container}>          
        <ListView
          keyboardDismissMode="on-drag"
          dataSource={this.state.dataSource}
          renderHeader={this.renderHeader}
          renderRow={this.renderRow}
        />
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

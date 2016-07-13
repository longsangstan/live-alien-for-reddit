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


// TODO - move to config
let presetSubreddits = [
  {
    "id": "2qi58",
    "display_name": "soccer",
    "public_description": "The football subreddit.\n\nNews, results and discussion about the beautiful game.",
    "icon_img": ""
  },
  {
    "id": "2qo4s",
    "display_name": "nba",
    "public_description": "All things NBA basketball.",
    "icon_img": ""
  },
  {
    "id": "2qimj",
    "display_name": "formula1",
    "public_description": "Formula 1 news and stories",
    "icon_img": ""
  }
]
let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

let initialState = {
  showsCancelButton: false,
  dataSource: ds.cloneWithRows(presetSubreddits),
  isLoading: false,
  hasNoResults: false,
}

export default class DiscoverPage extends Component {
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
          subredditsArr.push(subredditData);
        }
        
        return subredditsArr;
      })
      .catch((error) => {
        console.error(error);
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
    // TODO - save img
    let subredditsList;
    if(this.state.isLoading) {
      subredditsList = <View style={{justifyContent: 'center', alignItems: 'center'}}>
                          <Image style={styles.loadingImg} source={{uri: 'http://i.imgur.com/OxBJ2jQ.gif'}} />
                       </View>
    } else {
      subredditsList = <ListView
                          scrollsToTop={false} // prevent conflict with scroll view
                          dataSource={this.state.dataSource}
                          renderRow={this.renderRow}
                        />
    }
    if(this.state.hasNoResults) {
      subredditsList = <View style={{justifyContent: 'center', alignItems: 'center'}}>
                          <Image style={styles.noResultsImg} source={{uri: 'http://i.imgur.com/BFyusAV.jpg'}} />
                          <Text style={{backgroundColor: 'transparent', color: 'black', fontWeight: 'bold'}}>Can't find anything:(</Text>
                       </View>
    }

    return (     
      <Image source={require('../../img/background3.jpg')} style={styles.container}>
        <ScrollView style={styles.scrollViewContainer} keyboardDismissMode="on-drag">
          <SearchBar
            ref='searchBar'
            placeholder='Subreddits'
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
  },
  scrollViewContainer: {
    marginTop: 65,
    marginBottom: 50
  },
  searchBar: {
    height: 40
  },
  loadingImg: {
    margin: 10,
    width: 45,
    height: 69,
  },
  noResultsImg: {
    margin: 10,
    width: 45,
    height: 53
  }
});

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
  }

  onCancelButtonPress() {
    this.setState(initialState);
  }

  onSearchButtonPress(searchBar) {
    this.setState({isLoading: true});

    let subredditsArr = [];

    fetch('https://www.reddit.com/search.json?q=' + searchBar + '&type=sr')
      .then((response) => response.json())
      .then((responseJson) => {
        // parse
        let children = responseJson.data.children;

        if(children.length === 0) {
          this.setState({
            hasNoResults: true,
          })
        }

        for (var i = 0; i < children.length; i++) {
          let subredditInfo = {};
          subredditInfo['id'] = children[i].data.id;
          subredditInfo['display_name'] = children[i].data.display_name;
          subredditInfo['public_description'] = children[i].data.public_description;
          subredditInfo['icon_img'] = children[i].data.icon_img;

          subredditsArr.push(subredditInfo);
        }
        
        // set setstate
        this.setState({
          dataSource: ds.cloneWithRows(subredditsArr),
          isLoading: false
        })
      })
      .catch((error) => {
        console.error(error);
      });
  }

  renderRow(rowData) {
    return (
      <SubredditCard 
        id={rowData.id} 
        display_name={rowData.display_name}
        public_description={rowData.public_description}
        icon_img={rowData.icon_img}
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
                          scrollsToTop={false}
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

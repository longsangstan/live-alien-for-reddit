import {Navigation} from 'react-native-navigation';

import DiscoverScreen from './DiscoverScreen';
import SubredditScreen from './SubredditScreen';
import PostScreen from './PostScreen';
//import ExampleScreen from './ExampleScreen';

// register all screens of the app (including internal ones)
export function registerScreens(store, Provider) {
  Navigation.registerComponent('example.DiscoverScreen', () => DiscoverScreen, store, Provider);
  Navigation.registerComponent('example.SubredditScreen', () => SubredditScreen, store, Provider);
  Navigation.registerComponent('example.PostScreen', () => PostScreen, store, Provider);
  //Navigation.registerComponent('example.ExampleScreen', () => ExampleScreen, store, Provider);
}

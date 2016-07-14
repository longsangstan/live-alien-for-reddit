import {Navigation} from 'react-native-navigation';

import FirstTabScreen from './FirstTabScreen';
import DiscoverScreen from './DiscoverScreen';
import PushedScreen from './PushedScreen';
import AccountScreen from './AccountScreen';
import SubredditScreen from './SubredditScreen';
import PostScreen from './PostScreen';

// register all screens of the app (including internal ones)
export function registerScreens(store, Provider) {
  Navigation.registerComponent('example.FirstTabScreen', () => FirstTabScreen, store, Provider);
  Navigation.registerComponent('example.DiscoverScreen', () => DiscoverScreen, store, Provider);
  Navigation.registerComponent('example.PushedScreen', () => PushedScreen, store, Provider);
  Navigation.registerComponent('example.AccountScreen', () => AccountScreen, store, Provider);
  Navigation.registerComponent('example.SubredditScreen', () => SubredditScreen, store, Provider);
  Navigation.registerComponent('example.PostScreen', () => PostScreen, store, Provider);
}

import {Navigation} from 'react-native-navigation';

import LoginScreen from './LoginScreen';
import FirstTabScreen from './FirstTabScreen';
import DiscoverScreen from './DiscoverScreen';
import PushedScreen from './PushedScreen';
import AccountScreen from './AccountScreen';

// register all screens of the app (including internal ones)
export function registerScreens(store, Provider) {
  Navigation.registerComponent('example.LoginScreen', () => LoginScreen, store, Provider);
  Navigation.registerComponent('example.FirstTabScreen', () => FirstTabScreen, store, Provider);
  Navigation.registerComponent('example.DiscoverScreen', () => DiscoverScreen, store, Provider);
  Navigation.registerComponent('example.PushedScreen', () => PushedScreen, store, Provider);
  Navigation.registerComponent('example.AccountScreen', () => AccountScreen, store, Provider);
}

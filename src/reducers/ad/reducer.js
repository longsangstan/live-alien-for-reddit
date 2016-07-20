import * as types from './actionTypes';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
  shouldShowAd: true
});

export default function ad(state = initialState, action = {}) {
  switch (action.type) {
    case types.DISABLE_AD:
      return state.merge({
        shouldShowAd: false
      });
    default:
      return state;
  }
}

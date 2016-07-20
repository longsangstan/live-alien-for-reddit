import * as types from './actionTypes';

export function disableAd() {
  console.log('disable Ad');
  return {type: types.DISABLE_AD};
}

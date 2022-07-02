import { all, fork } from 'redux-saga/effects';
import * as ImagesActionWatcher from './images';

export default function* rootSaga() {
   yield all([
      ...Object.values(ImagesActionWatcher),
   ].map(fork));
}
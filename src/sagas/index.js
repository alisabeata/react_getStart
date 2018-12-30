//import {takeLatest, takeEvery} from 'redux-saga/effects';

// export default function* () {
//   console.log('generator work!');
// }

import {take, fork} from 'redux-saga/effects';

export default function* takeEvery(
  pattern,
  saga,
  ...args
) {
  while (true) {
    const action = yield take(pattern)
    yield fork(saga, ...args.concat(action))
  }
}
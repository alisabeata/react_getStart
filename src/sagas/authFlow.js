import {fork, take, put, select, cansel} from 'redux-saga/effects';

import Api from '...';
import isAuthorized from '../reducers/auth';

function* loginFlow() {
  while (true) {
    let isAuthorized = yield select(isAuthorized);

    // если пользователь не авторизован, ждём 'LOGIN_REQUEST', в котором находится user и password
    if (!isAuthorized) {
      const {user, password} = yield take('LOGIN_REQUEST'); 
    }

    const task = yield fork(authorize, user, password); // 4. если пользователь не авторизован, fork необх для запуска параллельного процесса6 чтобы не ломать логику выполнения при повторной авторизации
    const action = yield take({'LOGOUT', 'LOGIN_ERROR'}); // 5. 

    if (action.type === 'LOGOUT') yield cancel(task); // 6

    yield call(Api.clearItem, 'token'); // 7
  }
}

function* authorize(user, password) {
  // 3. проверка авторизации (напр в локал сторадж)
  try {
    const token = yield call(Api.authorize, user, password);
    yield put({type: 'LOGIN_SUCCESS', token});
    yield call(Api.storeItem, {token});
    return token;
  } catch (error) {
    // 8
    yield put({type: 'LOGIN_ERROR', error});
  } finally {
    if (yield cancelled()) {
      // логика отмены
    }
  }
}


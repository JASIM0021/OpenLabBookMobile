import { PayloadAction } from 'typesafe-actions';
// import auth from '@react-native-firebase/auth';
import { put, takeLatest } from 'redux-saga/effects';
import { registrationError, registrationSuccess, startLoading } from '../../slice/GlobalSlice';
import { GOOGLE_REGISTER, LOGIN_USER_REQUEST, REGISTER_USER_REQUEST } from './authAction';
// import { GoogleSignin } from '@react-native-google-signin/google-signin';

// Saga for user registration
export function* registerSaga(action: PayloadAction<string, { email: string; password: string }>): Generator<any, void, any> {
 yield put(startLoading())
  try {
    const { email, password } = action.payload;
    // const userCredential = yield auth().createUserWithEmailAndPassword(email, password);
    // yield put(registrationSuccess(userCredential.user));
  } catch (error) {
    yield put(registrationError(error.code));
  }
}


export function* googleRegister(): Generator<any, void, any> {
  put(startLoading())
  try {
    // const { idToken } = yield GoogleSignin.signIn();

    // Create a Google credential with the token
    // const googleCredential = yield auth.GoogleAuthProvider.credential(idToken);
    // const userCredential = yield auth().signInWithCredential(googleCredential);
    // yield put(registrationSuccess(userCredential.user));
  } catch (error) {
    yield put(registrationError(error.code));
  }
}

// Saga for user login
export function* loginSaga(action: PayloadAction<string, { email: string; password: string }>): Generator<any, void, any> {
  put(startLoading())
  try {
    const { email, password } = action.payload;
    // const userCredential = yield auth().signInWithEmailAndPassword(email, password);
    // yield put(registrationSuccess(userCredential.user));
  } catch (error) {
    yield put(registrationError(error.code));
  }
}

export function* watchLoginUser() {
  yield takeLatest(REGISTER_USER_REQUEST, registerSaga);
  yield takeLatest(LOGIN_USER_REQUEST, loginSaga);
  yield takeLatest(GOOGLE_REGISTER, googleRegister);
}

import { createAction } from 'typesafe-actions';


// Action types
export const REGISTER_USER_REQUEST = 'user/register_request';
export const LOGIN_USER_REQUEST = 'user/login_request';
export const REGISTRATION_SUCCESS = 'user/registration_success';
export const REGISTRATION_ERROR = 'user/registration_error';
export const GOOGLE_REGISTER = 'user/google_register';
// Action creators
export const registerUserRequest = createAction(REGISTER_USER_REQUEST)<{ email: string; password: string }>();
export const loginUserRequest = createAction(LOGIN_USER_REQUEST)<{ email: string; password: string }>();
export const registrationSuccess = createAction(REGISTRATION_SUCCESS)<any>();
export const registrationError = createAction(REGISTRATION_ERROR)<string>();
export const googleRegister = createAction(GOOGLE_REGISTER)();


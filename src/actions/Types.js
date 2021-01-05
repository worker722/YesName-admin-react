/**
 * App Redux Action Types
 */

// Auth Actions
export const LOGIN_USER = 'LOGIN_USER'
export const LOGIN_USER_SUCCESS = 'LOGING_USER_SUCCESS'
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE'
export const LOGOUT_USER = 'LOGOUT_USER'
export const LOGIN_EMAIL_CHANGED = 'SIGNIN_EMAIL_CHANGED'
export const LOGIN_PASSWORD_CHANGED = 'SIGNIN_PASSWORD_CHANGED'

// App Settings
export const COLLAPSED_SIDEBAR = 'COLLAPSED_SIDEBAR';
export const MINI_SIDEBAR = 'MINI_SIDEBAR';
export const DARK_MODE = 'DARK_MODE';
export const RTL = 'RTL';
export const HORIZONTAL_MENU = 'HORIZONTAL_MENU';
export const CHOOSE_THEME = 'CHOOSE_THEME';
export const NOTIFICATION_SIDEBAR = 'NOTIFICATION_SIDEBAR';
export const SET_LANGUAGE = 'SET_LANGUAGE'

// Menu List 
export const TOGGLE_MENU = 'TOGGLE_MENU';
export const TOGGLE_THIRD_MENU = 'TOGGLE_THIRD_MENU';
export const TOGGLE_FOURTH_MENU = 'TOGGLE_FOURTH_MENU';
export const ONLOAD_TOGGLE_MENU = 'ONLOAD_TOGGLE_MENU';

// Users
export const GETUSERS = 'GETUSERS';
export const GETUSERS_SUCCESS = 'GETUSERS_SUCCESS';
export const GETUSERS_FAILED = 'GETUSERS_FAILED';

// States
export const GETSTATES = 'GETSTATES';
export const GETSTATES_SUCCESS = 'GETSTATES_SUCCESS';
export const GETSTATES_FAILED = 'GETSTATES_FAILED';

// friends
export const GETFRIENDS = 'GETFRIENDS';
export const GETFRIENDS_SUCCESS = 'GETFRIENDS_SUCCESS';
export const GETFRIENDS_FAILED = 'GETFRIENDS_FAILED';
import {
	LOGIN_USER,
	LOGIN_USER_SUCCESS,
	LOGIN_USER_FAILURE,
	LOGIN_EMAIL_CHANGED,
	LOGIN_PASSWORD_CHANGED,
	LOGOUT_USER
} from 'actions/Types'

/**
 * Initial auth user
 */
const INIT_STATE = {
	user: JSON.parse(localStorage.getItem("user")),
	loading: false,
	email: 'yesname@admin.com',
	password: 'secret',
	error: ''
}

export default (state = INIT_STATE, action) => {
	switch (action.type) {
		case LOGIN_USER:
			return { ...state, loading: true };

		case LOGIN_USER_SUCCESS:
			return { ...state,  loading: false, user: action.payload };

		case LOGIN_USER_FAILURE:
			return { ...state, loading: false, password: '', error: action.payload };

		case LOGIN_EMAIL_CHANGED:
			return { ...state, email: action.payload };

		case LOGIN_PASSWORD_CHANGED:
			return { ...state, password: action.payload };

		case LOGOUT_USER:
			return { ...state, user: null }

		default: return { ...state };
	}
}
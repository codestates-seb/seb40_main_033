/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	loginStatus: false,
	keepLoggedIn: false,
	accessToken: '',
	refreshToken: '',
	email: '',
	isSocial: false,
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		login: (state, { payload }) => {
			const { accessToken, refreshToken, email, keepLoggedIn, isSocial } =
				payload;

			if (keepLoggedIn) {
				state.keepLoggedIn = true;
			}
			if (accessToken) {
				state.loginStatus = true;
			}
			state.accessToken = accessToken;
			state.refreshToken = refreshToken;
			state.email = email;
			state.isSocial = isSocial;
		},
		logout: () => {
			return initialState;
		},
	},
});

export const { login, logout } = userSlice.actions;
export default userSlice;

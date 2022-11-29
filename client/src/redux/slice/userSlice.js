/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	loginStatus: false,
	keepLoggedIn: false,
	accessToken: '',
	refreshToken: '',
	email: '',
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		login: (state, { payload }) => {
			const { accessToken, refreshToken, email, keepLoggedIn } = payload;

			if (keepLoggedIn) {
				state.keepLoggedIn = true;
			}
			state.accessToken = accessToken;
			state.refreshToken = refreshToken;
			state.loginStatus = true;
			state.email = email;
		},
		logout: () => {
			return initialState;
		},
	},
});

export const { login, logout } = userSlice.actions;
export default userSlice;

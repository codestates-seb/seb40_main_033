/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	loginStatus: false,
	keepLoggedIn: false,
	accessToken: '',
	refreshToken: '',
};

const userSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		login: (state, { payload }) => {
			const { accessToken, refreshToken, keepLoggedIn } = payload;

			if (keepLoggedIn) {
				state.keepLoggedIn = true;
			}
			state.accessToken = accessToken;
			state.refreshToken = refreshToken;
			state.loginStatus = true;
		},
		logout: () => {
			return initialState;
		},
	},
});

export const { login, logout } = userSlice.actions;
export default userSlice;

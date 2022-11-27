/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const initialUser = {
	loginStatus: false,
	keepLoggedIn: false,
	accessToken: '',
	refreshToken: '',
};

const userSlice = createSlice({
	name: 'auth',
	initialState: { isLogin: false },
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
			return initialUser;
		},
	},
});

export const { login, logout } = userSlice.actions;
export default userSlice;

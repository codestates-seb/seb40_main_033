import { createSlice, PayloadAction, Reducer } from '@reduxjs/toolkit';
import { User } from '../../types/auth.type';

// 로컬스토리지에 저장된 토큰을 가져온다.
const storageAccessToken = localStorage.getItem('accessToken');
const storageLoginStatus = localStorage.getItem('loginStatus');

const initialState: User = {
	loginStatus: storageLoginStatus === 'true',
	keepLoggedIn: false,
	accessToken: storageAccessToken,
	refreshToken: '',
	email: '',
	isSocial: false,
	userId: '',
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		login: (state, { payload }: PayloadAction<User>) => {
			const {
				accessToken,
				refreshToken,
				userId,
				email,
				keepLoggedIn,
				isSocial,
			} = payload;

			if (keepLoggedIn) {
				state.keepLoggedIn = true;
			}
			if (accessToken) {
				state.loginStatus = true;
				localStorage.setItem('loginStatus', 'true');
				state.accessToken = accessToken;
				localStorage.setItem('accessToken', accessToken);
				state.userId = userId;
				localStorage.setItem('userId', userId);
			}
			state.refreshToken = refreshToken;
			state.email = email;
			state.isSocial = isSocial;
		},
		logout: () => {
			localStorage.clear();
			return initialState;
		},
	},
});

export const { login, logout } = userSlice.actions;
export const userReducer: Reducer<typeof initialState> = userSlice.reducer;

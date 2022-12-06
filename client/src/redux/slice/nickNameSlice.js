import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	nickName: '-',
};

const nickNameSlice = createSlice({
	name: 'nickName',
	initialState,
	reducers: {
		change: (state, action) => {
			Object.assign(state, { nickName: action.payload });
			localStorage.setItem('nickName', action.payload);
		},
	},
});

export const { change } = nickNameSlice.actions;
export default nickNameSlice;

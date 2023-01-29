import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
	nickName: '-',
};

const nickNameSlice = createSlice({
	name: 'nickName',
	initialState,
	reducers: {
		change: (state, { payload }: PayloadAction<string>) => {
			Object.assign(state, { nickName: payload });
			localStorage.setItem('nickName', payload);
		},
	},
});

export const { change } = nickNameSlice.actions;
export default nickNameSlice;

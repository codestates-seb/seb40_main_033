import { createSlice, PayloadAction, Reducer } from '@reduxjs/toolkit';

const initialState = {
	nickName: '-',
};

export const nickNameSlice = createSlice({
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
export const nickNameReducer: Reducer<typeof initialState> =
	nickNameSlice.reducer;

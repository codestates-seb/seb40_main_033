import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	sort: '',
	price: '',
	key: '',
};

const filterSlice = createSlice({
	name: 'filter',
	initialState,
	reducers: {
		// 리듀서의 액션타입이 setSort일때, 함수가 실행됨
		setSort: (state, action) => {
			Object.assign(state, { sort: action.payload });
		},
		setPrice: (state, action) => {
			Object.assign(state, { price: action.payload });
		},
		setKeyword: (state, action) => {
			Object.assign(state, { key: action.payload });
		},
	},
});

export const { setSort, setPrice, setKeyword } = filterSlice.actions;
export default filterSlice;

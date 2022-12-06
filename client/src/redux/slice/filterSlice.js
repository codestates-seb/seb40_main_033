/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	sort: '',
	price: '',
	keyWord: '',
	brand: '',
	onSale: false,
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
		setBrand: (state, { payload }) => {
			state.brand = payload;
		},
		setOnSale: (state, { payload }) => {
			state.onSale = payload;
		},
		setClear: (state) => {
			state.sort = '';
			state.price = '';
			state.key = '';
			state.brand = '';
			state.onSale = false;
		},
	},
});

export const { setSort, setPrice, setKeyword, setOnSale, setBrand, setClear } =
	filterSlice.actions;
export default filterSlice;

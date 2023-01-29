/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
		setSort: (state, { payload }: PayloadAction<string>) => {
			state.sort = payload;
		},
		setPrice: (state, { payload }: PayloadAction<string>) => {
			state.price = payload;
		},
		setKeyword: (state, { payload }: PayloadAction<string>) => {
			state.keyWord = payload;
		},
		setBrand: (state, { payload }: PayloadAction<string>) => {
			state.brand = payload;
		},
		setOnSale: (state, { payload }: PayloadAction<boolean>) => {
			state.onSale = payload;
		},
		setClear: (state) => {
			state.sort = '';
			state.price = '';
			state.keyWord = '';
			state.brand = '';
			state.onSale = false;
		},
	},
});

export const { setSort, setPrice, setKeyword, setOnSale, setBrand, setClear } =
	filterSlice.actions;
export default filterSlice;

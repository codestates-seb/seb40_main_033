import { configureStore } from '@reduxjs/toolkit';
import userSlice from '../slice/userSlice';
import filterSlice from '../slice/filterSlice';

const store = configureStore({
	reducer: {
		user: userSlice.reducer,
		filter: filterSlice.reducer,
	},
});

export default store;

import { configureStore } from '@reduxjs/toolkit';
import userSlice from '../slice/userSlice';
import filterSlice from '../slice/filterSlice';
import nickNameSlice from '../slice/nickNameSlice';

const store = configureStore({
	reducer: {
		user: userSlice.reducer,
		filter: filterSlice.reducer,
		nickName: nickNameSlice.reducer,
	},
});

export default store;

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { nickNameReducer } from '../slice/nickNameSlice';
import { filterReducer } from '../slice/filterSlice';
import { userReducer } from '../slice/userSlice';

const rootReducer = combineReducers({
	user: userReducer,
	filter: filterReducer,
	nickName: nickNameReducer,
});

const store = configureStore({
	reducer: {
		reducer: rootReducer,
	},
});

export type RootState = ReturnType<typeof rootReducer>;

export default store;

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { nickNameSlice, nickNameReducer } from '../slice/nickNameSlice';
import { filterSlice, filterReducer } from '../slice/filterSlice';
import { userSlice, userReducer } from '../slice/userSlice';

const rootReducer = combineReducers({
	user: userReducer,
	filter: filterReducer,
	nickName: nickNameReducer,
});

// const store = configureStore({
// 	reducer: {
// 		reducer: rootReducer,
// 	},
// });
const store = configureStore({
	reducer: {
		user: userSlice.reducer,
		filter: filterSlice.reducer,
		nickName: nickNameSlice.reducer,
	},
});

export type RootState = ReturnType<typeof rootReducer>;

export default store;

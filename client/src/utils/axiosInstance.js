/* eslint-disable no-param-reassign */
import axios from 'axios';
import store from '../redux/store/store';

const axiosInstance = axios.create({
	baseURL: 'http://ec2-43-201-37-71.ap-northeast-2.compute.amazonaws.com:8080', // 서버 url
	timeout: 3000,
});

export default axiosInstance;

axiosInstance.interceptors.request.use((config) => {
	const { accessToken } = store.getState().user;
	config.headers.Authorization = accessToken;

	return config;
});

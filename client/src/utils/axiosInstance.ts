import axios, { AxiosRequestConfig } from 'axios';
import store from '../redux/store/store';

const axiosInstance = axios.create({
	baseURL:
		'http://ec2-43-202-198-203.ap-northeast-2.compute.amazonaws.com:8080', // 서버 url
	timeout: 3000,
});

axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
	const { accessToken } = store.getState().user;
	if (!config.headers) return config;
	config.headers.Authorization = accessToken;

	return config;
});

export default axiosInstance;

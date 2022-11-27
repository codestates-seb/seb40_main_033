import axios from 'axios';

const axiosInstance = axios.create({
	baseURL: 'https://dangerous-newt-46.loca.lt', // 서버 url
	timeout: 5000,
});

export default axiosInstance;

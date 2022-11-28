import axios from 'axios';

const axiosInstance = axios.create({
	baseURL: 'https://wicked-husky-45.loca.lt', // 서버 url
	timeout: 5000,
});

export default axiosInstance;

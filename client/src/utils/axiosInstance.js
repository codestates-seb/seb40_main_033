import axios from 'axios';

const axiosInstance = axios.create({
	baseURL: 'http://ec2-43-201-37-71.ap-northeast-2.compute.amazonaws.com:8080', // 서버 url
	timeout: 5000,
});

export default axiosInstance;

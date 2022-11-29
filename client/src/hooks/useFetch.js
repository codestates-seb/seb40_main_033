import { useQuery } from 'react-query';
import axios from 'axios';

// export const fetchData = async (url) => {
// 	const { data } = await axiosInstance.get(url).json();

// 	return data.data;
// };

const useGet = (url, keyValue) => {
	const { isLoading, isError, data } = useQuery(
		keyValue,
		() => axios.get(url),
		{
			cacheTime: Infinity,
		},
	);
	console.log('isLoading', isLoading);
	console.log('data', data);
	return { isLoading, isError, data: data?.data };
};

export default useGet;

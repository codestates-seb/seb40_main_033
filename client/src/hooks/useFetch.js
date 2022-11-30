import { useMutation, useQuery } from 'react-query';
import axios from 'axios';
import { useState } from 'react';

// export const fetchData = async (url) => {
// 	const { data } = await axiosInstance.get(url).json();

// 	return data.data;
// };

export const useGet = (url, keyValue) => {
	const { isLoading, isError, data, error } = useQuery([keyValue], () =>
		axios.get(url),
	);

	return { isLoading, isError, data, error };
};

export const usePost = (url) => {
	const [response, setResponse] = useState(null);

	const { mutate, isLoading, isError, error } = useMutation(
		(data) => axios.post(url, data),
		{
			onSuccess: async (res) => {
				setResponse(res);
			},
		},
	);

	return { mutate, isLoading, isError, error, response };
};

export const useDelete = (url) => {
	const [response, setResponse] = useState(null);

	const { mutate, isLoading, isError, error } = useMutation(
		() => axios.delete(url),
		{
			onSuccess: async (res) => {
				setResponse(res);
			},
		},
	);

	return { mutate, isLoading, isError, error, response };
};

export const usePatch = (url) => {
	const [response, setResponse] = useState(null);

	const { mutate, isLoading, isError, error } = useMutation(
		(data) => axios.patch(url, data),
		{
			onSuccess: async (res) => {
				setResponse(res);
			},
		},
	);

	return { mutate, isLoading, isError, error, response };
};

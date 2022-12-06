import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useState } from 'react';
import axiosInstance from '../utils/axiosInstance';

// export const fetchData = async (url) => {
// 	const { data } = await axiosInstance.get(url).json();

// 	return data.data;
// };

export const useGet = (url, keyValue) => {
	const { isLoading, isError, isSuccess, data, error, refetch } = useQuery(
		[keyValue],
		() => axiosInstance.get(url),
	);

	return { isLoading, isError, isSuccess, data, error, refetch };
};

export const usePost = (url) => {
	const queryClient = useQueryClient();
	const [response, setResponse] = useState(null);

	const { mutate, isLoading, isError, error } = useMutation(
		(data) => axiosInstance.post(url, data),
		{
			onSuccess: async (res) => {
				setResponse(res);
				queryClient.invalidateQueries();
			},
		},
	);

	return { mutate, isLoading, isError, error, response };
};

export const useDelete = (url) => {
	const queryClient = useQueryClient();
	const [response, setResponse] = useState(null);

	const { mutate, isLoading, isError, error } = useMutation(
		() => axiosInstance.delete(url),
		{
			onSuccess: async (res) => {
				setResponse(res);
				queryClient.invalidateQueries();
			},
		},
	);

	return { mutate, isLoading, isError, error, response };
};

export const usePatch = (url) => {
	const queryClient = useQueryClient();
	const [response, setResponse] = useState(null);

	const { mutate, isLoading, isError, error } = useMutation(
		(data) => axiosInstance.patch(url, data),
		{
			onSuccess: (res) => {
				setResponse(res);
				queryClient.invalidateQueries();
			},
		},
	);

	return { mutate, isLoading, isError, error, response };
};

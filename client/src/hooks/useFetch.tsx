import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useState } from 'react';
import { AxiosResponse } from 'axios';
import axiosInstance from '../utils/axiosInstance';

export function useGet(url: string, keyValue: string) {
	const { isLoading, isError, isSuccess, data, error, refetch } = useQuery(
		[keyValue],
		() => axiosInstance.get(url),
	);

	return { isLoading, isError, isSuccess, data, error, refetch };
}

export function usePost<T extends object, K = void>(url: string) {
	const queryClient = useQueryClient();
	const [response, setResponse] = useState<AxiosResponse | null>(null);

	const { mutate, isLoading, isError, error } = useMutation(
		(data: T | K) => axiosInstance.post(url, data),
		{
			onSuccess: async (res) => {
				setResponse(res);
				queryClient.invalidateQueries();
			},
		},
	);

	return { mutate, isLoading, isError, error, response };
}

export function useDelete(url: string) {
	const queryClient = useQueryClient();
	const [response, setResponse] = useState<AxiosResponse | null>(null);

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
}

export function usePatch<T extends object, K = void>(url: string) {
	const queryClient = useQueryClient();
	const [response, setResponse] = useState<AxiosResponse | null>(null);

	const { mutate, isLoading, isError, error } = useMutation(
		(data: T | K) => axiosInstance.patch(url, data),
		{
			onSuccess: (res) => {
				setResponse(res);
				queryClient.invalidateQueries();
			},
		},
	);

	return { mutate, isLoading, isError, error, response };
}

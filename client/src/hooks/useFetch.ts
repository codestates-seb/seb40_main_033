import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useState } from 'react';
import { AxiosResponse, AxiosError } from 'axios';
import { toast } from 'react-toastify';
import axiosInstance from '../utils/axiosInstance';
import {
	TOKEN_EXPIRED_INFORMATION,
	EXPIRED_TOKEN_RESPONSE_MESSAGE,
} from '../assets/Constants';

interface ResponseData {
	message: string;
	status: number;
}

export function useGet<T>(url: string, keyValue: string) {
	const navigate = useNavigate();
	const { isLoading, isError, isSuccess, data, error, refetch } = useQuery<
		AxiosResponse<T>
	>([keyValue], () => axiosInstance.get(url), {
		onError: (errRes) => {
			const { response } = errRes as AxiosError;
			const { message } = response?.data as ResponseData;

			if (
				response?.status === 403 ||
				message === EXPIRED_TOKEN_RESPONSE_MESSAGE
			) {
				localStorage.clear();
				navigate('/login');
				toast.error(TOKEN_EXPIRED_INFORMATION);
			}
		},
	});

	return { isLoading, isError, isSuccess, data, error, refetch };
}

export function useGetUserInformation<T>(url: string, keyValue: string) {
	const navigate = useNavigate();
	const { isLoading, isError, isSuccess, data, error, refetch } = useQuery<
		AxiosResponse<T>
	>([keyValue], () => axiosInstance.get(url), {
		onError: (errRes) => {
			const { response } = errRes as AxiosError;
			const { message } = response?.data as ResponseData;

			if (
				response?.status === 403 ||
				message === EXPIRED_TOKEN_RESPONSE_MESSAGE
			) {
				localStorage.clear();
				navigate('/login');
				toast.error(TOKEN_EXPIRED_INFORMATION);
			}
		},
	});

	return {
		isLoading,
		isError,
		isSuccess,
		data: data ? data.data : null,
		error,
		refetch,
	};
}

export function usePost<T extends object, M = void>(url: string) {
	const queryClient = useQueryClient();
	const [response, setResponse] = useState<AxiosResponse | null>(null);

	const { mutate, isLoading, isError, error } = useMutation(
		(data: T | M) => axiosInstance.post(url, data),
		{
			onSuccess: (res) => {
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
			onSuccess: (res) => {
				setResponse(res);
				queryClient.invalidateQueries();
			},
		},
	);

	return { mutate, isLoading, isError, error, response };
}

export function usePatch<T extends object, M = void>(url: string) {
	const queryClient = useQueryClient();
	const [response, setResponse] = useState<AxiosResponse | null>(null);

	const { mutate, isLoading, isError, error } = useMutation(
		(data: T | M) => axiosInstance.patch(url, data),
		{
			onSuccess: (res) => {
				setResponse(res);
				queryClient.invalidateQueries();
			},
		},
	);

	return { mutate, isLoading, isError, error, response };
}

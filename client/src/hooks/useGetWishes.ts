import { AxiosResponse, AxiosError } from 'axios';
import { useState } from 'react';
import { useQuery } from 'react-query';
import axiosInstance from '../utils/axiosInstance';

// 상세페이지 - 유저의 전체 위시리스트 조회
export default function useGetWishes<T>(url: string, keyValue: string) {
	const token = localStorage.getItem('accessToken');
	// 상태 코드가 403이면 토큰 만료, 재로그인해야 함 (선택사항)
	const [errorStatus, setErrorStatus] = useState(0);

	// 로그인이 되어있지 않을 때 wishlist 조회 요청 x
	if (!token) {
		return { errorStatus };
	}

	const { isLoading, isError, isSuccess, data, error, refetch } = useQuery<
		AxiosResponse<T>
	>([keyValue], () => axiosInstance.get(url), {
		onError: async (errRes) => {
			const { response } = errRes as AxiosError;
			if (response) {
				setErrorStatus(response.status);
			}
		},
	});

	return { isLoading, isError, isSuccess, data, error, errorStatus, refetch };
}

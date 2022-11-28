/* eslint-disable no-promise-executor-return */
import { useState } from 'react';
import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';
import { login } from '../redux/slice/userSlice';
import axiosInstance from '../utils/axiosInstance';

const handleLogin = async ({ email, password }) => {
	const { data } = await axiosInstance.post('/users/login', {
		username: email,
		password,
	});
	// const { authorization: accessToken, refresh: refreshToken } = headers;
	// return { accessToken, refreshToken };
	return data;
};

export const fetchUserInfos = async () => {
	const { data } = (await axiosInstance.get)('/user', {
		headers: {
			tokenNeeded: true,
		},
	});

	return data.data;
};

const ERROR_MESSAGE = {
	Unauthorized: '아이디 또는 비밀번호를 다시 확인해주세요.',
	Forbidden: '유효하지 않은 접근입니다.',
};

export default function useLogin() {
	const dispatch = useDispatch();
	const [errMsg, setErrMsg] = useState('');
	const { mutate, isLoading, isSuccess, isError } = useMutation(
		(form) => handleLogin(form),
		// () =>
		// 	new Promise(() => {
		// 		return { accessToken: 'asdasd', refreshToken: 'sdfsdf' };
		// 	}),
		{
			onSuccess: async (data, { email }) => {
				dispatch(login({ accessToken: data.split(' ')[1], email }));
			},
			onError: async (data) => {
				const { response } = data;
				const { status, data: errorData } = response;

				if (status === 401) {
					setErrMsg(ERROR_MESSAGE.Unauthorized);
				} else if (status === 403) {
					setErrMsg(ERROR_MESSAGE.Forbidden);
				} else {
					setErrMsg(errorData.message);
				}
			},
		},
	);

	return { mutate, isLoading, isSuccess, isError, errMsg };
}

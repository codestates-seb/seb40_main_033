import { useState } from 'react';
import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';
import { fetchLogin } from '../apis/login';
import { login } from '../redux/slice/userSlice';

const ERROR_MESSAGE = {
	Unauthorized: '아이디 또는 비밀번호를 다시 확인해주세요.',
	Forbidden: '유효하지 않은 접근입니다.',
};

export default function useLogin() {
	const dispatch = useDispatch();
	const [errMsg, setErrMsg] = useState('');
	const { mutate, isLoading, isSuccess, isError } = useMutation(
		// () =>
		// 	new Promise(() => {
		// 		return { accessToken: 'asdasd', refreshToken: 'sdfsdf' };
		// 	}),
		(form) => fetchLogin(form),
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

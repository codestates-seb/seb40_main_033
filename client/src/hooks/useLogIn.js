/* eslint-disable no-promise-executor-return */
import { useState } from 'react';
import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { fetchLogIn } from '../apis/userApis';
import { login } from '../redux/slice/userSlice';

const ERROR_MESSAGE = {
	Unauthorized: '아이디 또는 비밀번호를 다시 확인해주세요.',
	Forbidden: '유효하지 않은 접근입니다.',
};

export default function useLogIn() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [errMsg, setErrMsg] = useState('');
	const { mutate, isLoading, isSuccess, isError } = useMutation(
		// () => ({ accessToken: 'asdasd', refreshToken: 'sdfsdf' }),
		(form) => fetchLogIn(form),
		{
			onSuccess: async ({ accessToken, refreshToken }, { email }) => {
				// dispatch(login({ accessToken: data, email }));
				dispatch(login({ accessToken, refreshToken, email }));
				toast.success('로그인 되었습니다 !');
				navigate('/', { replace: true });
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
				toast.error(errMsg);
			},
		},
	);

	return { mutate, isLoading, isSuccess, isError, errMsg };
}
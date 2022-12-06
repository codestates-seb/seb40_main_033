import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from 'react-query';
import axiosInstance from '../utils/axiosInstance';

function usePurchase(url, params) {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const { mutate, isLoading, isSuccess, isError } = useMutation(
		(data) => axiosInstance.post(url, data), // .then((res) => setResponse(res))
		{
			onSuccess: (res) => {
				navigate(`/pay/${params}`, { state: res.data.data }); // 결제 페이지로 응답 전송
				queryClient.invalidateQueries();
			},
			onError: async () => {
				toast.error(
					<div>
						현재 구매할 수 없는 상품입니다.
						<br />
						서비스 이용에 불편을 드려 죄송합니다.
					</div>,
				);
			},
		},
	);

	return { mutate, isLoading, isSuccess, isError };
}

export default usePurchase;

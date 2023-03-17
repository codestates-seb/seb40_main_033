import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useQuery } from 'react-query';
import MainCaroucel from '../../components/Caroucel/MainCaroucel';
import { login } from '../../redux/slice/userSlice';
import MainSection from './MainSection';
import { LoadingSpinner } from '../../components/Etc/LoadingSpinner';
import axiosInstance from '../../utils/axiosInstance';
import { MainPage } from '../../types/main.type';
import { AxiosResponse } from 'axios';

const sectionTitle = [
	['Best', '인기 많은 상품만 모았어요!'],
	['On Sale', '할인 중인 상품만 모았어요!'],
	['New Arrival', '새로운 영양제를 만나보세요!'],
];

function Home() {
	const dispatch = useDispatch();
	useEffect(() => {
		const url = new URL(window.location.href);
		const accessToken = url.searchParams.get('access_token');
		const refreshToken = url.searchParams.get('refresh_token');
		const userId = url.searchParams.get('userId');
		if (accessToken && userId) {
			dispatch(login({ accessToken, refreshToken, isSocial: true, userId }));
		}
	}, []);

	const { pathname } = useLocation();
	const { isLoading, data, error } = useQuery<AxiosResponse<MainPage>>(
		[pathname],
		() => axiosInstance.get('/main'),
	);

	const list = data?.data;

	if (error instanceof Error)
		return (
			<>
				<MainCaroucel />
				<div>{error.message}</div>
			</>
		);
	return (
		<div>
			<MainCaroucel />
			{isLoading || !list ? (
				<LoadingSpinner />
			) : (
				<>
					<MainSection
						items={list.data.bestItem.data}
						sectionTitle={sectionTitle[0]}
					/>
					<MainSection
						items={list.data.saleItem.data}
						sectionTitle={sectionTitle[1]}
					/>
					<MainSection
						items={list.data.mdPickItem.data}
						sectionTitle={sectionTitle[2]}
					/>
				</>
			)}
		</div>
	);
}

export default Home;

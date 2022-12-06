import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import MainCaroucel from '../../components/Caroucel/MainCaroucel';
import { login } from '../../redux/slice/userSlice';
import MainSection from './MainSection';
import { useGet } from '../../hooks/useFetch';
import { LoadingSpinner } from '../../components/Etc/LoadingSpinner';

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
		if (accessToken) {
			dispatch(login({ accessToken, refreshToken, isSocial: true, userId }));
		}
	}, []);

	const { pathname } = useLocation();
	const { isLoading, isError, data, error } = useGet('/main', pathname);

	const list = data?.data;

	if (isError)
		return (
			<>
				<MainCaroucel />
				<div>{error.message}</div>
			</>
		);
	return (
		<div>
			<MainCaroucel />
			{isLoading ? (
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

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import MainCaroucel from '../../components/Caroucel/MainCaroucel';
import { login } from '../../redux/slice/userSlice';
import MainSection from './MainSection';
import { useGet } from '../../hooks/useFetch';

const sectionTitle = [
	['Best', '인기 많은 상품만 모았어요!'],
	['On Sale', '할인 중인 상품만 모았어요!'],
	['신상품', '새로 나온 제품들!'],
];

function Home() {
	const dispatch = useDispatch();
	useEffect(() => {
		const url = new URL(window.location.href);
		const accessToken = url.searchParams.get('access_token');
		const refreshToken = url.searchParams.get('refresh_token');
		if (accessToken) {
			dispatch(login({ accessToken, refreshToken, isSocial: true }));
		}
	}, []);

	const { pathname } = useLocation();
	const { isLoading, isError, data, error } = useGet(
		'http://ec2-43-201-37-71.ap-northeast-2.compute.amazonaws.com:8080/main',
		// 'http://localhost:3001/main',
		pathname,
	);

	const list = !isLoading && data.data;

	return (
		<div>
			<MainCaroucel />
			{isLoading ? (
				<div>Loading</div>
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

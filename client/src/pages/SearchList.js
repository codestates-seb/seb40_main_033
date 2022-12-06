import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useSearchParams } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import SmallListCards from '../components/Lists/SmallListCards';
import PageTitle from '../components/Etc/PageTitle';
import paramsMaker from '../utils/paramsMaker';
import { LoadingSpinner } from '../components/Etc/LoadingSpinner';
import { useGetSearchList } from '../hooks/useGetList';
import { setClear } from '../redux/slice/filterSlice';

// 목록 페이지
function SearchList() {
	const { sort, price, brand, onSale } = useSelector((state) => state.filter);

	// uri에 붙일 파람스 생성
	const { path, query } = paramsMaker(sort, price, brand, onSale);

	// 카테고리에 따라서 아이템 목록 불러오기
	const [searchParams] = useSearchParams();
	const keyword = searchParams.get('keyword');

	// API 요청 (무한 스크롤)
	const { pathname } = useLocation();

	const { ref, inView } = useInView();
	const { data, status, fetchNextPage, isFetchingNextPage, refetch } =
		useGetSearchList(pathname, keyword, path, query);

	// 최하단 div가 보이면 다음 페이지를 불러옴
	useEffect(() => {
		if (inView) fetchNextPage();
	}, [inView]);

	// 카테고리가 바뀌면 상태 초기화
	const dispatch = useDispatch();

	const handleFilterClear = async () => {
		await dispatch(setClear());
		window.scroll({
			top: 0,
			behavior: 'auto',
		});
		await refetch();
	};

	useEffect(() => {
		handleFilterClear();
	}, [keyword]);

	// 상태들이 바뀔때마다 새로운 아이템 목록을 불러옴
	useEffect(() => {
		refetch();
	}, [price, sort, brand, onSale]);

	if (status === 'Loading') {
		return <LoadingSpinner />;
	}
	if (status === 'error') {
		return <ItemListBox> error </ItemListBox>;
	}

	return (
		<Box>
			<PageTitle />
			<Mesage>
				<Text>{`"${keyword.replaceAll(
					'_',
					' ',
				)}"에 대한 검색 결과입니다.`}</Text>
			</Mesage>
			<ItemListBox>
				{data?.pages.map((page, index) => (
					<React.Fragment key={`${index.toString()}`}>
						{page.data.map((item) => (
							<SmallListCards key={item.itemId} item={item} />
						))}
					</React.Fragment>
				))}
			</ItemListBox>
			{isFetchingNextPage ? <LoadingSpinner /> : <div ref={ref} />}
		</Box>
	);
}

const Box = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
`;

const Mesage = styled.div`
	width: 1040px;
	height: 67px;
	display: flex;
	align-items: flex-end;
`;

const Text = styled.div`
	height: 36px;
	display: flex;
	align-items: center;
	font-size: 20px;
	font-weight: var(--bold);
`;

const ItemListBox = styled.div`
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	justify-content: center;
	margin-top: 100px;
`;

export default SearchList;

import styled from 'styled-components';
import { useLocation, useSearchParams } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInView } from 'react-intersection-observer';
import SmallListCards from '../components/Lists/SmallListCards';
import PageTitle from '../components/Etc/PageTitle';
import paramsMaker from '../utils/paramsMaker';
import BrandsWindow from '../components/Etc/BrandsWindow';
import { LoadingSpinner } from '../components/Etc/LoadingSpinner';
import { setClear } from '../redux/slice/filterSlice';
import { useGetList } from '../hooks/useGetList';

// 목록 페이지
function ItemList() {
	// uri에 사용할 정보들을 리덕스에서 가지고옴
	const { sort, price, brand, onSale } = useSelector((state) => state.filter);

	// uri에 붙일 파람스 생성
	const { path, query } = paramsMaker(sort, price, brand, onSale);

	// 카테고리에 따라서 아이템 목록 불러오기
	const [searchParams] = useSearchParams();
	const category = searchParams.get('categoryName') || 'all';

	// API 요청 (무한 스크롤)
	const { pathname } = useLocation();

	const { ref, inView } = useInView();
	const { data, status, fetchNextPage, isFetchingNextPage, refetch } =
		useGetList(pathname, category, path, query);

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
	}, [category]);

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
			<PageTitle
				title={
					category === '관절_뼈_건강'
						? '관절/뼈 건강'
						: category.split('_').join(' ')
				}
			/>
			<Brand>
				<BrandsWindow />
			</Brand>
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

const Brand = styled.div`
	border: none;
	background-color: #f2f2f2;
	width: 1115px;
	height: 138px;
	display: flex;
	align-items: center;
`;

const ItemListBox = styled.div`
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	justify-content: center;
	margin-top: 100px;
`;

export default ItemList;

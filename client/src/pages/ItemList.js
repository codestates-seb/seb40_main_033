/* eslint-disable no-unsafe-optional-chaining */
import styled from 'styled-components';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import SmallListCards from '../components/Lists/SmallListCards';
import PageTitle from '../components/Etc/PageTitle';
import { useGet } from '../hooks/useFetch';
import paramsMaker from '../utils/paramsMaker';
import BrandsWindow from '../components/Etc/BrandsWindow';
import Pagination from '../components/Etc/Pagination';
import { LoadingSpinner } from '../components/Etc/LoadingSpinner';

// 목록 페이지
function ItemList() {
	// 페이지네이션
	const [currentPage, setCurrentPage] = useState(1);

	// uri에 사용할 정보들을 리덕스에서 가지고옴
	const { sort, price, brand, onSale } = useSelector((state) => state.filter);

	// uri에 붙일 파람스 생성
	const { path, query } = paramsMaker(sort, price, brand, onSale);

	// 카테고리에 따라서 아이템 목록 불러오기
	const [searchParams] = useSearchParams();
	const category = searchParams.get('categoryName') || 'all';

	// API 요청
	const { pathname } = useLocation();
	const {
		isLoading,
		isError,
		data: items,
		error,
		refetch,
	} = useGet(
		`http://ec2-43-201-37-71.ap-northeast-2.compute.amazonaws.com:8080/category${path}?categoryName=${category}${query}&page=${currentPage}&size=12`,
		pathname,
	);

	const pageInfo = items?.data?.pageInfo;

	// 상태들이 바뀔때마다 새로운 아이템 목록을 불러옴
	useEffect(() => {
		refetch();
		window.scroll({
			top: 0,
			behavior: 'auto',
		});
	}, [category, price, sort, brand, onSale, currentPage]);

	if (isLoading) {
		return <LoadingSpinner />;
	}
	if (isError) {
		return <ItemListBox> {error.message} </ItemListBox>;
	}

	return (
		<Box>
			<PageTitle title={category.split('_').join(' ')} refetch={refetch} />
			<Brand>
				<BrandsWindow />
			</Brand>
			<ItemListBox>
				{items.data.data.map((item) => (
					<SmallListCards key={item.itemId} item={item} />
				))}
			</ItemListBox>
			<Pagination
				total={pageInfo.totalElements}
				size={pageInfo.size}
				page={currentPage}
				setPage={setCurrentPage}
			/>
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

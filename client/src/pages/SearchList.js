import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import SmallListCards from '../components/Lists/SmallListCards';
import PageTitle from '../components/Etc/PageTitle';
import { useGet } from '../hooks/useFetch';
import paramsMaker from '../utils/paramsMaker';
import { LoadingSpinner } from '../components/Etc/LoadingSpinner';
import Pagination from '../components/Etc/Pagination';

// 목록 페이지
function SearchList() {
	// 페이지네이션
	const [currentPage, setCurrentPage] = useState(1);

	const { sort, price, brand, onSale } = useSelector((state) => state.filter);

	// uri에 붙일 파람스 생성
	const { path, query } = paramsMaker(sort, price, brand, onSale);

	// 카테고리에 따라서 아이템 목록 불러오기
	const [searchParams] = useSearchParams();
	const keyword = searchParams.get('keyword');

	const { pathname } = useLocation();
	const {
		isLoading,
		isError,
		data: items,
		error,
		refetch,
	} = useGet(
		`http://ec2-43-201-37-71.ap-northeast-2.compute.amazonaws.com:8080/search${path}?keyword=${keyword}${query}&page=${currentPage}&size=12`,
		pathname,
	);

	const pageInfo = items?.data?.pageInfo;

	useEffect(() => {
		refetch();
		window.scroll({
			top: 0,
			behavior: 'auto',
		});
	}, [keyword, price, sort, brand, onSale, currentPage]);

	if (isLoading) {
		return <LoadingSpinner />;
	}
	if (isError) {
		return <ItemListBox> {error.message} </ItemListBox>;
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

import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import SmallListCards from '../components/Lists/SmallListCards';
import PageTitle from '../components/Etc/PageTitle';
import { useGet } from '../hooks/useFetch';
import paramsMaker from '../utils/paramsMaker';

// 목록 페이지
function SearchList() {
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
		`http://ec2-43-201-37-71.ap-northeast-2.compute.amazonaws.com:8080/search${path}?keyword=${keyword}${query}`,
		pathname,
	);
	console.log(items);

	useEffect(() => {
		refetch();
	}, [keyword, price, sort, brand]);

	if (isLoading) {
		return <ItemListBox> 대기중 ..</ItemListBox>;
	}
	if (isError) {
		return <ItemListBox> {error.message} </ItemListBox>;
	}

	return (
		<Box>
			<PageTitle />
			<Mesage>
				<Text>{`"${keyword}"에 대한 검색 결과입니다.`}</Text>
			</Mesage>
			<ItemListBox>
				{items.data.data.map((item) => (
					<SmallListCards key={item.itemId} item={item} />
				))}
			</ItemListBox>
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

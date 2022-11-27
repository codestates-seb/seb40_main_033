import styled from 'styled-components';
// import SmallListCards from '../components/Lists/SmallListCards';
// import Search from '../components/Search/Search';
// import data from '../data/data';
// import SortAndSearchButtons from '../components/Buttons/SearchButtons/SortAndSearchButtons';

// 목록 페이지
function SearchList() {
	return (
		// <Box>
		// 	<Top>
		// 		<SearchForm>
		// 			<Search />
		// 		</SearchForm>
		// 		<Filter>
		// 			<SortAndSearchButtons />
		// 		</Filter>
		// 	</Top>
		// 	<Mesage>
		// 		<Text>루테인에 대한 검색 결과입니다</Text>
		// 	</Mesage>
		// 	<ItemListBox>
		// 		{data.items.map((item) => (
		// 			<SmallListCards key={item.itemId} item={item} />
		// 		))}
		// 	</ItemListBox>
		// </Box>
		<h1>searchlist</h1>
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

const Top = styled.div`
	border-bottom: 1px solid var(--gray-200);
	width: 1115px;
	height: 138px;
	display: flex;
	align-items: center;
`;

const SearchForm = styled.div`
	margin-top: 80px;
	width: 1000px;
	height: 100px;
`;

const Filter = styled.div`
	width: 158px;
	height: 113px;
	flex-direction: column;
	display: flex;
	align-items: center;
	justify-content: center;
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
	width: 1040px;
	margin-top: 33px;
`;

export default SearchList;

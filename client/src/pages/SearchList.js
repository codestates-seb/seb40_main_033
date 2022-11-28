import styled from 'styled-components';
import { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import SmallListCards from '../components/Lists/SmallListCards';
import Search from '../components/Search/Search';
import SortAndSearchButtons from '../components/Buttons/SearchButtons/SortAndSearchButtons';
import PageTitle from '../components/Etc/PageTitle';
// 목록 페이지
function SearchList() {
	const [isItem, setIsItem] = useState(null);
	const [loding, setLoding] = useState(false);

	useEffect(() => {
		const itemData = async () => {
			setLoding(true);
			try {
				// const query = category === 'all' ? '' : `&category=${category}`;
				const response = await axios.get(`http://localhost:3002/item`);
				setIsItem(response.data); // [{id:1 ~~}, {id:2 ~~}]
				console.log(response);
				// console.log('response.data.item', response.itemData);
				console.log('isItem', isItem);
			} catch (e) {
				console.log(e);
			}
			setLoding(false);
		};
		itemData();
	}, []);

	// 대기 중 일때
	if (loding) {
		return <ItemListBox> 대기중 ..</ItemListBox>;
	}

	// 값이 설정되지 않았을 때
	if (!isItem) {
		return null;
	}

	return (
		<Box>
			<PageTitle />
			<Mesage>
				<Text>에 대한 검색 결과입니다</Text>
			</Mesage>
			<ItemListBox>
				{isItem.map((item) => (
					<SmallListCards key={item.id} item={item} />
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
	width: 1040px;
	margin-top: 33px;
`;

export default SearchList;

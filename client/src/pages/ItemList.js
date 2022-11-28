import styled, { css } from 'styled-components';
import { useCallback, useState, useEffect } from 'react';
import axios from 'axios';
import Categories from '../components/Categories/Categories';
import SmallListCards from '../components/Lists/SmallListCards';
import PageTitle from '../components/Etc/PageTitle';

// 목록 페이지
function ItemList() {
	const [category, setCategory] = useState('all');
	const [isItem, setIsItem] = useState(null);
	const [loding, setLoding] = useState(false);

	const onSelect = useCallback((ctg) => {
		setCategory(ctg);
		// console.log('category', category);
	}, []);

	useEffect(() => {
		const itemData = async () => {
			setLoding(true);
			try {
				// const query = category === 'all' ? '' : `&category=${category}`;
				const response = await axios.get(`http://localhost:3001/item`);
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
	}, [category]);

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
			<PageTitle title="눈 건강" />
			<Brand>
				<Categories category={category} onSelect={onSelect} />
			</Brand>
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

const Brand = styled.div`
	border: none;
	background-color: #f2f2f2;
	width: 1115px;
	height: 138px;
	display: flex;
	align-items: center;
`;

const ItemListBox = styled.div`
	width: 1040px;
	margin-top: 100px;
`;

export default ItemList;

import styled from 'styled-components';
import SmallListCards from '../components/Lists/SmallListCards';
import items from '../data/items.json';

// 목록 페이지
function ItemList() {
	return (
		<Box>
			<Brand>
				<Category>브랜드</Category>
			</Brand>
			<ItemListBox>
				<SmallListCards items={items} />
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

const Category = styled.div`
	width: 1000px;
	height: 100px;
	margin-left: 50px;
`;

const ItemListBox = styled.div`
	width: 1040px;
	margin-top: 100px;
`;

export default ItemList;

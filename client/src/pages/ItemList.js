import styled from 'styled-components';
import { useState } from 'react';
// import SmallListCards from '../components/Lists/SmallListCards';
// import data from '../data/data';

// 목록 페이지
function ItemList() {
	return (
		// <Box>
		// 	<Brand>
		// 		<All>전체 +</All>
		// 		<Category>
		// 			<BrandList>brand</BrandList>
		// 			<BrandList>brand</BrandList>
		// 			<BrandList>brand</BrandList>
		// 			<BrandList>brand</BrandList>
		// 			<BrandList>brand</BrandList>
		// 			<BrandList>brand</BrandList>
		// 			<BrandList>brand</BrandList>
		// 			<BrandList>brand</BrandList>
		// 		</Category>
		// 	</Brand>
		// 	<ItemListBox>
		// 		{data.items.map((item) => (
		// 			<SmallListCards key={item.itemId} item={item} />
		// 		))}
		// 		{/* <SmallListCards /> */}
		// 	</ItemListBox>
		// </Box>
		<h1>itemlists</h1>
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

const All = styled.button`
	border: none;
	font-weight: var(--extraBold);
	margin-left: 40px;
	cursor: pointer;
	margin-bottom: 78px;
`;

const Category = styled.div`
	width: 940px;
	height: 100px;
	margin-left: 70px;
	display: flex;
	flex-wrap: wrap;
`;

const BrandList = styled.div`
	margin-right: 150px;
	font-size: 14px;
	font-weight: var(--bold);
	color: var(--gray-400);
	display: flex;
	align-items: center;
	cursor: pointer;
`;

const ItemListBox = styled.div`
	width: 1040px;
	margin-top: 100px;
`;

export default ItemList;

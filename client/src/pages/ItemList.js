import styled, { css } from 'styled-components';
import { useLocation } from 'react-router-dom';
import { useCallback, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Categories from '../components/Categories/Categories';
import SmallListCards from '../components/Lists/SmallListCards';
import PageTitle from '../components/Etc/PageTitle';
import { useGet } from '../hooks/useFetch';

// 목록 페이지
function ItemList() {
	const [category, setCategory] = useState('all');
	const [isItem, setIsItem] = useState(null);
	// const [loding, setLoding] = useState(false);
	const { sort } = useSelector((state) => state.filter);
	const { price } = useSelector((state) => state.filter);

	console.log('itemListSort', sort);
	console.log('itemListprice', price);

	const onSelect = useCallback((ctg) => {
		setCategory(ctg);
		// console.log('category', category);
	}, []);

	const { pathname } = useLocation();

	const {
		isLoading,
		isError,
		data: items,
		error,
	} = useGet(
		'http://ec2-43-201-37-71.ap-northeast-2.compute.amazonaws.com:8080/category?categoryName=기타',
		pathname,
	);

	// console.log(items);

	if (isLoading) {
		return <ItemListBox> 대기중 ..</ItemListBox>;
	}
	if (isError) {
		return <ItemListBox> {error.message} </ItemListBox>;
	}

	return (
		<Box>
			<PageTitle title="눈 건강" />
			<Brand>
				<Categories category={category} onSelect={onSelect} />
			</Brand>
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

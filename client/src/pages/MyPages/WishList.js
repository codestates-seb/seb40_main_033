import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Pagination from '../../components/Etc/Pagination';
import WishListCards from '../../components/Lists/WishListCards';

function WishList() {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		axios.get('http://localhost:3001/items').then((response) => {
			console.log(response.data);
			setProducts(response.data);
		});
	}, []); // 이 부분의 주소에는 api에 적혀있는 위시리스트를 받아오는 주소가 적혀있어야 함.
	console.log(products, 'products');
	return (
		<EntireContainer>
			<WishBox>
				{products.map((product, idx) => (
					<WishListCards item={product} key={`${idx.toString()}-${product}`} />
				))}
			</WishBox>
			{products.length !== 0 ? (
				<Pagination total={products.length} limit={16} />
			) : (
				<h1>상품이 없어연!!!</h1>
			)}
		</EntireContainer>
	);
}
const EntireContainer = styled.div`
	display: flex;
	flex-direction: column;
`;
const WishBox = styled.main`
	width: 100%;
	/* border: 1px solid; // 구분을 쉽게 하기 위한 선입니다. */
	display: flex;
	flex-direction: row;
	align-items: flex-start;
	align-content: flex-start; // 카드들의 구역이 꽉 차는걸 막는 속성..
	flex-wrap: wrap;
	padding-left: 39px;
`;

export default WishList;

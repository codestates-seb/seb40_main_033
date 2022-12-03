import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled, { css } from 'styled-components';
import Pagination from '../../components/Etc/Pagination';
import WishListCards from '../../components/Lists/WishListCards';
import { useGet } from '../../hooks/useFetch';

function WishList() {
	const { pathname } = useLocation();
	const {
		isLoading,
		isError,
		data: wishListItems,
		error,
	} = useGet(
		'http://ec2-43-201-37-71.ap-northeast-2.compute.amazonaws.com:8080/wishes',
		pathname,
	);
	console.log(wishListItems);
	if (isLoading) return <PendingBox>아이템을 불러오는 중입니다...</PendingBox>;
	if (isError)
		return <PendingBox className="error">{error.message}</PendingBox>;
	return (
		<EntireContainer>
			<WishBox>
				{wishListItems.data.data.map((wishItem, idx) => (
					<WishListCards
						item={wishItem}
						key={`${idx.toString()}-${wishItem}`}
					/>
				))}
			</WishBox>
			{/* {wishListItems.data.length !== 0 ? (
				<Pagination total={wishListItems.data.length} limit={16} />
			) : (
				<h1>상품이 없어연!!!</h1>
			)} */}
		</EntireContainer>
	);
}
const EntireContainer = styled.div`
	display: flex;
	flex-direction: column;
`;
const WishBox = styled.main`
	width: 100%;
	display: grid;
	grid-template-columns: repeat(4, 1fr);
`;

const PendingBox = styled.div`
	width: 100%;
	height: 100;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 24px;
	color: var(--purple-300);
	&.error {
		color: var(--red-100);
	}
`;
export default WishList;

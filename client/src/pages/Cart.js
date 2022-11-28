import { useEffect } from 'react';
import { Outlet, useMatch, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import PageTitle from '../components/Etc/PageTitle';

function Cart() {
	const isMatch = useMatch('/cart');
	const navigate = useNavigate();

	useEffect(() => {
		if (isMatch) {
			navigate('/cart/normal');
		}
	}, []);

	return (
		<Container>
			<PageTitle title="장바구니" />
			<Outlet />
		</Container>
	);
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
`;

export default Cart;

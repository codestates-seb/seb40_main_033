import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import PageTitle from '../components/Etc/PageTitle';

function Cart() {
	const { pathname } = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		if (pathname === '/cart') {
			navigate('/cart/normal');
		}
	}, []);

	return (
		<Container>
			<PageTitle />
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

import styled from 'styled-components';
import { TempLogo } from '../../assets/Icons';

function PageTitle({ title }) {
	return (
		<Container>
			<TempLogo />
			<Title>{title || '장바구니'}</Title>
		</Container>
	);
}

const Container = styled.div`
	display: flex;
	flex-direction: column;

	svg {
		width: 43px;
		height: 20px;
	}
`;

const Title = styled.h1`
	width: 100%;
	font-size: 36px;
	font-weight: var(--extraBold);
	padding: 15px 0 30px 0;
	border-bottom: 1px solid var(--gray-200);
`;

export default PageTitle;

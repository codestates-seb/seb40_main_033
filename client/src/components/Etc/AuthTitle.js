import styled from 'styled-components';
import { TempLogo } from '../../assets/Icons';

function AuthTitle({ title }) {
	return (
		<Container>
			<TempLogo />
			<Title>{title}</Title>
		</Container>
	);
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	svg {
		width: 38px;
	}
`;

const Title = styled.h1`
	width: 100%;
	font-size: 24px;
	font-weight: var(--extraBold);
	color: var(--purple-200);
	padding: 15px 0 30px 0;
`;

export default AuthTitle;

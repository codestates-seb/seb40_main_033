import styled from 'styled-components';
import { TempLogo } from '../../assets/Icons';

function RecommendedTitle({
	title,
	description,
}: {
	title: string;
	description: string;
}) {
	return (
		<Container>
			<Title>{title}</Title>
			<Description>{description}</Description>
			<TempLogo />
		</Container>
	);
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-bottom: 40px;

	svg {
		width: 64px;
		height: 28px;
	}
`;

const Title = styled.h1`
	font-size: 32px;
	font-weight: var(--extraBold);
`;

const Description = styled.div`
	color: var(--purple-300);
	font-weight: var(--bold);
	margin: 10px 0 28px 0;
	font-size: 16px;
`;

export default RecommendedTitle;

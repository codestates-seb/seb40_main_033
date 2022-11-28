import styled from 'styled-components';
import CardCaroucel from '../../components/Caroucel/CardCaroucel';
import RecommendedTitle from '../../components/Etc/RecommendedTitle';

export default function MainSection() {
	return (
		<SectionContainer>
			<RecommendedTitle />
			<CardCaroucel />
		</SectionContainer>
	);
}

const SectionContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 120px;
	width: 100%;
	max-width: 1200px;
`;

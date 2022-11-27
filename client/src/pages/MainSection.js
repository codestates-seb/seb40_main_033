import styled from 'styled-components';
import CardCaroucel from '../components/Caroucel/CardCaroucel';
import RecommendedTitle from '../components/Etc/RecommendedTitle';
import { MainList } from '../components/Lists/ListCards';

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
	margin-top: 100px;
	width: 100%;
	max-width: 1200px;
`;

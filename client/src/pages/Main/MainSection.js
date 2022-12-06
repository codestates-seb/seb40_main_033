/* eslint-disable no-nested-ternary */
import styled from 'styled-components';
import CardCaroucel from '../../components/Caroucel/CardCaroucel';
import RecommendedTitle from '../../components/Etc/RecommendedTitle';

export default function MainSection({ items, sectionTitle }) {
	return (
		<SectionContainer>
			<RecommendedTitle title={sectionTitle[0]} description={sectionTitle[1]} />
			<CardCaroucel items={items} />
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

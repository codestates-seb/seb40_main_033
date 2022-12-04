import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ColoredButton } from '../Buttons/PurpleButton';

function CaroucelInfo({ type, title, description, color, link }) {
	return (
		<InfoContainer>
			<Type>{type}</Type>
			<TitleBox>
				{title.map((text, i) => (
					<Title key={`${i.toString()}-${text}`} color={color}>
						{text}
					</Title>
				))}
			</TitleBox>
			<DescriptionBox>
				{description.map((text, i) => (
					<Description key={`${i.toString()}-${text}`}>{text}</Description>
				))}
			</DescriptionBox>
			<Link to={link}>
				<ColoredButton
					type="submit"
					width="110px"
					height="35px"
					bgColor={color}
				>
					READ MORE
				</ColoredButton>
			</Link>
		</InfoContainer>
	);
}

export default CaroucelInfo;

// Path: client/src/components/Caroucel/Caroucel-Info.js

const InfoContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
	width: 100%;
	height: 100%;
`;

const Type = styled.p`
	font-weight: var(--bold);
	color: var(--gray-400);
`;

const TitleBox = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
	margin: 5px 0 10px 0;
`;
const Title = styled.h1`
	font-weight: var(--bold);
	font-size: 24px;
	line-height: 35px;
	color: ${({ color }) => `${color}`};
`;

const DescriptionBox = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
	margin: 0 0 40px 0;
`;
const Description = styled.p`
	font-weight: var(--regular);
	color: var(--gray-300);
	line-height: 20px;
`;

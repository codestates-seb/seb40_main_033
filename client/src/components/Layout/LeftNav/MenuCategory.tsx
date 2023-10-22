import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import { CATEGORIES } from '../../../assets/Constants';
import LeftNavMenu from './LeftNavMenu';

export default function MenuCategory() {
	return (
		<CategoryContainer>
			{CATEGORIES.map((el, i) => (
				<Link
					to={`/list?categoryName=${CATEGORIES[i]
						.replaceAll(' ', '_')
						.replaceAll('/', '_')}`}
					key={`${i.toString()}-${el}`}
				>
					<LeftNavMenu el={el} i={i} />
				</Link>
			))}
		</CategoryContainer>
	);
}

const openList = keyframes`
	0% {
		opacity: 0;
		top: -20px;
	}
	100% {
		top: 0;
		opacity: 100%;
	}
`;

const CategoryContainer = styled.ul`
	display: flex;
	flex-direction: column;
	position: relative;
	animation: ${openList} 0.3s ease-in-out;
`;

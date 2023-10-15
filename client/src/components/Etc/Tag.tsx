import styled from 'styled-components';
import { Link } from 'react-router-dom';

interface TagProps {
	categories: string[];
}

function Tag({ categories }: TagProps) {
	return (
		<TagContainer>
			{categories.map((category, index) => (
				<Link
					to={`/list?categoryName=${category}`}
					key={`${index.toString()}-${category}`}
				>
					<TagName>
						{category === '관절_뼈_건강'
							? category.replaceAll('_', ' ').replace('절 뼈', '절/뼈')
							: category.replaceAll('_', ' ')}
					</TagName>
				</Link>
			))}
		</TagContainer>
	);
}

const TagContainer = styled.div`
	display: flex;
`;

const TagName = styled.div`
	display: flex;
	align-items: center;
	font-size: 13px;
	cursor: pointer;
	color: var(--purple-300);
	border: none;
	background-color: #f3f1ff;
	border-radius: 6px;
	margin-right: 6px;
	padding: 5px 7px;
`;

export default Tag;

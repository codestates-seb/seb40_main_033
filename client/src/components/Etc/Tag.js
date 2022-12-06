import styled from 'styled-components';
import { Link } from 'react-router-dom';

function Tag({ funcArr }) {
	return (
		<TagContainer>
			{funcArr.map((func, index) => (
				<Link
					to={`/list?categoryName=${func}`}
					key={`${index.toString()}-${func}`}
				>
					<TagName>
						{func === '관절_뼈_건강'
							? func.replaceAll('_', ' ').replace('절 뼈', '절/뼈')
							: func.replaceAll('_', ' ')}
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

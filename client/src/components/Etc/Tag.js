import styled from 'styled-components';

function Tag({ funcArr }) {
	return (
		<TagContainer>
			{funcArr.map((func, index) => (
				<TagName key={`${index.toString()}-${func}`}>
					{func.replaceAll('_', ' ')}
				</TagName>
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

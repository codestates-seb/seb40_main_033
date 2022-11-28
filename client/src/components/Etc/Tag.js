import styled from 'styled-components';

function Tag({ funcArr }) {
	return (
		<TagContainer>
			{funcArr.map((func, index) => (
				<TagName key={`${index.toString()}-${func}`}>{func}</TagName>
			))}
		</TagContainer>
	);
}

const TagContainer = styled.div`
	display: flex;
`;

const TagName = styled.div`
	/* display: flex; */
	/* & > button { */
	display: flex;
	/* justify-content: center; */
	align-items: center;
	font-size: 13px;
	/* font-weight: var(--bold); */
	/* height: 23px; */
	cursor: pointer;
	color: var(--purple-300);
	border: none;
	background-color: #f3f1ff;
	border-radius: 6px;
	margin-right: 6px;
	padding: 5px 7px;
	/* } */
`;

export default Tag;

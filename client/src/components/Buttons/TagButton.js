import styled from 'styled-components';

function FuncTag({ funcArr }) {
	return (
		<TagBox>
			{funcArr.map((func, index) => (
				<button type="button" key={`${index.toString()}-${func}`}>
					{func}
				</button>
			))}
		</TagBox>
	);
}

const TagBox = styled.div`
	display: inline-flex;
	& > button {
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 13px;
		font-weight: var(--bold);
		height: 23px;
		cursor: pointer;
		color: var(--purple-300);
		border: none;
		background-color: #efecff;
		border-radius: 6px;
		margin-right: 6px;
		padding: 0 6px;
	}
`;

export default FuncTag;

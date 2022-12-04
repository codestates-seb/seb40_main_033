import styled, { css } from 'styled-components';

export function BlackButton({ children, onClick }) {
	return (
		<DefaultButton black onClick={onClick}>
			{children}
		</DefaultButton>
	);
}

export function WhiteButton({ children, onClick }) {
	return <DefaultButton onClick={onClick}>{children}</DefaultButton>;
}

const DefaultButton = styled.button`
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 16px;
	width: 148px;
	height: 38.5px;
	cursor: pointer;
	border-radius: 5px;
	${(props) =>
		props.black
			? css`
					-webkit-user-select: none;
					color: white;
					background-color: var(--gray-500);
					border: none;
			  `
			: css`
					-webkit-user-select: none;
					color: var(--gray-500);
					background-color: white;
					border: 0.5px solid var(--gray-500);
			  `}
`;

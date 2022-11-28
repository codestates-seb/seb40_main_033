import styled, { css } from 'styled-components';

export default function PayPageContainer({ children, last }) {
	return (
		<PayItemInfoContainer className={last}>{children}</PayItemInfoContainer>
	);
}

const PayItemInfoContainer = styled.section`
	width: 588px;
	background-color: white;
	border-radius: 10px;
	box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.07);
	padding: 50px 67px;
	margin-bottom: 24px;
`;

import styled from 'styled-components';

export default function PayPageContainer({ children, Info }) {
	return (
		<PayItemInfoContainer>
			<InfoHeading>{Info}</InfoHeading>
			{children}
		</PayItemInfoContainer>
	);
}
const InfoHeading = styled.h2`
	font-size: 20px;
	color: var(--gray-500);
	margin-bottom: 44px;
`;
const PayItemInfoContainer = styled.section`
	width: 588px;
	background-color: white;
	border-radius: 10px;
	box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.07);
	padding: 50px 67px;
	margin-bottom: 24px;
`;

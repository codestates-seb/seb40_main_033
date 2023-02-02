import styled from 'styled-components';

export default function PayPageContainer({ children, Info }) {
	return (
		<PayItemInfoContainer>
			{Info && <InfoHeading>{Info}</InfoHeading>}
			{children}
		</PayItemInfoContainer>
	);
}

const PayItemInfoContainer = styled.section`
	display: flex;
	flex-direction: column;
	justify-content: center;
	width: 539px;
	background-color: white;
	border-radius: 10px;
	box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.05);
	margin-bottom: 24px;
	padding: 60px 40px;
`;

const InfoHeading = styled.h2`
	font-size: 20px;
	color: var(--gray-500);
	margin-bottom: 44px;
`;

import { useState } from 'react';
import styled, { css } from 'styled-components';
import { LightPurpleButton } from '../Buttons/PurpleButton';
import PayPageContainer from './PayPageContainer';

export default function PayMethod() {
	return (
		<PayPageContainer>
			<PayMethodHeading>결제 수단</PayMethodHeading>
			<ButtonBox>
				<LightPurpleButton
					width="200px"
					height="50px"
					// onClick
					borderRadius="6px"
					fontSize="16px"
					fontWeight="regular"
				>
					카드 결제
				</LightPurpleButton>
			</ButtonBox>
		</PayPageContainer>
	);
}

const PayMethodHeading = styled.h2`
	font-size: 20px;
	color: var(--gray-500);
	margin-bottom: 44px;
`;

const ButtonBox = styled.div`
	display: flex;
	flex-direction: row;
	width: 100%;
	justify-content: space-between;
`;

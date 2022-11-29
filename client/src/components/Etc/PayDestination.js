import { useState } from 'react';
import styled from 'styled-components';
import PayPageContainer from './PayPageContainer';

export default function PayDestination() {
	const [destInputValue, setDestInputValue] = useState({
		realName: '도현수',
		phone: '010-99369-9771',
		address: '(12321) 경기도 수원시 장안구 이;ㅏ런ㅁ아',
		detailAddress: '201 동 703호',
	});
	return (
		<PayPageContainer Info="배송지 정보">
			<DestInputContainer>
				<DestInputBox>
					<DestInputLabel>이름</DestInputLabel>
					<Destination>{destInputValue.realName}</Destination>
				</DestInputBox>
				<DestInputBox>
					<DestInputLabel>전화번호</DestInputLabel>
					<Destination>{destInputValue.phone}</Destination>
				</DestInputBox>
				<DestInputBox>
					<DestInputLabel>주소</DestInputLabel>
					<Destination>{destInputValue.address}</Destination>
				</DestInputBox>
				<DestInputBox>
					<DestInputLabel />
					<Destination>{destInputValue.detailAddress}</Destination>
				</DestInputBox>
			</DestInputContainer>
		</PayPageContainer>
	);
}

const DestInputContainer = styled.form`
	width: 100%;
	display: flex;
	flex-direction: column;
	& > button {
		align-self: flex-end;
	}
`;
const DestInputBox = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	margin-bottom: 30px;
	&.last {
		margin-bottom: 40px;
	}
`;

const DestInputLabel = styled.div`
	color: var(--gray-400);
	margin-top: 6px;
`;

const Destination = styled.div`
	width: 296px;
	border: 0;
	border-bottom: 1px solid var(--gray-300);
	font-size: 13px;
	word-break: break-all;
`;

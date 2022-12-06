import styled from 'styled-components';
import PayPageContainer from './PayPageContainer';

export default function PayDestination({ payData }) {
	return (
		<PayPageContainer Info="배송지 정보">
			<DestInputContainer>
				<DestInputBox>
					<DestInputLabel>이름</DestInputLabel>
					<Destination>{payData.name}</Destination>
				</DestInputBox>
				<DestInputBox>
					<DestInputLabel>전화번호</DestInputLabel>
					<Destination>{payData.phone}</Destination>
				</DestInputBox>
				<DestInputBox>
					<DestInputLabel>주소</DestInputLabel>
					<Destination>{payData.address}</Destination>
				</DestInputBox>
				<DestInputBox className="last">
					<DestInputLabel />
					<Destination>{payData.detailAddress}</Destination>
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
		margin-bottom: 0px;
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

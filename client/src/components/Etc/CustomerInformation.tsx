import styled from 'styled-components';
import { PayData } from '../../types/payment.type';
import {
	InfoContainer,
	Contents,
	Title,
	Destination,
	Label,
} from './PaymentSummary';

export default function CustomerInformation({ payData }: { payData: PayData }) {
	return (
		<InfoContainer className="top">
			<Title>배송지 정보</Title>
			<Contents>
				<LabelContainer />
				<Destination>
					<Label>이름</Label>
					<div>{payData.name}</div>
				</Destination>
				<Destination>
					<Label>전화번호</Label>
					<div>{payData.phone}</div>
				</Destination>
				<Destination>
					<Label>주소</Label>
					<div className="address">{`${payData.address},\n${payData.detailAddress}`}</div>
				</Destination>
			</Contents>
		</InfoContainer>
	);
}

const LabelContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100px;
`;

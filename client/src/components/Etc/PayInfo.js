import styled from 'styled-components';
import Price from './Price';

// 배송지 정보
export function DestinationInfo({ name, phone, address, detailAddress }) {
	return (
		<InfoContainer className="top">
			<Title>배송지 정보</Title>
			<Contents>
				<LabelContainer />
				<Destination>
					<Label>이름</Label>
					<div>{name}</div>
				</Destination>
				<Destination>
					<Label>전화번호</Label>
					<div>{phone}</div>
				</Destination>
				<Destination>
					<Label>주소</Label>
					<div className="address">{`${address}, ${detailAddress}`}</div>
				</Destination>
			</Contents>
		</InfoContainer>
	);
}

// 결제 정보
// 결제수단까지 표시하고자 하면 options 필요
export function PaymentInfo({
	totalPrice,
	totalDiscountPrice,
	expectPrice,
	options,
}) {
	return (
		<InfoContainer className="bottom">
			<Title>최종 결제 정보</Title>
			<Contents>
				<Payment>
					<Label className="price-label">상품합계</Label>
					<Price nowPrice={totalPrice} fontSize="18px" fontWeight="bold" />
				</Payment>
				<Payment>
					<Label className="price-label">할인합계</Label>
					<Price
						nowPrice={totalDiscountPrice}
						minus
						fontSize="18px"
						fontWeight="bold"
					/>
				</Payment>
				<Payment>
					<Label className="price-label">최종결제금액</Label>
					<Price
						nowPrice={expectPrice}
						fontSize="18px"
						fontWeight="extraBold"
					/>
				</Payment>
				{options && (
					<Payment className="payment-options">
						<Label className="price-label">결제수단</Label>
						<div>카카오페이</div>
					</Payment>
				)}
			</Contents>
		</InfoContainer>
	);
}

const InfoContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	margin: 10px 0;
`;

const Contents = styled.div`
	display: flex;
	flex-direction: column;
`;

const Destination = styled.div`
	display: flex;

	& > * {
		font-size: 15px;
	}

	> label {
		width: 110px;
	}

	.address {
		width: 300px;
		line-height: 1.3;
	}

	& {
		margin: 12px 0;
	}
`;

const Payment = styled(Destination)`
	justify-content: space-between;

	.price-label {
		margin-right: 50px;
	}

	&.payment-options {
		margin-top: 40px;
	}
`;

const Title = styled.h1`
	font-size: 20px;
	font-weight: var(--bold);
	margin-bottom: 35px;
`;

const LabelContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100px;
`;

const Label = styled.label`
	color: var(--gray-400);
`;

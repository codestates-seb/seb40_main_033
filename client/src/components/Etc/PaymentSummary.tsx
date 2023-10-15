import styled from 'styled-components';
import Price from './Price';
import { PayData } from '../../types/payment.type';

export default function PaymentSummary({ payData }: { payData: PayData }) {
	return (
		<InfoContainer className="bottom">
			<Title>최종 결제 정보</Title>
			<Contents>
				<Payment>
					<Label className="price-label">상품합계</Label>
					<Price
						nowPrice={payData.totalPrice}
						fontSize="18px"
						fontWeight="bold"
					/>
				</Payment>
				<Payment>
					<Label className="price-label">할인합계</Label>
					<Price
						nowPrice={payData.totalDiscountPrice}
						minus
						fontSize="18px"
						fontWeight="bold"
					/>
				</Payment>
				<Payment>
					<Label className="price-label">최종결제금액</Label>
					<Price
						nowPrice={payData.expectPrice}
						fontSize="18px"
						fontWeight="extraBold"
					/>
				</Payment>
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
	margin-left: 20px;
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
		white-space: pre-wrap;
		line-height: 1.5;
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

const Label = styled.label`
	color: var(--gray-400);
`;

export { InfoContainer, Contents, Title, Destination, Label };

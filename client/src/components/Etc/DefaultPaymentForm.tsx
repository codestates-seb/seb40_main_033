import styled, { css } from 'styled-components';
import PageTitle from './PageTitle';
import PayItemInformation from './PayItemInformation';
import PaymentSummary from './PaymentSummary';
import CustomerInformation from './CustomerInformation';
import PayMethod from './PayMethod';
import PayPageContainer from './PayPageContainer';
import { PayData } from '../../types/payment.type';

interface DefaultPaymentProps {
	payData: PayData;
	titleName: string;
	isSub: boolean;
}
function DefaultPaymentForm({
	payData,
	titleName,
	isSub,
}: DefaultPaymentProps) {
	return (
		<>
			<PageTitle title={titleName} />
			<PaymentContainer>
				<PayInfoBox left>
					<PayPageContainer>
						<CustomerInformation payData={payData} />
					</PayPageContainer>
					<PayMethod payData={payData} />
				</PayInfoBox>
				<PayInfoBox right>
					<PayItemInformation payData={payData} isSub={isSub} />
					<PayPageContainer>
						<PaymentSummary payData={payData} />
					</PayPageContainer>
				</PayInfoBox>
			</PaymentContainer>
		</>
	);
}

const PaymentContainer = styled.main`
	display: flex;
	flex-direction: row;
`;
const PayInfoBox = styled.article<{ left?: boolean; right?: boolean }>`
	width: 50%;
	display: flex;
	flex-direction: column;
	${(props) =>
		props.left
			? css`
					padding-right: 30px;
					border-right: 1px solid var(--gray-200);
			  `
			: css`
					padding-left: 30px;
			  `}
`;
export default DefaultPaymentForm;

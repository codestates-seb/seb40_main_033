import styled, { css } from 'styled-components';
import PageTitle from './PageTitle';
import FinalPaymentInformation from './FinalPaymentInfomation';
import PayItemInformation from './PayItemInformation';
import PayDestination from './PayDestination';
import PayMethod from './PayMethod';
import { PaymentInfo } from './PayInfo';
import PayPageContainer from './PayPageContainer';

function DefaultPayment({ titleName, isSub }) {
	return (
		<>
			<PageTitle title={titleName} />
			<PaymentContainer>
				<PayInfoBox left>
					<PayDestination />
					<PayMethod />
				</PayInfoBox>
				<PayInfoBox right>
					<PayItemInformation isSub={isSub} />
					<PayPageContainer payment>
						<PaymentInfo />
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
const PayInfoBox = styled.article`
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
export default DefaultPayment;

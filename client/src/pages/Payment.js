// 일반결제 페이지
import styled, { css } from 'styled-components';
import PageTitle from '../components/Etc/PageTitle';
import { DestinationInfo } from '../components/Etc/PayInfo';
import FinalPaymentInformation from '../components/Etc/FinalPaymentInfomation';
import PayItemInformation from '../components/Etc/PayItemInformation';
import PayDestination from '../components/Etc/PayDestination';
import PaymentInfoMethod from '../components/Etc/PaymentInfoMethod';

function Payment() {
	return (
		<>
			<PageTitle title="일반결제" />
			<PaymentContainer>
				<PayInfoBox left>
					<PaymentInfoMethod />
				</PayInfoBox>
				<PayInfoBox right>
					<PayItemInformation />
					<FinalPaymentInformation />
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
	width: 620px;
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
export default Payment;

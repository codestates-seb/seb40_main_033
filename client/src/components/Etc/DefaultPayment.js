import styled, { css } from 'styled-components';
import PageTitle from './PageTitle';
import PayItemInformation from './PayItemInformation';
import PayDestination from './PayDestination';
import PayMethod from './PayMethod';
import { PaymentInfo } from './PayInfo';
import PayPageContainer from './PayPageContainer';

function DefaultPayment({ payData, titleName, isSub }) {
	return (
		<>
			<PageTitle title={titleName} />
			<PaymentContainer>
				<PayInfoBox left>
					<PayDestination payData={payData} />
					<PayMethod payData={payData} />
				</PayInfoBox>
				<PayInfoBox right>
					<PayItemInformation payData={payData} isSub={isSub} />
					<PayPageContainer payment>
						<PaymentInfo payData={payData} />
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

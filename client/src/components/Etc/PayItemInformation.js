import styled from 'styled-components';
import PayLists from '../Lists/PayLists';
import PayPageContainer from './PayPageContainer';

export default function PayItemInformation() {
	return (
		<PayPageContainer Info="상품정보">
			<ListContainer>
				<PayLists />
				<PayLists />
				<PayLists />
				<PayLists />
			</ListContainer>
		</PayPageContainer>
	);
}

const ListContainer = styled.article`
	display: flex;
	flex-direction: column;
	width: 454px;
	height: 540px;
	overflow: scroll;
	::-webkit-scrollbar {
		display: none;
	}
`;

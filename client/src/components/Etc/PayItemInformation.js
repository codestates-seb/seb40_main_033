import styled from 'styled-components';
import PayLists from '../Lists/PayLists';
import PayPageContainer from './PayPageContainer';

export default function PayItemInformation({ isSub }) {
	return (
		<PayPageContainer Info="상품 정보">
			<ListContainer>
				<PayLists {...(isSub && { isSub: 'isSub' })} />
				<PayLists {...(isSub && { isSub: 'isSub' })} />
				<PayLists {...(isSub && { isSub: 'isSub' })} />
				<PayLists {...(isSub && { isSub: 'isSub' })} />
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

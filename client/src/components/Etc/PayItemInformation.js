import styled, { css } from 'styled-components';
import PayLists from '../Lists/PayLists';

// 그 흰 박스긴 한데 뭘 잘못한지를 모르겠어가지구...일단 쓰고 봄

export default function PayItemInformation() {
	return (
		<PayItemInfoContainer>
			<PayItemInfoHeading>상품정보 padding: 50px 54px</PayItemInfoHeading>
			<ListContainer>
				<PayLists />
				<PayLists />
				<PayLists />
				<PayLists />
			</ListContainer>
		</PayItemInfoContainer>
	);
}

const PayItemInfoContainer = styled.section`
	width: 588px;
	background-color: white;
	border-radius: 10px;
	box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.07);
	padding: 50px 67px;
	margin-bottom: 24px;
`;

const PayItemInfoHeading = styled.h2`
	font-size: 20px;
	color: var(--gray-500);
	margin-bottom: 44px;
`;

const ListContainer = styled.article`
	display: flex;
	flex-direction: column;
	width: 454px;
	height: 540px;
	border: 1px solid; // 나중에 없애세요
	overflow: scroll;
	::-webkit-scrollbar {
		display: none;
	}
`;

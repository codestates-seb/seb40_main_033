import styled from 'styled-components';
import Price from '../../components/Etc/Price';
import OrderDetailList from '../../components/Lists/MyPageLists/OrderDetailList';

// 주문내역 상세조회
function OrderDetail() {
	return (
		<Box>
			<LeftContainer>
				<Title>배송지 정보</Title>
				<Destination>
					<LabelContainer>
						<Label>이름</Label>
						<Label>전화번호</Label>
						<Label>주소</Label>
					</LabelContainer>
					<InfoContainer>
						<div>김코딩</div>
						<div>010-1234-5678</div>
						<div>
							서울특별시 서초구 서초대로 396, 강남빌딩 20층(스파크플러스 강남
							2호점), 코드스테이츠
						</div>
					</InfoContainer>
				</Destination>
				<Title>결제 정보</Title>
				<Destination>
					<LabelContainer>
						<Label>상품합계</Label>
						<Label>할인합계</Label>
						<Label>최종결제금액</Label>
						<Label>결제수단</Label>
					</LabelContainer>
					<InfoContainer>
						<Price nowPrice={120000} />
						<Price nowPrice={120000} />
						<Price nowPrice={74400} />
						<div>카카오페이</div>
					</InfoContainer>
				</Destination>
			</LeftContainer>
			<RightContainer>
				<OrderDetailList />
				<OrderDetailList />
				<OrderDetailList />
				<OrderDetailList />
			</RightContainer>
		</Box>
	);
}

const Box = styled.div`
	display: flex;
	justify-content: space-between;
	width: 1038px;
`;

const LeftContainer = styled.section`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	border: 1px solid #f1f1f1;
	background-color: white;
	width: 510px;
	height: 710px;
	padding: 50px;
	box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.05);
	border-radius: 10px;
	* {
		font-size: 16px;
	}
`;

const RightContainer = styled(LeftContainer)`
	align-items: center;
`;

const Destination = styled.div`
	display: flex;
	justify-content: space-between;
	width: 100%;
	* {
		margin: 10px 0;
	}
`;

const Title = styled.div`
	display: flex;
	font-size: 20px;
	font-weight: var(--bold);
	margin-bottom: 30px;
`;

const LabelContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100px;
	label {
		/* margin-right: 50px; */
	}
`;

const InfoContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 300px;
`;

const Label = styled.label`
	color: var(--gray-300);
`;

export default OrderDetail;

import { useState } from 'react';
import styled from 'styled-components';
import { loadTossPayments } from '@tosspayments/payment-sdk';
import { LightPurpleButton } from '../Buttons/PurpleButton';
import PayPageContainer from './PayPageContainer';
import Kakao from '../../assets/images/social/kakao.png';
import AddressModal from '../Modals/AddressModal';

export default function PayMethod() {
	const clientKey = process.env.REACT_APP_CLIENT_API_KEY;
	const [isPayModal, setPayModal] = useState(false);
	const tossPay = () =>
		loadTossPayments(clientKey).then((tossPayments) => {
			// 카드 결제 메서드 실행
			tossPayments.requestPayment('카드', {
				amount: 123223, // 총가격
				orderId: `9abcdef`, // 주문 id
				orderName: '영양제', // 결제상품 이름
				customerName: `Pillivery`, // 판매자, 판매처 이름
				successUrl: 'http://localhost:3000', // 성공시 리다이렉트 주소
				failUrl: 'http://localhost:3000', // 실패시 리다이렉트 주소
				validHours: 24, // 유효시간
				cashReceipt: {
					type: '소득공제',
				},
			});
		});
	const kakaoClick = () => {
		setPayModal(true);
	};
	return (
		<PayPageContainer Info="결제 수단">
			<ButtonBox>
				<LightPurpleButton
					width="220px"
					height="50px"
					onClick={tossPay}
					borderRadius="6px"
					fontSize="16px"
					fontWeight="regular"
				>
					카드 결제
				</LightPurpleButton>
				<KakaoPayButton onClick={kakaoClick}>
					<KakaoPayImg />
					카카오페이
				</KakaoPayButton>
			</ButtonBox>
			<ClauseContainer>
				<Clauses>
					환불 받으신 날짜 기준으로 3~5일(주말 제외) 후 결제대행사에서 직접
					고객님의 계좌로 환불 처리됩니다.
				</Clauses>
				<Clauses>
					회원 본인은 구매 조건, 주문 내용 확인 및 결제에 동의합니다.
				</Clauses>
			</ClauseContainer>
			{isPayModal && (
				<AddressModal setIsOpen={setPayModal} modalIsOpen={isPayModal}>
					<PayFrame src="https://www.youtube.com/" title="결제창" />
				</AddressModal>
			)}
		</PayPageContainer>
	);
}

const ButtonBox = styled.div`
	display: flex;
	flex-direction: row;
	width: 100%;
	justify-content: space-between;
	margin-bottom: 44px;
`;

const KakaoPayButton = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: #ffeb00;
	width: 220px;
	height: 50px;
	border-radius: 6px;
	border: none;
	font-size: 16px;
	font-weight: var(--regular);
	color: rgba(0, 0, 0 0.85);
	cursor: pointer;
	padding-right: 15px;
	transition: 0.3s all;
	&:hover {
		font-weight: var(--bold);
		background-color: #ffdb0d;
	}
`;
const KakaoPayImg = styled.img.attrs({
	src: Kakao,
})`
	height: 40px;
	width: 40px;
	padding: 9px 7px 7px 8px;
`;
const ClauseContainer = styled.section`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 100%;
	height: 44px;
`;

const Clauses = styled.p`
	color: var(--gray-300);
	font-size: 11px;
	line-height: 13px;
`;

const PayFrame = styled.iframe`
	width: 300px;
	height: 500px;
`;

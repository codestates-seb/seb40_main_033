import { useState } from 'react';
import styled from 'styled-components';
import { loadTossPayments } from '@tosspayments/payment-sdk';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { LightPurpleButton } from '../Buttons/PurpleButton';
import PayPageContainer from './PayPageContainer';
import Kakao from '../../assets/images/social/kakao.png';
import AddressModal from '../Modals/AddressModal';

export default function PayMethod({ payData }) {
	const [url, setUrl] = useState('');
	const { expectPrice, orderId, itemOrders, subscription } = payData;
	const clientKey = process.env.REACT_APP_CLIENT_API_KEY;
	const [isPayModal, setPayModal] = useState(false);
	const tossPay = () =>
		loadTossPayments(clientKey).then((tossPayments) => {
			tossPayments.requestPayment('카드', {
				amount: `${expectPrice}`,
				orderId: `${orderId}abcdef`,
				orderName: `${itemOrders.data[0].item.title}, ${itemOrders.data.length} 건`,
				customerName: `Pillivery`,
				successUrl:
					'http://ec2-43-201-37-71.ap-northeast-2.compute.amazonaws.com:8080/payments/general/success',
				failUrl:
					'http://ec2-43-201-37-71.ap-northeast-2.compute.amazonaws.com:8080/fail',
				validHours: 24,
				cashReceipt: {
					type: '소득공제',
				},
			});
		});

	const kakaoClick = async () => {
		const response = await axios.get(
			`http://ec2-43-201-37-71.ap-northeast-2.compute.amazonaws.com:8080/payments/kakao-pay?orderId=${orderId}`,
		);
		setUrl(response.data.next_redirect_pc_url);
		setPayModal(true);
	};
	return (
		<PayPageContainer Info="결제 수단">
			<ButtonBox className={subscription ? 'sub' : null}>
				{/* {!subscription && (
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
				)} */}
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
					<PayFrame src={url} title="결제창" />
					<GobackButton onClick={() => window.history.back()}>
						전 페이지로 돌아가기
					</GobackButton>
					<Link
						to={
							subscription
								? '/mypage/order/subscription'
								: '/mypage/order/normal'
						}
					>
						<LightPurpleButton width="150px" height="40px" fontSize="13px">
							주문내역 보러가기
						</LightPurpleButton>
					</Link>
				</AddressModal>
			)}
		</PayPageContainer>
	);
}

const ButtonBox = styled.div`
	display: flex;
	flex-direction: row;
	width: 100%;
	/* justify-content: space-between; */ // 토스가 복구되면 얘를 써야 합니다.
	justify-content: center; // 토스가 복구되기 전 까지의 임시 설정입니다.
	margin-bottom: 44px;
	&.sub {
		justify-content: center;
	}
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

const GobackButton = styled.button`
	margin-bottom: 8px;
	margin-top: 20px;
	width: 150px;
	height: 40px;
	border: 0.5px solid var(--gray-300);
	border-radius: 6px;
	box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.05);
	background-color: white;
	text-align: center;
	cursor: pointer;
	transition: 0.5s ease;
	&:hover {
		border: 0.5px solid var(--gray-200);
		background-color: var(--gray-100);
	}
`;

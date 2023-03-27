import { useState } from 'react';
import styled, { css } from 'styled-components';
import { loadTossPayments } from '@tosspayments/payment-sdk';
import { Link } from 'react-router-dom';
import { LightPurpleButton } from '../Buttons/PurpleButton';
import PayPageContainer from './PayPageContainer';
import Kakao from '../../assets/images/social/kakao.png';
import AddressModal from '../Modals/AddressModal';
import { PAY_GUIDE } from './Constants';
import axiosInstance from '../../utils/axiosInstance';
import { PayData } from '../../types/payment.type';

export default function PayMethod({ payData }: { payData: PayData }) {
	const [url, setUrl] = useState('');
	const { expectPrice, orderId, itemOrders, subscription } = payData;
	const clientKey = process.env.REACT_APP_CLIENT_API_KEY;
	const [isPayModal, setPayModal] = useState(false);
	const tossPay = () =>
		loadTossPayments(clientKey ?? '').then((tossPayments) => {
			tossPayments.requestPayment('카드', {
				amount: +`${expectPrice}`,
				orderId: `${orderId}abcdef`,
				orderName: `${itemOrders.data[0].item.title}, ${itemOrders.data.length} 건`,
				customerName: `Pillivery`,
				successUrl:
					'http://ec2-43-201-37-71.ap-northeast-2.compute.amazonaws.com:8080/payments/general/success',
				failUrl:
					'http://ec2-43-201-37-71.ap-northeast-2.compute.amazonaws.com:8080/payments/fail',
				validHours: 24,
				cashReceipt: {
					type: '소득공제',
				},
			});
		});

	const kakaoClick = async () => {
		const response = await axiosInstance.get(
			`/payments/kakao-pay?orderId=${orderId}`,
		);
		setUrl(response.data.next_redirect_pc_url);
		setPayModal(true);
	};
	return (
		<PayPageContainer Info="결제 수단">
			<ButtonBox subscription={subscription}>
				{!subscription && (
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
				)}
				<KakaoPayButton onClick={kakaoClick}>
					<KakaoPayImg />
					카카오페이
				</KakaoPayButton>
			</ButtonBox>
			<Clauses>{PAY_GUIDE}</Clauses>
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

const ButtonBox = styled.div<{ subscription: boolean }>`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 110px;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 44px;
	${({ subscription }) => subscription && `justify-content: center;`}
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

const Clauses = styled.p`
	color: var(--gray-300);
	font-size: 13px;
	white-space: pre-wrap;
	line-height: 1.5;
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

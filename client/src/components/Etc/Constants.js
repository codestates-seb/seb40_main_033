import styled from 'styled-components';

export function DeliveryInfo() {
	const info = `배송 방법 : 택배 배송
	배송 지역 : 전국
	배송 비용 : 무료
	배송 예정일 : 평일 기준 출고 후 1~2일 소요 (관할 지역 택배사 사정에 따라 추가 소요될 수 있음)

	천재지변, 물량 급증, 수급 변동 등 예외적인 사유 발생 시, 배송이 지연될 수 있는 점 양해 부탁드립니다.
	군부대 일부와 해외의 경우 배송이 어려울 수 있습니다
	
	평일 낮 12시 이전 결제 시 : 당일 출고 (주말 및 공휴일 제외)
	평일 낮 12시 이후 결제 시 : 다음날 출고 (주말 및 공휴일 제외)`;
	return <InfoContent>{info}</InfoContent>;
}

export function ReturnInfo() {
	const info = `교환/반품 안내
	- 단순 변심에 의한 교환 / 반품은 제품 수량 후 7일까지 가능하며 왕복 배송비는 고객부담입니다.
	- 상세주소 미입력, 주소지 오기재 등으로 인해 상품이 반송될 경우 왕복 배송비는 고객부담입니다.
	- 고객 사유로 인한 교환/반품/반송 시 왕복 배송비 5,000원이 발생하며 제주 및 도서산간 지역의 경우 실제 왕복 배송비가 부과됩니다.
	- 상품 불량 및 오배송 등으로 인한 귀책 사유가 있을 경우, 교환/반품 배송비는 필리버리가 부담합니다.
	
	교환/반품 제한사항
	- 고객의 사용, 시간경과, 제품 소비에 의해 제품의 가치가 현저히 감소한 경우
	- 구성품의 분실, 누락, 파손 혹은 포장이 훼손되어 제품의 가치가 현저히 감소한 경우`;

	return <InfoContent>{info}</InfoContent>;
}
export function ProductInfo({
	expiration,
	capacity,
	servingSize,
	nutritionFacts,
}) {
	const info = `상품 유형
	건강기능식품

	유통기한
	${expiration} 까지

	영양 정보
	- 용량 : ${capacity}정 (${capacity / servingSize}일)
	- 영양성분 : ${nutritionFacts.map(
		(fact) => ` ${fact.ingredient} (${fact.volume})`,
	)}
	- 1일 섭취량: 1회 ${servingSize}정

	섭취 방법
	1일 1회, 1회 ${servingSize}캡슐을 충분한 물과 함께 섭취하십시오.

	섭취 시 주의사항
	- 질환이 있거나 의약품 복용 시 전문가와 상담하십시오.
	- 알레르기 체질 등은 개인에 따라 과민반응을 나타낼 수 있습니다.
	- 이상사례 발생 시 섭취를 중단하고 전문가와 상담하십시오.
	- 어린이가 함부로 섭취하지 않도록 일일섭취량 방법을 지도하십시오.
	- 강력방습제(실리카겔)는 섭취하지 마십시오.

	보관 방법
	- 수분 및 열에 의해 품질에 영향을 받을 수 있으므로 직사광선을 피해 서늘한 곳에 보관하시고, 어린이 손에 닿지 않는 곳에 보관하십시오.
- 충격에 제품이 깨질 수 있으니 주의하십시오.
	`;

	return <InfoContent>{info}</InfoContent>;
}

const InfoContent = styled.pre`
	white-space: pre-line;
	font-size: 15px;
	line-height: 1.5;
	color: var(--gray-400);
`;

const constants = {
	firstPayClause:
		'환불 받으신 날짜 기준으로 3~5일(주말 제외) 후 결제대행사에서 직접 고객님의 계좌로 환불 처리됩니다.',
	secondPayClause:
		'회원 본인은 구매 조건, 주문 내용 확인 및 결제에 동의합니다.',
};

export default constants;

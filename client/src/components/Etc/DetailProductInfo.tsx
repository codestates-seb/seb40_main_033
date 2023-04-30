import styled from 'styled-components';
import { DetailProductInfoProps } from '../../types/item.type';

function DetailProductInfo({
	expiration,
	capacity,
	servingSize,
	nutritionFacts,
}: DetailProductInfoProps) {
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

export default DetailProductInfo;

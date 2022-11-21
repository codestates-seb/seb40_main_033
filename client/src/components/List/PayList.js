import styled from 'styled-components';
import { useState } from 'react';

function PayList() {
	// true 정기구독 결제목록, false 일반 결제목록

	const [isSub, setIsSub] = useState(true);

	return (
		<Box>
			<Image> img </Image>
			<Wrap>
				<InformationForm>
					<Brand>California Gold Nutrition</Brand>
					<Prod>
						<Name>오메가3 프리미엄 피쉬 오일</Name>
						<Pill>, 60정</Pill>
					</Prod>
					<Price>6000원</Price>
				</InformationForm>
				<QuantityForm>
					{isSub ? <SubInfo>2주마다</SubInfo> : null}
					<Bottom>
						<Quantity>1개/</Quantity>
						<PriceBold>6000원</PriceBold>
					</Bottom>
				</QuantityForm>
			</Wrap>
		</Box>
	);
}

const Box = styled.div`
	background-color: white;
	width: 420px;
	height: 179px;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Wrap = styled.div`
	margin-top: 40px;
	width: 260px;
	height: 110px;
	display: flex;
	flex-direction: column;
	font-size: 13px;
`;

const Image = styled.div`
	border: 1px solid green;
	width: 121px;
	height: 121px;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const InformationForm = styled.div`
	width: 187px;
	height: 65px;
	margin-left: 24px;
	flex-direction: column;
	display: flex;
	justify-content: space-between;
`;

const Brand = styled.div`
	border: 1px solid green;
	color: var(--green-200);
	font-weight: var(--bold);
`;

const Prod = styled.div`
	display: flex;
`;

const Name = styled.div`
	border: 1px solid purple;
	color: var(--gray-600);
	font-weight: var(--bold);
	display: flex;
	margin-bottom: 15px;
`;

const Pill = styled.div`
	border: 1px solid orange;
	height: 15px;
	color: var(--gray-600);
	font-weight: var(--bold);
`;

const Price = styled.div`
	border: 1px solid red;
	color: var(--gray-600);
	font-weight: var(--regular);
`;

const QuantityForm = styled.div`
	width: 100px;
	position: relative;
	left: 170px;
`;

const SubInfo = styled.div`
	border: 1px solid green;
	margin-left: 45px;
	width: 38px;
	height: 24px;
	font-size: 11px;
	font-weight: var(--Bold);
	color: var(--purple-300);
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Quantity = styled.div`
	color: var(--gray-500);
	font-weight: var(--regular);
`;

const PriceBold = styled.div`
	border: 1px solid red;
	color: var(--gray-600);
	font-weight: var(--extrabold);
`;

const Bottom = styled.div`
	width: 83.3px;
	display: flex;
	font-size: 16px;
`;

export default PayList;

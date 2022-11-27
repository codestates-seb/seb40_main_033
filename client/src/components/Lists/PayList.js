import styled from 'styled-components';
import { useState } from 'react';
import Price from '../Etc/Price';

function PayList() {
	const price = 7000;
	const quantity = 5;
	const PillsNum = 40;

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
						<Pill>, {PillsNum}정</Pill>
					</Prod>
					<Price nowPrice={price} />
				</InformationForm>
				<QuantityForm>
					{isSub ? <SubInfo>2주마다</SubInfo> : null}
					<Bottom isSub={isSub}>
						<Quantity>{quantity} 개/</Quantity>
						<Price // 가격 * 수량
							nowPrice={price}
							quantity="3" // 수량!
							fontSize="16px"
							fontWeight="extraBold"
						/>
					</Bottom>
				</QuantityForm>
			</Wrap>
		</Box>
	);
}

const Box = styled.div`
	border-bottom: 1px solid rgb(235, 235, 235);
	background-color: white;
	width: 420px;
	height: 179px;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Wrap = styled.div`
	margin-top: 25px;
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
	margin-left: 20px;
	flex-direction: column;
	display: flex;
	justify-content: space-between;
`;

const Brand = styled.div`
	color: var(--green-200);
	font-weight: var(--bold);
`;

const Prod = styled.div`
	display: flex;
	width: 210px;
`;

const Name = styled.div`
	color: var(--gray-600);
	font-weight: var(--bold);
	display: flex;
	margin-bottom: 14px;
`;

const Pill = styled.div`
	height: 15px;
	color: var(--gray-600);
	font-weight: var(--bold);
`;

const QuantityForm = styled.div`
	width: 100px;
	position: relative;
	left: 155px;
`;

const SubInfo = styled.div`
	margin-left: 34px;
	width: 60px;
	height: 24px;
	font-size: 11px;
	font-weight: var(--bold);
	color: var(--purple-300);
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Quantity = styled.div`
	color: var(--gray-600);
	font-weight: var(--extraBold);
`;

const Bottom = styled.div`
	display: flex;
	font-size: 16px;
	margin-top: ${(props) => (props.isSub ? '5px' : '20px')};
`;

export default PayList;

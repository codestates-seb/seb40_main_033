import styled from 'styled-components';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Price from '../Etc/Price';

export default function PayLists({
	isSub,
	talk,
	brand,
	thumbnail,
	title,
	price,
	capacity,
	quantity,
	discountRate,
	beforePrice,
	period,
	itemId,
}) {
	const navigate = useNavigate();

	const handlePageMove = useCallback(() => {
		navigate(`/detail/${itemId}`);
	}, []);

	return (
		<Box>
			<ImageContainer>
				<Image src={thumbnail} onClick={handlePageMove} />
			</ImageContainer>
			<Wrap>
				<Brand>{brand}</Brand>
				<Name onClick={handlePageMove}>
					{title}, {capacity}정
				</Name>
				{!talk ? (
					<Price fontSize="13px" nowPrice={price} />
				) : (
					<Price // 가격 * 수량
						beforePrice={beforePrice}
						discountRate={discountRate}
						nowPrice={price}
						fontSize="13px"
					/>
				)}
				<BottomContainer>
					<SubInfo className={isSub}>{period}일 마다</SubInfo>
					{!talk && (
						<Total>
							<Quantity>{quantity}개 / </Quantity>
							<Price // 가격 * 수량
								beforePrice={beforePrice}
								discountRate={discountRate}
								nowPrice={price}
								quantity={quantity} // 수량!
								fontSize="16px"
								fontWeight="Bold"
							/>
						</Total>
					)}
				</BottomContainer>
			</Wrap>
		</Box>
	);
}

const Box = styled.div`
	border-bottom: 1px solid rgb(235, 235, 235);
	background-color: white;
	width: 100%;
	height: 180px;
	display: flex;
	align-items: center;
	padding: 19px;
`;

const Wrap = styled.div`
	display: flex;
	flex-direction: column;
	margin-left: 20px;
	width: 100%;
`;

const ImageContainer = styled.div`
	display: flex;
`;

const Image = styled.img`
	width: 120px;
	height: 120px;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
`;

const Brand = styled.div`
	color: var(--green-200);
	font-weight: var(--bold);
	margin-bottom: 4px;
`;

const Name = styled.div`
	font-weight: var(--bold);
	margin-bottom: 14px;
	cursor: pointer;
`;

const BottomContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-end;
`;

const SubInfo = styled.div`
	font-size: 11px;
	font-weight: var(--bold);
	color: var(--purple-300);
	margin-bottom: 4px;
	visibility: hidden;
	&.isSub {
		visibility: visible;
	}
`;

const Total = styled.div`
	display: flex;
	font-weight: var(--bold);
	* {
		font-size: 15px;
	}
`;

const Quantity = styled.div`
	margin-right: 3px;
`;

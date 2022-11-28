import styled from 'styled-components';
import { LetterButtonColor } from '../Buttons/LetterButton';
import ListDate from '../Etc/ListDate';
import { LongTextStar } from '../Stars/TextStar';

function DetailReviewList() {
	return (
		<Box>
			<TopContainer>
				<Name>코알라</Name>
				<ButtonContainer>
					<LetterButtonColor fontSize="12px">수정</LetterButtonColor>
					<span />
					<LetterButtonColor fontSize="12px">삭제</LetterButtonColor>
				</ButtonContainer>
			</TopContainer>
			<InfoContainer>
				<LongTextStar noText />
				<ListDate data="2022.11.23T18.30.58" />
			</InfoContainer>
			<Review>
				저렴한 가격에 좋은 제품입니다. 요새 매일같이 새벽에 자느라 아침마다 항상
				피곤했는데 꾸준히 먹으니 피로감이 덜해졌어요!! 덕분에 프로젝트에서
				3인분의 효율을 낼 수 있을 것 같아요!! 팀원들아 나만 믿어~~~! ^^
			</Review>
		</Box>
	);
}

const Box = styled.div`
	background-color: white;
	width: 100%;
	height: 210px;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 34px 10px;
	border-bottom: 1px solid #f1f1f1;
`;

const TopContainer = styled.div`
	/* border-bottom: 1px solid rgb(235, 235, 235); */
	display: flex;
	/* align-items: center; */
	justify-content: space-between;
	width: 100%;
`;

const Name = styled.div`
	font-size: 16px;
	font-weight: var(--bold);
	margin-bottom: 14px;
`;

const InfoContainer = styled.div`
	display: flex;
	align-self: flex-start;
	& > div {
		margin-right: 10px;
	}
`;

const Review = styled.div`
	/* border: 1px solid black; */

	/* height: 100px; */
	/* text-align: left; */
	align-self: start;
	padding: 20px 0;
	color: var(--gray-400);
	font-size: 14px;
	line-height: 1.5;
`;

const ButtonContainer = styled.div`
	/* width: 80px;
	height: 20px; */
	/* position: relative; */
	/* left: 580px;
	bottom: 80px; */
	display: flex;
	align-items: center;
	color: var(--gray-200);

	span {
		width: 1px;
		height: 13px;
		background-color: var(--gray-200);
	}
`;

export default DetailReviewList;

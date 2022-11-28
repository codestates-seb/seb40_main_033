import styled from 'styled-components';
import { LetterButtonColor } from '../../Buttons/LetterButton';
import ListDate from '../../Etc/ListDate';

function DetailReviewList() {
	return (
		<Box>
			<Main>
				<Name>아이디</Name>
				<Wrap>
					<Star>별점</Star>
					<ListDate data="2022.11.23T18.30.58" />
				</Wrap>
				<ReviewForm>리뷰</ReviewForm>
			</Main>
			<Button>
				<LetterButtonColor fontSize="11px">수정</LetterButtonColor>
				<div>|</div>
				<LetterButtonColor fontSize="11px">삭제</LetterButtonColor>
			</Button>
		</Box>
	);
}

const Box = styled.div`
	background-color: white;
	width: 676px;
	height: 213px;
	display: flex;
	align-items: center;
`;

const Main = styled.div`
	border-bottom: 1px solid rgb(235, 235, 235);
	width: 610px;
	height: 170px;
	margin-top: 18px;
	margin-left: 35px;
	position: absolute;
`;

const Name = styled.div`
	width: 400px;
	height: 20px;
	color: var(--gray-600);
	font-weight: var(--bold);
`;

const Wrap = styled.div`
	height: 26px;
	display: flex;
`;

const Star = styled.div`
	width: 90px;
	height: 26px;
`;

const ReviewForm = styled.div`
	border: 1px solid black;
	width: 500px;
	height: 100px;
`;

const Button = styled.div`
	width: 80px;
	height: 20px;
	position: relative;
	left: 580px;
	bottom: 80px;
	display: flex;
	color: var(--gray-200);
`;

export default DetailReviewList;

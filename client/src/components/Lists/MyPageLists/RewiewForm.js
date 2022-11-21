import styled from 'styled-components';
import { LetterButtonColor } from '../../Buttons/LetterButton';

function Review() {
	return (
		<Box>
			<Main>
				<Name>아이디</Name>
				<Wrap>
					<Star>별점</Star>
					<Date>날짜</Date>
				</Wrap>
				<ReviewForm>리뷰</ReviewForm>
			</Main>
			<Button>
				<LetterButtonColor color="gray" colorCode="200" fontSize="11px">
					수정
				</LetterButtonColor>
				<LetterButtonColor color="gray" colorCode="200" fontSize="11px">
					삭제
				</LetterButtonColor>
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
	justify-content: center;
`;

const Main = styled.div`
	width: 560px;
	height: 160px;
`;

const Name = styled.div`
	border: 1px solid red;
	width: 400px;
	height: 20px;
	color: var(--gray-600);
	font-weight: var(--bold);
`;

const Wrap = styled.div`
	width: 200px;
	height: 26px;
	display: flex;
`;

const Star = styled.div`
	border: 1px solid green;
	width: 90px;
	height: 26px;
`;

const Date = styled.div`
	border: 1px solid green;
	width: 75px;
	height: 26px;
	color: var(--gray-200);
`;

const ReviewForm = styled.div`
	border: 1px solid blue;
	width: 500px;
	height: 112px;
`;

const Button = styled.div`
	width: 70px;
	height: 20px;
	display: flex;
	position: relative;
	left: 8px;
	bottom: 75px;
`;

export default Review;

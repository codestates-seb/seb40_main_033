import styled from 'styled-components';
import { LetterButtonColor } from '../../Buttons/LetterButton';

function Review() {
	return (
		<Box>
			<Form>
				<Img>이미지</Img>
				<MainForm>
					<Brand>브랜드</Brand>
					<Name>이름</Name>
					<Wrap>
						<Star>별점</Star>
						<Date>날짜</Date>
					</Wrap>
					<ReviewForm />
				</MainForm>
				<Button>
					<LetterButtonColor fontSize="11px">수정</LetterButtonColor>
					<div>|</div>
					<LetterButtonColor fontSize="11px">삭제</LetterButtonColor>
				</Button>
			</Form>
		</Box>
	);
}

const Box = styled.div`
	background-color: white;
	width: 896px;
	height: 213px;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Form = styled.div`
	border-bottom: 1px solid rgb(235, 235, 235);
	width: 840px;
	height: 185px;
	display: flex;
	align-items: center;
`;

const Img = styled.div`
	border: 1px solid black;
	width: 130px;
	height: 144px;
`;

const MainForm = styled.div`
	width: 500px;
	height: 150px;
`;

const Brand = styled.div`
	border: 1px solid green;
	width: 100px;
	height: 20px;
	color: var(--green-200);
	font-weight: var(--regular);
	font-size: 16px;
`;

const Name = styled.div`
	border: 1px solid red;
	width: 300px;
	height: 20px;
	color: var(--gray-600);
	font-weight: var(--bold);
	font-size: 20px;
`;

const Wrap = styled.div`
	width: 500px;
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

const ReviewForm = styled.input`
	border: 1px solid orange;
	width: 500px;
	height: 82px;
	color: var(--gray-400);
`;

const Button = styled.div`
	width: 90px;
	height: 20px;
	display: flex;
	align-items: center;
	position: relative;
	left: 140px;
	bottom: 80px;
	color: var(--gray-200);
`;

export default Review;

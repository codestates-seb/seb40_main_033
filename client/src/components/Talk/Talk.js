import styled from 'styled-components';
import { LetterButtonColor } from '../Buttons/LetterButton';

function Talk() {
	return (
		<Box>
			<Form>
				<Img>이미지</Img>
				<MainForm>
					<Brand>브랜드</Brand>
					<Name>이름</Name>
					<TalkForm />
				</MainForm>
				<Button>
					<LetterButtonColor fontSize="11px">수정</LetterButtonColor>
					<div>|</div>
					<LetterButtonColor fontSize="11px">삭제</LetterButtonColor>
				</Button>
			</Form>
			<Date>날짜</Date>
		</Box>
	);
}

const Box = styled.div`
	border-bottom: 1px solid rgb(235, 235, 235);
	background-color: white;
	width: 864px;
	height: 187px;
	display: flex;
`;

const Form = styled.div`
	height: 180px;
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
	height: 125px;
`;

const Brand = styled.div`
	width: 100px;
	height: 20px;
	color: var(--green-200);
	font-weight: var(--regular);
	font-size: 16px;
`;

const Name = styled.div`
	width: 300px;
	height: 20px;
	color: var(--gray-600);
	font-weight: var(--bold);
	font-size: 20px;
`;

const TalkForm = styled.input`
	width: 700px;
	height: 82px;
	color: var(--gray-400);
	margin-top: 15px;
`;

const Button = styled.div`
	width: 80px;
	height: 20px;
	display: flex;
	position: relative;
	left: 150px;
	bottom: 70px;
	color: var(--gray-200);
`;

const Date = styled.div`
	width: 75px;
	height: 15px;
	color: var(--gray-200);
	position: relative;
	top: 170px;
	left: 80px;
`;

export default Talk;

import styled from 'styled-components';
import { BsArrowReturnRight } from 'react-icons/bs';
import { LetterButtonColor } from '../Buttons/LetterButton';

function Comment() {
	return (
		<Box>
			<Form>
				<Img>이미지</Img>
				<MainForm>
					<Brand>브랜드</Brand>
					<Name>이름</Name>
					<Wrap>
						<Icon>
							<BsArrowReturnRight />
						</Icon>
						<TalkForm>Talk</TalkForm>
					</Wrap>
				</MainForm>
				<Button>
					<LetterButtonColor color="gray" colorCode="200" fontSize="11px">
						수정
					</LetterButtonColor>
					<LetterButtonColor color="gray" colorCode="200" fontSize="11px">
						삭제
					</LetterButtonColor>
				</Button>
			</Form>
			<Date>날짜</Date>
		</Box>
	);
}

const Box = styled.div`
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
	width: 700px;
	font-size: 16px;
	display: flex;
`;

const Icon = styled.div`
	color: var(--purple-200);
	font-size: 17px;
`;

const TalkForm = styled.div`
	border: 1px solid orange;
	width: 700px;
	height: 82px;
	color: var(--gray-400);
`;

const Button = styled.div`
	width: 70px;
	height: 20px;
	display: flex;
	position: relative;
	left: 160px;
	bottom: 76px;
`;

const Date = styled.div`
	border: 1px solid green;
	width: 75px;
	height: 26px;
	color: var(--gray-200);
	position: relative;
	top: 150px;
	left: 80px;
`;

export default Comment;

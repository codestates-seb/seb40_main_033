import styled from 'styled-components';
import { LetterButtonColor } from '../Buttons/LetterButton';

function DetailTalk() {
	return (
		<Box>
			<Main>
				<Name>이름</Name>
				<TalkForm>글</TalkForm>
				<LetterButtonColor color="purple" colorCode="200" fontSize="12px">
					답변작성
				</LetterButtonColor>
			</Main>
			<Button>
				<LetterButtonColor color="gray" colorCode="200" fontSize="11px">
					수정
				</LetterButtonColor>
				<LetterButtonColor color="gray" colorCode="200" fontSize="11px">
					삭제
				</LetterButtonColor>
			</Button>
			<Date>날짜</Date>
		</Box>
	);
}

const Box = styled.div`
	background-color: white;
	width: 660px;
	height: 169px;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Main = styled.div`
	width: 450px;
	height: 110px;
	margin-left: 8px;
	flex-direction: column;
	display: flex;
	justify-content: space-between;
`;

const Name = styled.div`
	border: 1px solid green;
	width: 300px;
	height: 20px;
	color: var(--gray-600);
	font-weight: var(--bold);
	font-size: 16px;
`;

const TalkForm = styled.div`
	border: 1px solid red;
	width: 450px;
	height: 40px;
	color: var(--gray-600);
	font-weight: var(--regular);
	font-size: 13px;
`;

const Button = styled.div`
	width: 70px;
	height: 20px;
	display: flex;
	position: relative;
	bottom: 50px;
	left: 76px;
`;

const Date = styled.div`
	border: 1px solid green;
	width: 75px;
	height: 26px;
	color: var(--gray-200);
	position: relative;
	top: 40px;
	right: 5px;
`;

export default DetailTalk;

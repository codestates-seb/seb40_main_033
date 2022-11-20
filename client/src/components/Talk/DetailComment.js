import styled from 'styled-components';
import { BsArrowReturnRight } from 'react-icons/bs';
import { LetterButtonColor } from '../Buttons/LetterButton';

function DetailComment() {
	return (
		<Box>
			<Main>
				<Wrap>
					<Icon>
						<BsArrowReturnRight />
					</Icon>
					<Name>이름</Name>
				</Wrap>
				<TalkForm>글</TalkForm>
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
	height: 120px;
	flex-direction: column;
	display: flex;
	justify-content: space-between;
	margin-left: 8px;
`;

const Wrap = styled.div`
	width: 329px;
	height: 20px;
	font-size: 16px;
	display: flex;
`;

const Icon = styled.div`
	color: var(--purple-200);
	font-size: 17px;
`;

const Name = styled.div`
	border: 1px solid green;
	width: 300px;
	height: 20px;
	color: var(--gray-600);
	font-weight: var(--bold);
	font-size: 16px;
	margin-left: 10px;
`;

const TalkForm = styled.div`
	border: 1px solid red;
	width: 450px;
	height: 70px;
	color: var(--gray-600);
	font-weight: var(--regular);
	font-size: 13px;
	margin-left: 27px;
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

export default DetailComment;

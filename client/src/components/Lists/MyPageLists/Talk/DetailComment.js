import styled from 'styled-components';
import { BsArrowReturnRight } from 'react-icons/bs';
import { LetterButtonColor } from '../../../Buttons/LetterButton';

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
				<TalkForm />
			</Main>
			<Button>
				<LetterButtonColor fontSize="11px">수정</LetterButtonColor>
				<div>|</div>
				<LetterButtonColor fontSize="11px">삭제</LetterButtonColor>
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
	border-bottom: 1px solid rgb(235, 235, 235);
	width: 600px;
	height: 130px;
	margin-left: 8px;
	margin-top: 10px;
	position: absolute;
	flex-direction: column;
	display: flex;
	justify-content: space-between;
	padding-bottom: 12px;
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
	width: 300px;
	height: 20px;
	color: var(--gray-600);
	font-weight: var(--bold);
	font-size: 16px;
	margin-left: 10px;
`;

const TalkForm = styled.input`
	width: 450px;
	height: 70px;
	color: var(--gray-600);
	font-weight: var(--regular);
	font-size: 13px;
	margin-left: 27px;
`;

const Button = styled.div`
	width: 80px;
	height: 20px;
	display: flex;
	position: relative;
	color: var(--gray-200);
	bottom: 55px;
	left: 310px;
`;

const Date = styled.div`
	width: 75px;
	height: 15px;
	color: var(--gray-200);
	position: relative;
	left: 230px;
	top: 60px;
	font-size: 13px;
`;

export default DetailComment;

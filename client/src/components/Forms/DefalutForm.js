import { useCallback, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';

// height: input 높이   target: 상품에 대한 {target}를 20자 이상 적어주세요
function DefalutForm({
	placeholder,
	maxLength,
	height,
	target,
	purpleButton,
	letterButton,
}) {
	const [contents, setContents] = useState('');

	// textarea에 입력 시 한 글자씩 씹히는 현상 방지용
	useEffect(() => {
		console.log(contents);
	}, [contents]);

	const handleInputChange = useCallback((e) => {
		setContents(e.target.value);
	}, []);

	// contents가 20자가 넘지 않은 상태에서 제출할 경우에, InfoMessage 강조해주세요~!
	return (
		<Form>
			<Input
				placeholder={placeholder}
				value={contents}
				onChange={handleInputChange}
				maxLength={maxLength}
				height={height}
			/>
			<Count height={height}>
				{contents && `${contents.length}/${maxLength}`}
			</Count>
			{/* {letterButton} */}
			<BottomContainer>
				{contents.length >= maxLength ? (
					<ErrMessage>{maxLength}자 이상 입력하실 수 없습니다.</ErrMessage>
				) : (
					<InfoMessage>
						상품에 대한 {target}를 20자 이상 적어주세요.
					</InfoMessage>
				)}
				{letterButton ? (
					<LetterBtnContainer>{letterButton}</LetterBtnContainer>
				) : (
					purpleButton
				)}
			</BottomContainer>
		</Form>
	);
}

const Form = styled.form`
	display: flex;
	flex-direction: column;
	margin-top: 40px;
`;

// Message & Button 컨테이너
const BottomContainer = styled.div`
	display: flex;
	justify-content: space-between;
`;

const Input = styled.textarea`
	width: 545px;
	${({ height }) => css`
		height: ${`${height}px`};
	`}
	padding: 28px 20px;
	line-height: 1.5;
	border: 1px solid var(--gray-200);
	resize: none;
	overflow: hidden;
	::placeholder {
		color: var(--gray-300);
	}
	:focus-visible {
		outline: none;
		border: 1px solid var(--purple-200);
	}
`;

const Count = styled.div`
	color: var(--purple-200);
	height: 9px;
	font-size: 11px;
	position: relative;
	text-align: end;
	${({ height }) => css`
		top: ${`${-height + 13}px`};
	`}
	right: 11px;
	/* position: absolute;
	top: 28px;
	right: 413px; */
`;

const ErrMessage = styled.div`
	font-size: 11px;

	color: var(--red-100);
`;

const InfoMessage = styled.div`
	font-size: 11px;
	color: var(--gray-300);
`;

const LetterBtnContainer = styled.div`
	position: relative;
	bottom: 34px;
	right: 4px;
`;

// const Container = styled.div`
// 	position: relative;
// `;

export default DefalutForm;

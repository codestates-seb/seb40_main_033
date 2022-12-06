import { useCallback, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { LetterButton } from '../Buttons/LetterButton';
import { PurpleButton } from '../Buttons/PurpleButton';

function DefalutForm({
	placeholder,
	maxLength,
	height,
	target,
	content,
	handleContent,
	handleSubmit,
}) {
	return (
		<Form>
			<Input
				placeholder={placeholder}
				value={content}
				onChange={handleContent}
				maxLength={maxLength}
				height={height}
				target={target}
			/>
			<Count>{content && `${content.length}/${maxLength}`}</Count>
			<BottomContainer>
				{content?.length >= maxLength ? (
					<ErrMessage>{maxLength}자 이상 입력하실 수 없습니다.</ErrMessage>
				) : (
					<InfoMessage>
						상품에 대한 {target}를 20자 이상 적어주세요.
					</InfoMessage>
				)}
				{target === '토크' ? (
					<TalkSubmitBtn>
						<LetterButton className="talk-submit" onClick={handleSubmit}>
							작성완료
						</LetterButton>
					</TalkSubmitBtn>
				) : (
					<PurpleButton
						width="76px"
						height="32px"
						fontSize="13px"
						onClick={handleSubmit}
					>
						작성완료
					</PurpleButton>
				)}
			</BottomContainer>
		</Form>
	);
}

const Form = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: 34px;
	width: fit-content;
	position: relative;
`;

// Message & Button 컨테이너
const BottomContainer = styled.div`
	display: flex;
	justify-content: space-between;
	position: relative;
	margin-top: 10px;
`;

const TalkSubmitBtn = styled.div`
	position: absolute;
	bottom: 30px;
	right: 8px;
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
	position: absolute;
	text-align: end;
	top: 13px;
	right: 11px;
`;

const ErrMessage = styled.div`
	font-size: 11px;
	color: var(--red-100);
`;

const InfoMessage = styled.div`
	font-size: 11px;
	color: var(--gray-300);
`;

export default DefalutForm;

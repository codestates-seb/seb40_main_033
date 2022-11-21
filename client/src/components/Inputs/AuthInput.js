/* eslint-disable jsx-a11y/label-has-associated-control */
import styled from 'styled-components';

export function AuthInput() {
	return (
		<div className="input-area">
			<input id="input" type="text" />
			<label htmlFor="input" className="placeholder">
				이메일
			</label>
			<ErrorSpan>이메일 형식으로 입력해주세요.</ErrorSpan>
		</div>
	);
}

export function AuthInputs() {
	return (
		<InputContainer className="wrap">
			<AuthInput />
		</InputContainer>
	);
}

const InputContainer = styled.div`
	width: 300px;
	height: 100px;
	.input-area {
		width: 100%;
		position: relative;
		font-size: 18px;
		margin-top: 20px;
	}
	.input-area .placeholder {
		position: absolute;
		top: 50%;
		left: 0px;
		transform: translateY(-50%);
		color: var(--gray-200);
		font-size: inherit;
		cursor: text;
		transition: 0.3s;
		font-weight: 500;
	}
	.input-area input[type='text'] {
		width: 100%;
		height: 40px;
		border: none;
		outline: none;
		border-bottom: 1px solid var(--gray-200);
		font-size: inherit;
	}
	.input-area input[type='text']:focus {
		transition: 0.3s ease-in-out;
		border-bottom: 1px solid var(--purple-200);
		caret-color: var(--purple-200);
		& + .placeholder {
			color: var(--gray-300);
			font-size: 12px;
			top: -8px;
			font-weight: 300;
		}
	}
`;

const ErrorSpan = styled.span`
	display: inline-block;
	color: var(--red-100);
	font-size: 11px;
	margin-top: 5px;
`;

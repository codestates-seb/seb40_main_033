/* eslint-disable no-param-reassign */
import { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';

export default function AuthInput({
	refAddress,
	onKeyDown,
	label,
	register,
	refHook,
	watch = {
		이메일: '',
		비밀번호: '',
		닉네임: '',
	},
	errors,
	onFocus,
	readonly,
}) {
	const [showError, setShowError] = useState(false);

	useEffect(() => {
		if (!errors) {
			setShowError(false);
		}
	}, [errors]);

	return (
		<InputBox isFilled={!!watch[label]}>
			<input
				id={label}
				type={
					label === '비밀번호' || label === '비밀번호확인' ? 'password' : 'text'
				}
				onKeyDown={(e) => onKeyDown(e, setShowError)}
				{...register}
				name={label}
				ref={(e) => {
					refHook(e);
					refAddress.current = e;
				}}
				className={showError ? 'showError' : null}
				onFocus={onFocus}
				readOnly={readonly}
			/>
			<label htmlFor={label} className="placeholder">
				{label}
			</label>
			<EnterDiv>⏎</EnterDiv>
			<ErrorDiv className={showError ? 'showError' : null}>{errors}</ErrorDiv>
		</InputBox>
	);
}

const InputBox = styled.div`
	width: 100%;
	position: relative;
	font-size: 18px;
	margin-top: 15px;

	& .placeholder {
		position: absolute;
		top: 20px;
		left: 2px;
		transform: translateY(-50%);
		transition: 0.3s ease-in-out;
		color: var(--gray-200);
		cursor: text;
		font-weight: 500;
		font-size: 18px;
	}
	& input[type='text'],
	input[type='password'] {
		width: 300px;
		height: 40px;
		border: none;
		outline: none;
		border-bottom: 1px solid var(--gray-200);
		/* font-size: 18px; */
		transition: 0.2s ease-in-out;

		&:read-only {
			color: var(--gray-300);
		}
	}

	// 자동완성 파란색 배경 삭제
	-webkit-autofill {
		box-shadow: 0 0 0 30px #fff inset;
		-webkit-text-fill-color: #000;
	}
	-webkit-autofill,
	input:-webkit-autofill:hover,
	input:-webkit-autofill:focus,
	input:-webkit-autofill:active {
		transition: background-color 5000s ease-in-out 0s;
	}

	// 비밀번호 점으로 표시되는 글씨체로 변경
	input[type='password'] {
		font-family: 'Courier New', Courier, monospace;
	}

	& input[type='text']:focus,
	input[type='password']:focus {
		border-bottom: 1px solid var(--purple-200);
		caret-color: var(--purple-200);
		&.showError {
			border-bottom: 1px solid var(--red-100);
			caret-color: var(--red-100);
		}

		&:read-only {
			border-bottom: 1px solid var(--gray-200);
		}
	}
	${({ isFilled }) =>
		isFilled &&
		css`
			.placeholder {
				color: var(--gray-300);
				font-size: 13px;
				top: 0px;
				left: 0px;
				font-weight: 300;
			}
		`}
`;

const ErrorDiv = styled.div`
	display: block;
	color: white;
	&.showError {
		color: var(--red-100);
	}
	font-size: 11px;
	margin-top: 5px;
	min-height: 15px;
`;

const EnterDiv = styled.div`
	position: absolute;
	top: 50%;
	right: 0;
	transform: translateY(-100%);
	font-size: 13px;
	color: var(--gray-200);
`;

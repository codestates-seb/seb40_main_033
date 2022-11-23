/* eslint-disable no-param-reassign */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from 'react';
import styled, { css } from 'styled-components';

export default function AuthInput({
	refAddress,
	onKeyDown,
	label,
	className,
	register,
	refHook,
	watch = {
		이메일: '',
		비밀번호: '',
		닉네임: '',
	},
}) {
	return (
		<InputBox isFilled={!!watch[label]} className={className}>
			<input
				id={label}
				type="text"
				onKeyDown={onKeyDown}
				{...register}
				name={label}
				ref={(e) => {
					refHook(e);
					refAddress.current = e;
				}}
			/>
			<label htmlFor={label} className="placeholder">
				{label}
			</label>
		</InputBox>
	);
}

const InputBox = styled.div`
	width: 100%;
	position: relative;
	font-size: 18px;
	margin-top: 30px;

	& .placeholder {
		position: absolute;
		top: 50%;
		left: 2px;
		transform: translateY(-50%);
		color: var(--gray-200);
		cursor: text;
		transition: 0.3s ease-in-out;
		font-weight: 500;
		font-size: 18px;
	}
	& input[type='text'] {
		width: 100%;
		height: 40px;
		border: none;
		outline: none;
		border-bottom: 1px solid var(--gray-200);
		font-size: 18px;
	}
	& input[type='text']:focus {
		transition: 0.3s ease-in-out;
		border-bottom: 1px solid var(--purple-200);
		caret-color: var(--purple-200);
	}
	${({ isFilled }) =>
		isFilled &&
		css`
			.placeholder {
				color: var(--gray-300);
				font-size: 13px;
				top: -8px;
				left: 0px;
				font-weight: 300;
			}
		`}
`;

/* eslint-disable no-unused-expressions */
import { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useForm } from 'react-hook-form';
import AuthInput from './AuthInput';

export default function AuthForm() {
	const [current, setCurrent] = useState(1);
	const [currentChange, setCurrentChange] = useState(false);
	const firstRef = useRef(null);
	const secondRef = useRef(null);
	const thirdRef = useRef(null);
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors, touchedFields },
		setError,
	} = useForm({
		mode: 'onChange',
	});

	// 인풋별 register
	const { ref: ref1, ...rest1 } = register('이메일', {
		required: 'email is required',
		minLength: 5,
		pattern: {
			value: /^[A-Za-z0-9._%+-]+@naver\.com$/,
			message: '이메일 형식으로 작성해주세요.',
		},
	});
	const { ref: ref2, ...rest2 } = register('비밀번호', {
		required: '비밀번호를 입력해주세요.',
		minLength: {
			value: 5,
			message: '비밀번호가 너무 짧습니다.',
		},
		validate: {
			no1234: (value) =>
				value.includes('1234') ? '1234는 포함할 수 없습니다.' : true,
			no0000: (value) =>
				value.includes('0000') ? '0000은 포함할 수 없습니다.' : true,
		},
	});
	const { ref: ref3, ...rest3 } = register('닉네임', {
		required: '작성해주세요.',
		minLength: {
			value: 2,
			message: '2글자 이상 작성해주세요.',
		},
	});

	// current가 변하면 onChange를 true로 바꾸고 0.5초 후에 false로 바꿔주는 함수.
	const onChangeHandler = () => {
		setCurrentChange(true);
		setTimeout(() => {
			setCurrentChange(false);
		}, 500);
	};

	// current가 바뀔 때마다 input에 포커스를 준다.
	const handleInput = (event) => {
		if (event.key === 'Enter') {
			if (event.target === firstRef.current && errors.이메일 === undefined) {
				setCurrent((prev) => prev + 1);
			} else if (
				event.target === secondRef.current &&
				errors.비밀번호 === undefined
			) {
				setCurrent((prev) => prev + 1);
			} else if (event.target === thirdRef.current) {
				console.log(event); // 마지막 인풋엔 submit event를 넣어야 함
			}
		}
	};

	console.log('errors', errors);

	// current가 바뀔 때마다 onChangeHandler를 실행시켜서 애니메이션이 작동한다.
	useEffect(() => {
		firstRef.current.focus();
		if (current === 2) {
			onChangeHandler();
		} else if (current === 3) {
			onChangeHandler();
		}
	}, [current]);

	const onValid = (data) => {
		console.log('data', data);
	};

	return (
		<SForm
			className={currentChange ? 'pull' : null}
			current={current}
			onSubmit={handleSubmit(onValid)}
		>
			<AuthInput
				refAddress={thirdRef}
				onKeyDown={handleInput}
				label="닉네임"
				register={rest3}
				refHook={ref3}
				watch={watch()}
			/>
			<AuthInput
				refAddress={secondRef}
				onKeyDown={handleInput}
				label="비밀번호"
				register={rest2}
				refHook={ref2}
				watch={watch()}
			/>
			<AuthInput
				refAddress={firstRef}
				onKeyDown={handleInput}
				label="이메일"
				register={rest1}
				refHook={ref1}
				watch={watch()}
			/>
			<button type="submit">Add</button>
			{/* <ErrorSpan>이메일 형식으로 입력해주세요.</ErrorSpan> */}
		</SForm>
	);
}

export const showInput = keyframes`
	0% {
		transform: translateY(40px);
		opacity: 0;
	}
	100% {
		transform: translateY(0px);
		opacity: 1;
	}
`;
const pullInput = keyframes`
  0% {
    transform: translateY(-40px);
  }
  100% {
		transform: translateY(0px);
  }
`;

const SForm = styled.form`
	position: relative;
	width: 300px;
	// 모든 자식들 가렸다가 current에 따라 보여주기
	& > * {
		opacity: 0;
		position: absolute;
	}
	&.pull {
		animation: ${pullInput} 0.3s;
	}
	// current에 따라 쌓으면서 보여주기
	& > *:nth-last-child(-n + ${(props) => props.current + 1}) {
		opacity: 1;
		position: relative;
		animation: ${showInput} 0.3s;
	}
`;

const ErrorSpan = styled.span`
	display: inline-block;
	color: var(--red-100);
	font-size: 11px;
	margin-top: 5px;
`;

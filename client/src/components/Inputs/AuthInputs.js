import { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import AuthInput from './AuthInput';

export default function AuthInputs() {
	const [current, setCurrent] = useState(1);
	const [currentChange, setCurrentChange] = useState(false);
	const firstRef = useRef(null);
	const secondRef = useRef(null);
	const thirdRef = useRef(null);

	// current가 변하면 onChange를 true로 바꾸고 1초 후에 false로 바꿔주는 함수.
	const onChangeHandler = () => {
		setCurrentChange(true);
		setTimeout(() => {
			setCurrentChange(false);
		}, 500);
	};

	useEffect(() => {
		if (current === 1) {
			firstRef.current.focus();
		} else if (current === 2) {
			secondRef.current.focus();
			onChangeHandler();
		} else if (current === 3) {
			thirdRef.current.focus();
			onChangeHandler();
		}
	}, [current]);

	const handleInput = (event) => {
		if (event.key === 'Enter') {
			if (event.target === firstRef.current) {
				setCurrent((prev) => prev + 1);
			} else if (event.target === secondRef.current) {
				setCurrent((prev) => prev + 1);
			} else if (event.target === thirdRef.current) {
				console.log(event); // 마지막 인풋엔 submit event를 넣어야 함
			}
		}
	};

	return (
		<InputContainer className={currentChange ? 'pull' : null} current={current}>
			<AuthInput Ref={thirdRef} onKeyUp={handleInput} label="닉네임" />
			<AuthInput Ref={secondRef} onKeyUp={handleInput} label="비밀번호" />
			<AuthInput Ref={firstRef} onKeyUp={handleInput} label="이메일" />
		</InputContainer>
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

const InputContainer = styled.form`
	width: 300px;
	// 모든 자식들 가렸다가 current에 따라 보여주기
	& > * {
		display: none;
	}
	&.pull {
		animation: ${pullInput} 0.3s;
	}
	// current에 따라 쌓으면서 보여주기
	& > *:nth-last-child(-n + ${(props) => props.current}) {
		display: block;
		animation: ${showInput} 0.3s;
	}
`;

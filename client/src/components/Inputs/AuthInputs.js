import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import AuthInput from './AuthInput';

export default function AuthInputs() {
	const [current, setCurrent] = useState(1);
	const firstRef = useRef(null);
	const secondRef = useRef(null);
	const thirdRef = useRef(null);

	useEffect(() => {
		if (current === 1) {
			firstRef.current.focus();
		} else if (current === 2) {
			secondRef.current.focus();
		} else if (current === 3) {
			thirdRef.current.focus();
		}
	}, [current]);

	const handleInput = (event) => {
		if (event.key === 'Enter') {
			if (event.target === firstRef.current) {
				setCurrent((prev) => prev + 1);
			} else if (event.target === secondRef.current) {
				setCurrent((prev) => prev + 1);
			} else if (event.target === thirdRef.current) {
				console.log(event);
			}
		}
	};

	return (
		<InputContainer current={current}>
			<AuthInput Ref={thirdRef} onKeyUp={handleInput} label="닉네임" />
			<AuthInput Ref={secondRef} onKeyUp={handleInput} label="비밀번호" />
			<AuthInput Ref={firstRef} onKeyUp={handleInput} label="이메일" />
		</InputContainer>
	);
}

const InputContainer = styled.form`
	width: 300px;
	// 모든 자식들 가렸다가 current에 따라 보여주기
	& > * {
		display: none;
	}
	// current에 따라 쌓으면서 보여주기
	& > *:nth-last-child(-n + ${(props) => props.current}) {
		display: block;
	}
`;

// 1. 가렸다가 보여주기
// 2. 새로 생성하기

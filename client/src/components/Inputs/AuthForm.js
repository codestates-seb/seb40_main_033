/* eslint-disable no-nested-ternary */
import { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useForm } from 'react-hook-form';
import Postcode from '@actbase/react-daum-postcode';
import AuthInput from './AuthInput';
import { PurpleButton } from '../Buttons/PurpleButton';
import AddressModal from '../Modals/AddressModal';

export function AuthForm({ signUp }) {
	const [current, setCurrent] = useState(1);
	const [currentChange, setCurrentChange] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const firstRef = useRef(null);
	const secondRef = useRef(null);
	const thirdRef = useRef(null);
	const fourthRef = useRef(null);
	const fifthRef = useRef(null);
	const sixthRef = useRef(null);
	const seventhRef = useRef(null);
	const eighthRef = useRef(null);
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
		setError,
		setValue,
		setFocus,
	} = useForm({
		mode: 'onChange',
	});

	// 인풋별 register
	const { ref: ref1, ...rest1 } = register('이메일', {
		required: '이메일을 작성해주세요.',
		minLength: {
			value: 5,
			message: '이메일 형식으로 작성해주세요.',
		},
		pattern: {
			value:
				/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i,
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
	const { ref: ref3, ...rest3 } = register('비밀번호확인', {
		required: signUp && '비밀번호를 다시 입력해주세요.',
		validate: signUp && {
			matchPreviousPassword: (value) => {
				const { 비밀번호 } = watch();
				return 비밀번호 === value || '비밀번호가 일치하지 않습니다.';
			},
		},
	});
	const { ref: ref4, ...rest4 } = register('닉네임', {
		required: signUp && '작성해주세요.',
		minLength: {
			value: 2,
			message: '2글자 이상 작성해주세요.',
		},
	});
	const { ref: ref5, ...rest5 } = register('이름', {
		required: signUp && '작성해주세요.',
		minLength: {
			value: 2,
			message: '2글자 이상 작성해주세요.',
		},
	});
	const { ref: ref6, ...rest6 } = register('전화번호', {
		required: signUp && '작성해주세요.',
		pattern: {
			value: /01[016789]-[^0][0-9]{2,3}-[0-9]{3,4}/,
			message: '000-0000-0000 형식으로 작성해주세요.',
		},
	});
	const { ref: ref7, ...rest7 } = register('주소', {
		required: signUp && '작성해주세요.',
	});
	const { ref: ref8, ...rest8 } = register('상세주소', {
		required: signUp && '작성해주세요.',
	});

	// current가 바뀔 때마다 input에 포커스를 준다.
	const handleInput = (event, setShowError) => {
		if (event.key === 'Enter') {
			setShowError(true);
			if (event.target === firstRef.current && errors.이메일 === undefined) {
				setCurrent(current + 1);
				setShowError(false);
			} else if (
				event.target === secondRef.current &&
				errors.비밀번호 === undefined
			) {
				setCurrent(current + 1);
				setShowError(false);
			} else if (
				event.target === thirdRef.current &&
				errors.비밀번호확인 === undefined
			) {
				setCurrent(current + 1);
				setShowError(false);
			} else if (
				event.target === fourthRef.current &&
				errors.닉네임 === undefined
			) {
				setCurrent(current + 1);
				setShowError(false);
			} else if (
				event.target === fifthRef.current &&
				errors.이름 === undefined
			) {
				setCurrent(current + 1);
				setShowError(false);
			} else if (
				event.target === sixthRef.current &&
				errors.전화번호 === undefined
			) {
				setCurrent(current + 1);
				setShowError(false);
			} else if (
				event.target === seventhRef.current &&
				errors.주소 === undefined
			) {
				setShowError(false);
			} else if (
				event.target === sixthRef.current &&
				errors.상세주소 === undefined
			) {
				setShowError(false);
			}
		}
	};

	// current가 변하면 onChange를 true로 바꾸고 0.5초 후에 false로 바꿔주는 함수.
	const onChangeHandler = () => {
		if (current <= 8) {
			setCurrentChange(true);
			setTimeout(() => {
				setCurrentChange(false);
			}, 500);
		}
	};

	// current가 바뀔 때마다 onChangeHandler를 실행시켜서 애니메이션이 작동한다.
	useEffect(() => {
		if (current >= 2) {
			onChangeHandler();
		}
	}, [current]);

	useEffect(() => {
		setFocus('이메일');
	}, []);

	// submit 되면 실행되는 함수.
	const onValid = (data) => {
		if (signUp) {
			console.log('signUp', data);
		} else {
			console.log('logIn', data);
		}
	};

	console.log('wat', watch());
	console.log('err', errors);
	// console.log('current', current);

	return (
		<SForm
			className={currentChange ? 'pull' : null}
			current={current}
			onSubmit={handleSubmit(onValid)}
		>
			{signUp && (
				<>
					<AuthInput
						refAddress={eighthRef}
						onKeyDown={handleInput}
						label="상세주소"
						register={rest8}
						refHook={ref8}
						watch={watch()}
						errors={errors?.상세주소?.message}
					/>
					<AuthInput
						refAddress={seventhRef}
						onKeyDown={handleInput}
						label="주소"
						register={rest7}
						refHook={ref7}
						watch={watch()}
						errors={errors?.주소?.message}
						onFocus={() => setIsModalOpen(true)}
					/>
					<AuthInput
						refAddress={sixthRef}
						onKeyDown={handleInput}
						label="전화번호"
						register={rest6}
						refHook={ref6}
						watch={watch()}
						errors={errors?.전화번호?.message}
					/>
					<AuthInput
						refAddress={fifthRef}
						onKeyDown={handleInput}
						label="이름"
						register={rest5}
						refHook={ref5}
						watch={watch()}
						errors={errors?.이름?.message}
					/>
					<AuthInput
						refAddress={fourthRef}
						onKeyDown={handleInput}
						label="닉네임"
						register={rest4}
						refHook={ref4}
						watch={watch()}
						errors={errors?.닉네임?.message}
					/>
					<AuthInput
						refAddress={thirdRef}
						onKeyDown={handleInput}
						label="비밀번호확인"
						register={rest3}
						refHook={ref3}
						watch={watch()}
						errors={errors?.비밀번호확인?.message}
					/>
				</>
			)}
			<AuthInput
				refAddress={secondRef}
				onKeyDown={handleInput}
				label="비밀번호"
				register={rest2}
				refHook={ref2}
				watch={watch()}
				errors={errors?.비밀번호?.message}
			/>
			<AuthInput
				refAddress={firstRef}
				onKeyDown={handleInput}
				label="이메일"
				register={rest1}
				refHook={ref1}
				watch={watch()}
				errors={errors?.이메일?.message}
			/>
			<PurpleButton
				width="110px"
				borderRadius="50px"
				disable={
					signUp
						? !{ ...watch() }.상세주소
							? true
							: null
						: !{ ...watch() }.비밀번호
						? true
						: null
				}
			>
				{signUp ? '계정 만들기' : '로그인'}
			</PurpleButton>
			{isModalOpen && (
				<AddressModal modalIsOpen={isModalOpen} setIsOpen={setIsModalOpen}>
					<Postcode
						style={{ width: 600, height: 500 }}
						jsOptions={{ animation: true, hideMapBtn: true }}
						onSelected={(data) => {
							setIsModalOpen(false);
							setValue('주소', `(${data.zonecode})${data.address}`);
							setCurrent(current + 1);
							setFocus('상세주소');
						}}
					/>
				</AddressModal>
			)}
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
export const pullInput = keyframes`
  0% {
    transform: translateY(-40px);
  }
  100% {
		transform: translateY(0px);
  }
`;

const SForm = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
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
	// 버튼 마진
	& > button {
		margin-top: 20px;
	}
`;

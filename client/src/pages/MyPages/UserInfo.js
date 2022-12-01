/* eslint-disable no-nested-ternary */
/* eslint-disable no-param-reassign */
// 회원정보
import { useCallback, useState, useEffect } from 'react';
import styled from 'styled-components';
import Postcode from '@actbase/react-daum-postcode';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
	LetterButton,
	LetterButtonColor,
} from '../../components/Buttons/LetterButton';
import DeleteAccountModal from '../../components/Modals/DeleteAccountModal';
import AddressModal from '../../components/Modals/AddressModal';
import GoodbyeModal from '../../components/Modals/GoodbyeModal';
import { useGet, useDelete, usePatch, usePost } from '../../hooks/useFetch';

export function UserInfo() {
	const { mutate: accountDelete } = useDelete(
		'http://ec2-43-201-37-71.ap-northeast-2.compute.amazonaws.com:8080/users',
	);
	const { pathname } = useLocation();
	const {
		isLoading,
		isError,
		data: userData,
		error,
	} = useGet(
		'http://ec2-43-201-37-71.ap-northeast-2.compute.amazonaws.com:8080/users',
		pathname,
	);
	const { mutate: userPatch } = usePatch(
		'http://ec2-43-201-37-71.ap-northeast-2.compute.amazonaws.com:8080/users',
	);
	// const { mutate: userPost } = usePost(
	// 	'http://ec2-43-201-37-71.ap-northeast-2.compute.amazonaws.com:8080/users/more-info',
	// );
	const {
		register,
		handleSubmit,
		setValue,
		watch, // 온 체인지 할  때마다 객체에  담아줌
		formState: { errors },
		// setError,
	} = useForm({
		mode: 'onBlur',
	});

	const [isModal, setModal] = useState(false);
	const [modalIsOpen, setIsOpen] = useState(false);
	const [openGoodbye, setOpenGoodbye] = useState(false);

	useEffect(() => {
		console.log('userData', userData);
		if (userData) {
			setValue('이메일', userData.data.email);
			setValue('닉네임', userData.data.displayName);
			setValue('비밀번호', userData.data.password);
			setValue('이름', userData.data.realName);
			setValue('전화번호', userData.data.phone);
			setValue('주소', userData.data.address);
			setValue('상세주소', userData.data.detailAddress);
		}
	}, [userData]);

	const onAddressChange = useCallback((data) => {
		setValue('주소', `(${data.zonecode})${data.address}`);
		setModal(false);
	});
	const handleDeleteButton = useCallback(() => {
		accountDelete();
		setIsOpen(false);
		setOpenGoodbye(true);
	});
	// console.log(watch(), 'watch');
	const nicknameReg = register('닉네임', {
		// ref1 자체는 일단 함수임
		required: '닉네임을 입력해주세요.', // 빈 칸일때
		pattern: {
			value: /^[A-Za-z0-9가-힣]{2,9}$/, // 한글 및 숫자 영문자
			message: '한글, 영어, 숫자를 사용해 2~9자 사이로 지어주세요.',
		},
	});
	const mailReg = register('이메일', {
		// required: false,
		required: true,
	});
	// 이메일은 어차피 못바꾸는 값이기 떄문에 사실상 필요가 없음..
	const pwReg = register('비밀번호', {
		required: '비밀번호를 입력해주세요.',
		pattern: {
			value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/, // 한글 및 숫자 영문자
			message: '문자, 숫자, 특수문자를 사용해 8자 이상으로 지어주세요.',
		},
		validate: {
			no1234: (value) =>
				value.includes('1234') ? '1234는 포함할 수 없습니다.' : true,
			no0000: (value) =>
				value.includes('0000') ? '0000은 포함할 수 없습니다.' : true,
		},
	});
	const rePwReg = register('비밀번호재확인', {
		required: '비밀번호를 다시 한번 입력해주세요.', // 미확인임 어케할지 알아봐야 하무ㅠㅜㅠㅜ
		validate: {
			matchPreviousPassword: (value) => {
				const { 비밀번호 } = watch();
				return 비밀번호 === value || '비밀번호가 일치하지 않습니다.';
			},
		},
	});
	const nameReg = register('이름', {
		required: '이름을 입력해주세요.',
		pattern: {
			value: /^[가-힣]{2,5}$/, // 한글 및 숫자 영문자
			message: '한글 5글자 이내로 작성해주세요.',
		},
	});
	const telReg = register('전화번호', {
		required: '전화번호를 입력해주세요.',
		pattern: {
			value: /^\d{2,3}-\d{3,4}-\d{4}$/, // 한글 및 숫자 영문자
			message: '올바른 형식으로 작성해주세요.',
		},
	});
	const adressReg = register('주소', {
		// required: false,
		required: '주소를 입력해주세요.',
	});
	const detailAddressReg = register('상세주소', {
		required: false,
	});

	const handleOpenDelete = () => {
		setIsOpen(true);
	};

	const handleOpenAddress = () => {
		setModal(true);
	};

	const handleOpenGoodbye = () => {
		setIsOpen(false);
		setOpenGoodbye(true);
	};

	const onValid = (data) => {
		// 이 안에 다 담겨있다. 이걸 가공을 해서 여기서 api요청을 하면 될 듯.
		const value = {
			// 밑의 방식으로 꺼낸 다음, 바디에 넣어서 보내기.
			displayName: data.닉네임,
			email: data.이메일,
			password: data.비밀번호,
			realName: data.이름,
			phone: data.전화번호,
			address: data.주소,
			detailAddress: data.상세주소,
		};
		console.log(value);
		userPatch(value);
	};
	// const onValid2 = (data) => {
	// 	// 소셜로그인하고 처음 들어오는 사람(Post용)
	// 	const value = {
	// 		// 밑의 방식으로 꺼낸 다음, 바디에 넣어서 보내기.
	// 		displayName: data.닉네임,
	// 		email: data.이메일,
	// 		password: data.비밀번호,
	// 		realName: data.이름,
	// 		phone: data.전화번호,
	// 		address: data.주소,
	// 		detailAddress: data.상세주소,
	// 	};
	// 	console.log(value);
	// 	userPost({ data: value });
	// };

	if (isLoading) return <div>정보를 불러오는 중 입니다...!</div>;
	if (isError) return <div>{error.message}</div>;
	return (
		<MainContainer>
			<Box>
				<InfoBox>
					<InfoHeading>기본 정보</InfoHeading>
					<InputBox>
						<Information
							label="닉네임"
							register={nicknameReg}
							// errors={errors?.닉네임?.message}
						/>
						<Information
							label="이메일"
							register={mailReg}
							// errors={errors?.이메일?.message}
						/>
						<Information
							label="비밀번호"
							register={pwReg}
							// errors={errors?.비밀번호?.message}
						/>
						<Information
							label="비밀번호재확인"
							register={rePwReg}
							// errors={errors?.비밀번호재확인?.message}
						/>
					</InputBox>
				</InfoBox>
				<InfoBox>
					<InfoHeading>배송지 정보</InfoHeading>
					<InputBox>
						<Information
							label="이름"
							register={nameReg}
							// errors={errors?.이름?.message}
						/>
						<Information
							label="전화번호"
							register={telReg}
							// errors={errors?.전화번호?.message}
						/>
						<Information
							label="주소"
							handleOpenAddress={handleOpenAddress}
							register={adressReg}
							// errors={errors?.주소?.message}
						/>
						<Information
							label="상세주소"
							register={detailAddressReg}
							// errors={errors?.상세주소?.message}
						/>
					</InputBox>
				</InfoBox>
				<LetterButton onClick={handleSubmit(onValid)}>정보 수정</LetterButton>
			</Box>
			<LetterButtonColor
				onClick={() => handleOpenDelete()}
				color="red"
				colorCode="100"
				fontSize="12px"
			>
				회원탈퇴
			</LetterButtonColor>
			<DeleteAccountModal
				setIsOpen={setIsOpen}
				modalIsOpen={modalIsOpen}
				handleOpenGoodbye={handleDeleteButton}
			/>
			<GoodbyeModal setIsOpen={setOpenGoodbye} modalIsOpen={openGoodbye} />
			{isModal && (
				<AddressModal setIsOpen={setModal} modalIsOpen={isModal}>
					<Postcode
						style={{ width: 600, height: 500 }}
						jsOptions={{ animation: true, hideMapBtn: true }}
						onSelected={onAddressChange}
					/>
				</AddressModal>
			)}
		</MainContainer>
	);
}

export function Information({ label, handleOpenAddress, register, errors }) {
	return (
		<UserInfoBox>
			{label === '비밀번호재확인' ||
			label === '상세주소' ||
			label === 'detailAddress' ? (
				<InputLabel />
			) : (
				<InputLabel> {label} </InputLabel>
			)}
			<InputDiv>
				<InfoInput
					id={label}
					type={
						label === '비밀번호' || label === '비밀번호재확인'
							? 'password'
							: 'text'
					}
					readOnly={
						label === '이메일' || label === '주소' || label === 'address'
					}
					{...((label === '주소' || label === 'address') && {
						onClick: handleOpenAddress,
					})}
					placeholder={label}
					{...register}
					name={label}
					className={errors && 'error'}
				/>
				<ErrorDiv className={errors && 'error'}>{errors}</ErrorDiv>
			</InputDiv>
		</UserInfoBox>
	);
}

const MainContainer = styled.main`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const Box = styled.form`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	border: 1px solid #f1f1f1;
	background-color: white;
	width: 864px;
	height: 710px;
	padding: 30px 50px 30px 50px;
	box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.05);
	border-radius: 10px;

	button {
		align-self: flex-end; // 이 설정 기억해둘 것 엥 얘는 왜 끝에있지 하고 아무거나 건들면 안됨..
		font-weight: var(--regular);
	}

	& + button {
		margin-top: 27px;
		font-weight: var(--regular);
	}
`;

const InfoBox = styled.section`
	display: flex;
	width: 397px;
	display: flex;
	flex-direction: column;
	margin-bottom: 30px;
`;

const InfoHeading = styled.h2`
	font-size: 20px;
	color: var(--gray-500);
`;

const InputBox = styled.div`
	margin-left: 22px;
	margin-top: 36px;
`;

const UserInfoBox = styled.div`
	position: relative;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: stretch;
	width: 370px;
	margin-bottom: 14px;
`;
const InputLabel = styled.label`
	color: var(--gray-400);
	margin-top: 6px;
`;
const InputDiv = styled.div`
	display: flex;
	flex-direction: column;
`;

const InfoInput = styled.input`
	width: 296px;
	border: 0;
	padding-bottom: 4px;
	border-bottom: 1px solid var(--gray-300);
	outline: none;
	font-size: 16px;
	word-break: break-all;

	:focus {
		border-bottom: 1px solid var(--purple-300);
	}
	&[type='password'] {
		font-family: 'Courier New', Courier, monospace;
	}
	&.error {
		border-bottom: 1px solid var(--red-100);
	}
	::placeholder {
		color: var(--gray-300);
		font-size: 13px;
	}
`;
const ErrorDiv = styled.div`
	display: block;
	visibility: hidden;
	&.error {
		visibility: visible;
	}
	color: var(--red-100);
	font-size: 11px;
	margin-top: 5px;
	min-height: 15px;
`;

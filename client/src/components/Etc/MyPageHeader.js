import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { TempLogo } from '../../assets/Icons';
import { GrayLetterButton } from '../Buttons/LetterButton';
import { logout } from '../../redux/slice/userSlice';
import axiosInstance from '../../utils/axiosInstance';

function MyPageHeader() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const localNick = localStorage.getItem('nickName');
	const { nickName } = useSelector((store) => store.nickName);
	const handleLogout = useCallback(async () => {
		const response = await axiosInstance.get('/users/logout').catch(() => {
			toast.error('회원정보를 불러오는데 실패했습니다!');
		});
		if (response) {
			await dispatch(logout());
			navigate('/', { replace: true });
			toast.success('로그아웃 되었습니다!');
		}
	}, []);
	return (
		<Container>
			<TempLogo />
			<TextContainer>
				<Nickname>{localNick || nickName}</Nickname>
				<Nim>님</Nim>
				<GrayLetterButton onClick={handleLogout} fontSize="13px">
					로그아웃
				</GrayLetterButton>
			</TextContainer>
		</Container>
	);
}

const Container = styled.header`
	display: flex;
	flex-direction: column;
	width: 100%;
	svg {
		width: 43px;
		height: 20px;
	}
`;

const TextContainer = styled.div`
	display: flex;
	align-items: flex-end;
	padding: 15px 0 30px 0;
`;

const Nim = styled.div`
	color: var(--gray-400);
	font-size: 36px;
	font-weight: var(--bold);
	margin-left: 7px;
	margin-right: 25px;
`;

const Nickname = styled.h1`
	font-size: 36px;
	font-weight: var(--extraBold);
	color: var(--gray-600);
`;

export default MyPageHeader;

import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { TempLogo } from '../../assets/Icons';
import { GrayLetterButton } from '../Buttons/LetterButton';
import { logout } from '../../redux/slice/userSlice';
import axiosInstance from '../../utils/axiosInstance';
import { RootState } from '../../redux/store/store';
import {
	FAILED_TO_LOAD_USER_INFO,
	LOGOUT_COMPLETE,
} from '../../assets/Constants';

function MyPageHeader() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const localNick = localStorage.getItem('nickName');
	const { nickName } = useSelector((store: RootState) => store.nickName);

	const handleLogout: React.MouseEventHandler<HTMLButtonElement> =
		useCallback(async () => {
			const response = await axiosInstance.get('/users/logout').catch(() => {
				toast.error(FAILED_TO_LOAD_USER_INFO);
			});

			if (response) {
				dispatch(logout());
				navigate('/', { replace: true });
				toast.success(LOGOUT_COMPLETE);
			}
		}, []);

	return (
		<Container>
			<TempLogo />
			<TextContainer>
				<Nickname>{localNick || nickName}</Nickname>
				<Nickname className="nim">님</Nickname>
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

const Nickname = styled.h1`
	font-size: 36px;
	font-weight: var(--extraBold);
	color: var(--gray-600);

	&.nim {
		color: var(--gray-400);
		font-weight: var(--bold);
		margin-left: 7px;
		margin-right: 25px;
	}
`;

export default MyPageHeader;

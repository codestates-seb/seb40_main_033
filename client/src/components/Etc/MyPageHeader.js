import axios from 'axios';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { TempLogo } from '../../assets/Icons';
import { useGet } from '../../hooks/useFetch';
import { GrayLetterButton } from '../Buttons/LetterButton';
import { logout } from '../../redux/slice/userSlice';

function MyPageHeader() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { nickName } = useSelector((store) => store.nickName);
	console.log(nickName);
	const handleLogout = useCallback(async () => {
		const response = await axios
			.get(
				'http://ec2-43-201-37-71.ap-northeast-2.compute.amazonaws.com:8080/users/logout',
			)
			.catch(() => {
				console.log('error in fetching posts');
			});
		if (response) {
			dispatch(logout());
			navigate('/', { replace: true });
			toast.success('로그아웃 되었습니다!');
		}
	}, []);
	return (
		<Container>
			<TempLogo />
			<TextContainer>
				<Nickname>{nickName || '-'}</Nickname>
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

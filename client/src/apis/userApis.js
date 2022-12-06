import axiosInstance from '../utils/axiosInstance';

export const fetchSignUp = async ({
	닉네임,
	주소,
	상세주소,
	이름,
	전화번호,
	이메일,
	비밀번호,
}) => {
	const { data } = await axiosInstance.post('/users', {
		displayName: 닉네임,
		address: 주소,
		detailAddress: 상세주소,
		realName: 이름,
		phone: 전화번호,
		email: 이메일,
		password: 비밀번호,
	});
	return data;
};

export const fetchMoreInfo = async ({
	닉네임,
	주소,
	상세주소,
	이름,
	전화번호,
	이메일,
}) => {
	const { data } = await axiosInstance.post('/users/more-info', {
		email: 이메일,
		displayName: 닉네임,
		realName: 이름,
		address: 주소,
		phone: 전화번호,
		detailAddress: 상세주소,
	});
	return data;
};

export const fetchLogIn = async ({ email, password }) => {
	const { headers } = await axiosInstance.post('/users/login', {
		username: email,
		password,
	});
	const {
		authorization: accessToken,
		refresh: refreshToken,
		userid: userId,
	} = headers;
	return { accessToken, refreshToken, userId };
};

export const fetchUserInfos = async () => {
	const { data } = await axiosInstance.get('/user', {
		headers: {
			tokenNeeded: true,
		},
	});

	return data.data;
};

export const fetchLogOut = async () => {
	const { data } = await axiosInstance.post('/users/logout', {
		headers: {
			tokenNeeded: true,
		},
	});

	return data;
};

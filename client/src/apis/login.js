import axiosInstance from '../utils/axiosInstance';

export const fetchLogin = async ({ email, password }) => {
	const { data } = await axiosInstance.post('/users/login', {
		username: email,
		password,
	});
	// const { authorization: accessToken, refresh: refreshToken } = headers;
	// return { accessToken, refreshToken };
	return data;
};

export const fetchUserInfos = async () => {
	const { data } = (await axiosInstance.get)('/user', {
		headers: {
			tokenNeeded: true,
		},
	});

	return data.data;
};

import axiosInstance from '../utils/axiosInstance';

export const fetchSignUp = async ({ email, password, name }) => {
	const { data } = await axiosInstance.post('/users', {
		username: email,
		password,
		name,
	});

	return data;
};

export const fetchLogIn = async ({ email, password }) => {
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

export const fetchLogOut = async () => {
	const { data } = await axiosInstance.post('/users/logout', {
		headers: {
			tokenNeeded: true,
		},
	});

	return data;
};

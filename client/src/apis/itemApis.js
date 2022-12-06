import axiosInstance from '../utils/axiosInstance';

export const fetchCathgoryItems = async ({
	category,
	path,
	query,
	pageParam,
}) => {
	const res = await axiosInstance.get(
		`/category${path}?categoryName=${category}${query}&page=${pageParam}&size=12`,
	);
	const { data } = res.data;
	const { pageInfo } = res.data;

	return {
		data,
		nextPage: pageParam + 1,
		isLast: pageInfo.totalPages <= pageInfo.page,
	};
};

export const fetchSearchItems = async ({
	keyword,
	path,
	query,
	pageParam = 1,
}) => {
	const res = await axiosInstance.get(
		`/search${path}?keyword=${keyword}${query}&page=${pageParam}&size=12`,
	);
	const { data } = res.data;
	const { pageInfo } = res.data;

	return {
		data,
		nextPage: pageParam + 1,
		isLast: pageInfo.totalPages <= pageInfo.page,
	};
};

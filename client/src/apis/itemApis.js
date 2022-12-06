import axios from 'axios';

export const fetchCathgoryItems = async ({
	category,
	path,
	query,
	pageParam,
}) => {
	const res = await axios.get(
		`http://ec2-43-201-37-71.ap-northeast-2.compute.amazonaws.com:8080/category${path}?categoryName=${category}${query}&page=${pageParam}&size=12`,
	);
	const { data } = res.data;
	const { pageInfo } = res.data;

	return {
		data,
		nextPage: pageParam + 1,
		isLast: pageInfo.totalPages <= pageInfo.page,
	};
};

export const fetchItemList = async ({
	category,
	path,
	query,
	pageParam = 1,
}) => {
	const res = await axios.get(
		`http://ec2-43-201-37-71.ap-northeast-2.compute.amazonaws.com:8080/category${path}?categoryName=${category}${query}&page=${pageParam}&size=12`,
	);
	const { data } = res.data;
	const { pageInfo } = res.data;

	return {
		data,
		nextPage: pageParam + 1,
		isLast: pageInfo.totalPages <= pageInfo.page,
	};
};

import {
	FetchCathgoryItems,
	FetchSearchItems,
	InfiniteQueryPromise,
} from '../types/itemList.type';
import axiosInstance from '../utils/axiosInstance';

export const fetchCathgoryItems = async ({
	category,
	path,
	query,
	pageParam,
}: FetchCathgoryItems): Promise<InfiniteQueryPromise> => {
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
	pageParam,
}: FetchSearchItems): Promise<InfiniteQueryPromise> => {
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

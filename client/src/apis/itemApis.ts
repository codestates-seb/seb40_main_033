import {
	FetchCathgoryItems,
	FetchSearchItems,
	InfiniteQueryPromise,
	Item,
} from '../types/itemList.type';
import axiosInstance from '../utils/axiosInstance';
import { FetchOrderListsProps, OrderListData } from '../types/order.type';

export const fetchCathgoryItems = async ({
	category,
	path,
	query,
	pageParam,
}: FetchCathgoryItems): Promise<InfiniteQueryPromise<Item[]>> => {
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
}: FetchSearchItems): Promise<InfiniteQueryPromise<Item[]>> => {
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

// 상세페이지 주문내역 조회
export const fetchOrderLists = async ({
	pageParam,
	isSub,
}: FetchOrderListsProps): Promise<InfiniteQueryPromise<OrderListData[]>> => {
	const res = await axiosInstance.get(
		`/orders?subscription=${isSub}&page=${pageParam}&size=7`,
	);
	const { data } = await res.data;
	const { pageInfo } = await res.data;

	return {
		data,
		nextPage: pageParam + 1,
		isLast: pageInfo.totalPages <= pageInfo.page,
	};
};

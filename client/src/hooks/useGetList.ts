import { useInfiniteQuery } from 'react-query';
import {
	fetchCathgoryItems,
	fetchSearchItems,
	fetchOrderLists,
} from '../apis/itemApis';
import { UseGetList, UseGetSearchList } from '../types/itemList.type';
import { UseGetOrderListProps } from '../types/order.type';

export const useGetList = ({ pathname, category, path, query }: UseGetList) => {
	return useInfiniteQuery(
		pathname,
		({ pageParam = 1 }) =>
			fetchCathgoryItems({ category, path, query, pageParam }),
		{
			getNextPageParam: ({ isLast, nextPage }) =>
				!isLast ? nextPage : undefined,
		},
	);
};

export const useGetSearchList = ({
	pathname,
	keyword,
	path,
	query,
}: UseGetSearchList) => {
	return useInfiniteQuery(
		pathname,
		({ pageParam = 1 }) =>
			fetchSearchItems({ keyword, path, query, pageParam }),
		{
			getNextPageParam: ({ isLast, nextPage }) =>
				!isLast ? nextPage : undefined,
		},
	);
};

// 상세페이지 주문내역조회
export const useGetOrderList = ({ pathname, isSub }: UseGetOrderListProps) => {
	return useInfiniteQuery(
		pathname,
		({ pageParam = 1 }) => fetchOrderLists({ pageParam, isSub }),
		{
			getNextPageParam: ({ isLast, nextPage }) =>
				!isLast ? nextPage : undefined,
		},
	);
};

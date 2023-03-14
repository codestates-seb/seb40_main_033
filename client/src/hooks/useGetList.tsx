import { useInfiniteQuery } from 'react-query';
import { fetchCathgoryItems, fetchSearchItems } from '../apis/itemApis';
import { UseGetList, UseGetSearchList } from '../types/itemList.type';

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

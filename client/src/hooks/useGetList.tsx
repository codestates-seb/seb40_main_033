import { useInfiniteQuery } from 'react-query';
import { fetchCathgoryItems, fetchSearchItems } from '../apis/itemApis';
import { IUseGetList, IUseGetSearchList } from '../types/itemList';

export const useGetList = ({
	pathname,
	category,
	path,
	query,
}: IUseGetList) => {
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
}: IUseGetSearchList) => {
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

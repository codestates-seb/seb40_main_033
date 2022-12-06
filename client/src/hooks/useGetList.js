import { useInfiniteQuery } from 'react-query';
import { fetchCathgoryItems, fetchSearchItems } from '../apis/itemApis';

export const useGetList = (pathname, category, path, query) => {
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

export const useGetSearchList = (pathname, keyword, path, query) => {
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

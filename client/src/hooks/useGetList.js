import { useInfiniteQuery } from 'react-query';
import { fetchCathgoryItems } from '../apis/itemApis';

const useGetList = (pathname, category, path, query) => {
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

export default useGetList;

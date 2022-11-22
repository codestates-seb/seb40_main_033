import DefaultList from './DefaultList';

const item = {
	data: {
		itemId: 1,
		thumbnail: 'url~',
		title: '우루사',
		price: 10000,
		discountRate: 20,
		discountPrice: 8000,
		categories: ['눈 건강', '간 건강'],
	},
};

export function MainList() {
	return <DefaultList item={item} main />;
}

export function WishItem() {
	return <DefaultList item={item} />;
}

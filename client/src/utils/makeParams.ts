// path 를 생성해주는 함수
const paramsMaker = (
	sort: string,
	price: string,
	brand: string,
	onSale: string,
) => {
	let path = '';
	let query = '';
	if (brand) {
		path += `/brand`;
		query += `&brand=${brand}`;
	}
	if (onSale) {
		path += `/sale`;
	}
	if (price) {
		path += `/price`;
		query += `&${price}`;
	}
	if (sort) {
		query += `&sort=${sort}`;
	}
	return { path, query };
};

export default paramsMaker;

// path 를 생성해주는 함수
export default function paramsMaker(sort, price, brand, onSale) {
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
}

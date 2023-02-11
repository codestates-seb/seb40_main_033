export interface ISummaryPrice {
	nowPrice: number;
	beforePrice?: number;
	discountRate?: number;
	fontSize?: string;
	fontWeight?: string;
}

export interface IPrice extends ISummaryPrice {
	isTotal?: boolean;
	quantity?: number;
	minus?: boolean;
}

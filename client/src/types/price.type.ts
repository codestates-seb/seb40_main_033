export interface SummaryPrice {
	nowPrice: number;
	beforePrice?: number;
	discountRate?: number;
	fontSize?: string;
	fontWeight?: string;
}

export interface Price extends SummaryPrice {
	isTotal?: boolean;
	quantity?: number;
	minus?: boolean;
}

export interface SummaryPriceProps {
	nowPrice: number;
	beforePrice?: number | boolean;
	discountRate?: number | boolean;
	fontSize?: string;
	fontWeight?: string;
}

export interface PriceProps extends SummaryPriceProps {
	isTotal?: boolean;
	quantity?: number;
	minus?: boolean;
}

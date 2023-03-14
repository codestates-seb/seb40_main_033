export interface SummaryPriceProps {
	nowPrice: number;
	beforePrice?: number;
	discountRate?: number;
	fontSize?: string;
	fontWeight?: string;
}

export interface PriceProps extends SummaryPriceProps {
	isTotal?: boolean;
	quantity?: number;
	minus?: boolean;
}

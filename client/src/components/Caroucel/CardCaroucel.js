import Slider from 'react-slick';
import styled from 'styled-components';
import './slick.css';
import './slick-theme.css';
import { IoIosArrowBack } from 'react-icons/io';
import MainListCard from '../Lists/MainListCard';

const ArrowButton = styled.button`
	width: 40px;
	height: 40px;
	background-color: white;
	border: 1px solid #f1f0fe;
	border-radius: 50px;
	transition: 0.25s ease;
	position: absolute;
	right: -24px;
	${({ left }) => left && `left: -40px;`}
	& > svg {
		path {
			color: var(--purple-200);
		}
		width: 20px;
		height: 20px;
		position: absolute;
		top: 23%;
		left: 22%;
		${({ right }) =>
			// 180도 회전
			right &&
			`
			transform: rotate(180deg);
			left: 28%;
		`}
	}
`;

const settings = {
	infinite: false,
	speed: 500,
	slidesToShow: 3,
	slidesToScroll: 1,
	nextArrow: (
		<ArrowButton right>
			<IoIosArrowBack />
		</ArrowButton>
	),
	prevArrow: (
		<ArrowButton left>
			<IoIosArrowBack />
		</ArrowButton>
	),
};

function CardCaroucel({ items }) {
	return (
		<SlideContainer>
			<Slider {...settings}>
				{items.map((item) => (
					<SlidePage key={item.itemId}>
						<MainListCard item={item} />
					</SlidePage>
				))}
			</Slider>
		</SlideContainer>
	);
}

export default CardCaroucel;

// * 캐러셀 스타일
export const SlideContainer = styled.div`
	/* width 옵션으로 전체 width 값을 지정할 수 있음 */
	width: 1000px;
	padding-left: 16px;
`;

export const SlidePage = styled.div`
	width: 297px;
	padding: 8px;
`;

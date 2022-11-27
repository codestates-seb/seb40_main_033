/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import Slider from 'react-slick';
import styled from 'styled-components';
import './slick.css';
import './slick-theme.css';
import { IoIosArrowBack } from 'react-icons/io';
import { MainList } from '../Lists/ListCards';

const ArrowButton = styled.button`
	width: 29px;
	height: 29px;
	background-color: white;
	border: 1px solid #f1f0fe;
	border-radius: 50px;
	transition: 0.25s ease;
	position: absolute;
	right: 0;
	${({ left }) => left && `left: 0;`}
	& > svg {
		path {
			color: var(--purple-200);
		}
		position: absolute;
		top: 25%;
		left: 25%;
		${({ right }) =>
			// 180도 회전
			right &&
			`
		transform: rotate(180deg);
		left: 30%;
		`}
	}
`;

function CardCaroucel() {
	const settings = {
		// dots: true,
		// infinite: true,
		speed: 500,
		slidesToShow: 3,
		slidesToScroll: 1,
		// autoplay: true,
		// autoplaySpeed: 5000,
		// pauseOnHover: true,
		// variableWidth: true,
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
		// className: 'center',
		// centerMode: true,
		// centerPadding: '0px',
	};

	return (
		<SlideContainer>
			<Slider {...settings}>
				{[1, 2, 3, 4, 5, 6].map((el, i) => (
					<SlidePage key={`${i.toString()}-${el}`}>
						<MainList />
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
`;

export const SlidePage = styled.div`
	padding: ${(props) => props.padding};
	width: 297px;
	border: blue solid 1px;
`;

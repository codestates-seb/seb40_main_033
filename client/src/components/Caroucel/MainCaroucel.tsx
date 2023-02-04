import Slider, { Settings } from 'react-slick';
import styled from 'styled-components';
import './slick.css';
import './slick-theme.css';
import { useState } from 'react';
import { MdPlayArrow, MdPause } from 'react-icons/md';
import { IoIosArrowBack } from 'react-icons/io';
import CaroucelInfo from './Caroucel-Info';
import MAINCAROUCELINFO from '../../assets/constants/MainCaroucelInfo';
import { ICustomArrowProps } from '../../types/main.type';

const ArrowButton = styled.button<ICustomArrowProps>`
	width: 40px;
	height: 40px;
	background-color: black;
	border-radius: 50px;
	transition: 0.25s ease;
	& > svg {
		path {
			color: white;
		}
		width: 20px;
		height: 20px;
		position: absolute;
		top: 25%;
		left: 23%;
		${({ right }) =>
			// 180도 회전
			right &&
			`
			transform: rotate(180deg);
			left: 28%;
		`}
	}
`;

const settings: Settings = {
	dots: true,
	infinite: true,
	speed: 500,
	slidesToShow: 2,
	slidesToScroll: 1,
	autoplay: true,
	autoplaySpeed: 5000,
	pauseOnHover: true,
	nextArrow: (
		<ArrowButton right>
			<IoIosArrowBack />
		</ArrowButton>
	),
	prevArrow: (
		<ArrowButton>
			<IoIosArrowBack />
		</ArrowButton>
	),
	className: 'center',
	centerMode: true,
	centerPadding: '0px',
};

function MainCaroucel() {
	const [sliderRef, setSliderRef] = useState<Slider | null>(null);
	const [isPlaying, setIsPlaying] = useState(true);

	const pauseFn = () => {
		sliderRef?.slickPause();
	};
	const playFn = () => {
		sliderRef?.slickPlay();
	};

	return (
		<SlideContainer>
			<Slider {...settings} ref={setSliderRef}>
				{MAINCAROUCELINFO.map((el, i) => (
					<SlidePage key={`${i.toString()}-${el}`}>
						<MultiItem>
							<SInfo>
								<CaroucelInfo
									type={el.type}
									title={el.title}
									description={el.description}
									color={el.color}
									link={el.link}
								/>
							</SInfo>
							<SImg src={el.image} />
						</MultiItem>
					</SlidePage>
				))}
			</Slider>
			<SbuttonBox>
				<Sbutton
					className={isPlaying ? 'hide' : ''}
					onClick={() => {
						playFn();
						setIsPlaying(true);
					}}
				>
					<MdPlayArrow />
				</Sbutton>
				<Sbutton
					className={!isPlaying ? 'hide' : ''}
					onClick={() => {
						pauseFn();
						setIsPlaying(false);
					}}
				>
					<MdPause />
				</Sbutton>
			</SbuttonBox>
		</SlideContainer>
	);
}

export default MainCaroucel;

// * 캐러셀 스타일
export const MultiItem = styled.div`
	opacity: 1;
	display: flex;
`;

export const SImg = styled.img`
	width: 55%;
	border-radius: 50%;
`;

const SInfo = styled.div`
	width: 45%;
	padding-left: 180px;
`;

export const SlideContainer = styled.div`
	/* width 옵션으로 전체 width 값을 지정할 수 있음 */
	width: 1090px;

	.slick-center ${MultiItem} {
		/* center 모드일때 center에게 강조할 경우 사용 */
		opacity: 1;
		transition: all 300ms ease;
		transform: scale(1);
		top: 0px;
	}

	${MultiItem} {
		/* center 모드일때 center 외 속성에게 사용 */
		transition: all 300ms ease;
		transform: scale(0.4);
		top: 155px;
	}
`;

export const SlidePage = styled.div`
	${MultiItem} {
		/* center 옵션의 경우 MultiTem 속성을 추가로 사용해서 내부 옵션을 추가로 줘야함 */
		margin: 10px;
		padding: 2%;
		position: relative;
		width: 950px;
		/* 센터아이템 왼쪽에 보여주기 */
		left: -130%;
		.slick-center & {
			/* left: -108%; */
			${SInfo} {
				color: var(--gray-500);
				transition: all 300ms ease;
				opacity: 1;
			}
		}
		${SInfo} {
			transition: all 300ms ease;
			opacity: 0;
		}
	}
`;

// * 버튼 스타일
const SbuttonBox = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 6px 210px 0 0;
`;

const Sbutton = styled.button`
	border: none;
	background-color: transparent;
	cursor: pointer;
	&.hide {
		display: none;
	}
	z-index: 999;
`;

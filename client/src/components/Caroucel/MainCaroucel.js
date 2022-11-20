/* eslint-disable no-undef */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-props-no-spreading */
import Slider from 'react-slick';
import styled from 'styled-components';
import './slick.css';
import './slick-theme.css';
import { useState } from 'react';
import { MdPlayArrow, MdPause } from 'react-icons/md';

function SampleNextArrow(props) {
	const { className, style, onClick } = props;
	return (
		<div
			className={className}
			style={{ ...style, display: 'block', background: 'red' }}
			onClick={onClick}
		/>
	);
}

function SamplePrevArrow(props) {
	const { className, style, onClick } = props;
	return (
		<div
			className={className}
			style={{ ...style, display: 'block', background: 'green' }}
			onClick={onClick}
		/>
	);
}

function SimpleSlider() {
	const [sliderRef, setSliderRef] = useState(null);
	const [isPlaying, setIsPlaying] = useState(true);

	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 2,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 2000,
		pauseOnHover: true,
		// variableWidth: true,
		nextArrow: <SampleNextArrow />,
		prevArrow: <SamplePrevArrow />,
		className: 'center',
		centerMode: true,
		centerPadding: '0px',
	};
	const pauseFn = () => {
		sliderRef.slickPause();
	};
	const playFn = () => {
		sliderRef.slickPlay();
	};

	return (
		<SlideContainer>
			<h2> Single Item</h2>
			<Slider {...settings} ref={setSliderRef}>
				<SlidePage>
					<MultiItem>1</MultiItem>
				</SlidePage>
				<SlidePage>
					<MultiItem>2</MultiItem>
				</SlidePage>
				<SlidePage>
					<MultiItem>3</MultiItem>
				</SlidePage>
				<SlidePage>
					<MultiItem>4</MultiItem>
				</SlidePage>
				<SlidePage>
					<MultiItem>5</MultiItem>
				</SlidePage>
				<SlidePage>
					<MultiItem>6</MultiItem>
				</SlidePage>
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

export default SimpleSlider;

export const MultiItem = styled.div`
	color: #e67e22;
	opacity: 1;
	transform: scale(1.04);
`;

export const SlideContainer = styled.div`
	padding: 0 20px;

	/* width 옵션으로 전체 width 값을 지정할 수 있음 */
	width: 1360px;

	.slick-center ${MultiItem} {
		/* center 모드일때 center에게 강조할 경우 사용 */
		color: #e67e22;
		opacity: 1;
		transition: all 300ms ease;
		transform: scale(1.06);
	}

	${MultiItem} {
		/* center 모드일때 center 외 속성에게 사용 */
		opacity: 0.8;
		transition: all 300ms ease;
		transform: scale(0.5);
	}
`;

export const SlidePage = styled.div`
	background-color: skyblue;

	padding: ${(props) => props.padding};

	${MultiItem} {
		/* center 옵션의 경우 MultiTem 속성을 추가로 사용해서 내부 옵션을 추가로 줘야함 */
		background: #00558b;
		color: #fff;
		font-size: 36px;
		line-height: 100px;
		margin: 10px;
		padding: 2%;
		position: relative;
		text-align: center;
		left: -90%; /* half of the centered slide and padding */
	}
`;

const SbuttonBox = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	/* width: 50%; */
	/* margin-top: 50px; */
	margin: 5px 210px 0 0;
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

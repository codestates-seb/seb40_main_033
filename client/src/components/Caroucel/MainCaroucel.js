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

	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 2,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 1000,
		pauseOnHover: true,
		// centerPadding: '60px',
		nextArrow: <SampleNextArrow />,
		prevArrow: <SamplePrevArrow />,
		className: 'slider variable-width',
	};

	// const pause = () => {
	// 	settings.autoplay = false;
	// };
	// const play = () => {
	// 	settings.autoplay = true;
	// };

	const pauseFn = () => {
		sliderRef.slickPause();
	};
	const playFn = () => {
		sliderRef.slickPlay();
	};

	return (
		<div>
			<h2> Single Item</h2>
			<SSlicder {...settings} ref={setSliderRef}>
				<div>
					<Sdiv />
				</div>
				<div>
					<Sdiv />
				</div>
				<div>
					<Sdiv />
				</div>
				<div>
					<Sdiv />
				</div>
				<div>
					<Sdiv />
				</div>
				<div>
					<Sdiv />
				</div>
			</SSlicder>
			<SbuttonBox>
				<button className="slick-arrow" onClick={() => playFn()}>
					Play
				</button>
				<button className="slick-arrow" onClick={() => pauseFn()}>
					Pause
				</button>
			</SbuttonBox>
		</div>
	);
}

export default SimpleSlider;

const SSlicder = styled(Slider)`
	width: 50%;
	margin-left: 50px;
	.slick-list {
		/* width: 1600px; */
		/* margin: 0 auto; */
	}
	.slick-slide div {
		/* cursor: pointer; */
	}
	.slick-dots {
		/* bottom: -50px;
		margin-top: 200px; */
	}
	.slick-track {
		/* overflow-x: hidden; */
	}
	.slick-arrow {
		z-index: 999;
		border: none;
		background-color: transparent;
	}
`;

const Sdiv = styled.div`
	width: 50px;
	height: 50px;
	background-color: greenyellow;
`;

const SbuttonBox = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 50%;
	margin-top: 50px;
`;

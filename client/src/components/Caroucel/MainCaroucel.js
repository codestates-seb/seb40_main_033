/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-props-no-spreading */
import Slider from 'react-slick';
import styled from 'styled-components';
import './slick.css';
import './slick-theme.css';

function SimpleSlider() {
	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 2,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 3000,
		// centerPadding: '60px',
	};
	return (
		<div>
			<h2> Single Item</h2>
			<SSlicder {...settings}>
				<div>
					<h3>1</h3>
				</div>
				<div>
					<h3>2</h3>
				</div>
				<div>
					<h3>3</h3>
				</div>
				<div>
					<h3>4</h3>
				</div>
				<div>
					<h3>5</h3>
				</div>
				<div>
					<h3>6</h3>
				</div>
			</SSlicder>
		</div>
	);
}

export default SimpleSlider;

const SSlicder = styled(Slider)`
	width: 50%;
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

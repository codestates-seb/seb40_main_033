import React, { useCallback, useEffect, useState, useRef } from 'react';
import styled from 'styled-components';

export default function MultiRangeSlider({ min, max }) {
	const [minVal, setMinVal] = useState(min);
	const [maxVal, setMaxVal] = useState(max);
	const minValRef = useRef(min);
	const maxValRef = useRef(max);
	const range = useRef(null);

	// Convert to percentage
	const getPercent = useCallback(
		(value) => Math.round(((value - min) / (max - min)) * 100),
		[min, max],
	);

	// Set width of the range to decrease from the left side
	useEffect(() => {
		const minPercent = getPercent(minVal);
		const maxPercent = getPercent(maxValRef.current);

		if (range.current) {
			range.current.style.left = `${minPercent}%`;
			range.current.style.width = `${maxPercent - minPercent}%`;
		}
	}, [minVal, getPercent]);

	// Set width of the range to decrease from the right side
	useEffect(() => {
		const minPercent = getPercent(minValRef.current);
		const maxPercent = getPercent(maxVal);

		if (range.current) {
			range.current.style.width = `${maxPercent - minPercent}%`;
		}
	}, [maxVal, getPercent]);

	// Get min and max values when their state changes

	return (
		<SliderContainer>
			<ThumbLeft
				type="range"
				min={min}
				max={max}
				value={minVal}
				step="1000"
				onChange={(event) => {
					const value = Math.min(Number(event.target.value), maxVal - 1000);
					setMinVal(value);
					minValRef.current = value;
				}}
				className="thumb"
				// style={{ zIndex: minVal > max - 100 && '5' }}
			/>
			<ThumbRight
				type="range"
				min={min}
				max={max}
				step="1000"
				value={maxVal}
				onChange={(event) => {
					const value = Math.max(Number(event.target.value), minVal + 1000);
					setMaxVal(value);
					maxValRef.current = value;
				}}
				className="thumb"
			/>

			<Slider>
				<SliderTrack />
				<SliderRange ref={range} />
				<SliderLeftValue>{minVal}원</SliderLeftValue>
				<SliderRightValue>{maxVal}원</SliderRightValue>
			</Slider>
		</SliderContainer>
	);
}

const SliderContainer = styled.div`
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	.thumb {
		pointer-events: none;
		position: absolute;
		height: 0;
		width: 360px;
		outline: none;
	}
`;

const Slider = styled.div`
	position: relative;
	width: 360px;
	div {
		position: absolute;
	}
`;

const SliderTrack = styled.div`
	background-color: var(--gray-300);
	width: 100%;
	z-index: 1;
	height: 2px;
`;
const SliderRange = styled.div`
	background-color: var(--purple-200);
	z-index: 2;
	height: 2px;
`;
const SliderLeftValue = styled.div`
	color: var(--gray-400);
	font-size: 13px;
	margin-top: 20px; //위의 3개는 보여주는 값의 설정입니다. 밑의 RightValue에도 똑같은 설정 있습니다.
`;
const SliderRightValue = styled.div`
	color: var(--gray-400);
	font-size: 13px;
	margin-top: 20px;
`;

const ThumbLeft = styled.input`
	-webkit-appearance: none;
	&::-webkit-slider-thumb {
		-webkit-appearance: none;
		-webkit-tap-highlight-color: transparent;
		background-color: white;
		border: 1px solid #6255f6;
		border-radius: 50%;
		box-shadow: 0 0 1px 1px #ced4da;
		cursor: pointer;
		height: 29px;
		width: 29px;
		margin-top: 4px;
		pointer-events: all;
		position: relative;
	}
	z-index: 3;
`;
const ThumbRight = styled.input`
	-webkit-appearance: none;
	&::-webkit-slider-thumb {
		-webkit-appearance: none;
		-webkit-tap-highlight-color: transparent;
		background-color: white;
		border: 1px solid #6255f6;
		border-radius: 50%;
		box-shadow: 0 0 1px 1px #ced4da;
		cursor: pointer;
		height: 29px;
		width: 29px;
		margin-top: 4px;
		pointer-events: all;
		position: relative;
	}
	z-index: 4;
`;

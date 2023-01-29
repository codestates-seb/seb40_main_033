import React, { useCallback, useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { BsDash } from 'react-icons/bs';
import { LightPurpleButton } from '../PurpleButton';
import { setPrice } from '../../../redux/slice/filterSlice';

export default function PriceButton({ min, max, isOpen }) {
	// 리덕스에 price값이 있으면 기본값으로 설정한다.
	const { price } = useSelector((state) => state.filter);
	const [reduxMin, reduxMax] = price.split('&').map((el) => el.split('=')[1]);
	const [minVal, setMinVal] = useState(reduxMin || min);
	const [maxVal, setMaxVal] = useState(reduxMax || max);
	const minValRef = useRef(min);
	const maxValRef = useRef(max);
	const range = useRef(null);
	const dispatch = useDispatch();

	// 이미 마운트 된 상태에서 리덕스 상태값이 변경되면 최소값과 최대값을 초기화한다.
	useEffect(() => {
		if (!reduxMin) {
			setMinVal(min);
		}
		if (!reduxMax) {
			setMaxVal(max);
		}
	}, [price]);

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

	// const { refetch } = useSelector((store) => store.filter);

	const changePrice = async () => {
		await dispatch(setPrice(`low=${minVal}&high=${maxVal}`));
	};

	return (
		<EntireContainer isOpen={isOpen}>
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
				</Slider>
			</SliderContainer>
			<BottomContainer>
				<ValueBox>
					<ValueDescription>최저 금액</ValueDescription>
					<SliderValue>{minVal.toLocaleString('ko-KR')} 원</SliderValue>
				</ValueBox>
				<IconBox>
					<BsDash />
				</IconBox>
				<ValueBox className="right">
					<ValueDescription>최고 금액</ValueDescription>
					<SliderValue>{maxVal.toLocaleString('ko-KR')} 원</SliderValue>
				</ValueBox>
				<LightPurpleButton
					className="apply"
					fontWeight="bold"
					fontSize="12px"
					width="65px"
					onClick={changePrice}
				>
					적용하기
				</LightPurpleButton>
			</BottomContainer>
		</EntireContainer>
	);
}

const EntireContainer = styled.div`
	display: inline-flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-end;
	margin-right: 60px;
	margin: 16px 60px 4px 8px;
	animation: ${(isOpen) =>
		isOpen
			? 'slide-fade-in-dropdown-animation 0.4s ease'
			: 'slide-fade-out-dropdown-animation 0.4s ease'};
	@keyframes slide-fade-in-dropdown-animation {
		0% {
			transform: translateX(15%);
		}

		100% {
			transform: translateX(0);
		}
	}
`;

const SliderContainer = styled.div`
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

const ThumbLeft = styled.input`
	-webkit-appearance: none;
	&::-webkit-slider-thumb {
		-webkit-appearance: none;
		-webkit-tap-highlight-color: transparent;
		background-color: white;
		border: 1px solid var(--purple-200);
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
		border: 1px solid var(--purple-200);
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

const Slider = styled.div`
	position: relative;
	width: 360px;
`;

const SliderTrack = styled.div`
	background-color: var(--gray-300);
	position: absolute;
	width: 100%;
	z-index: 1;
	height: 2px;
`;

const SliderRange = styled.div`
	background-color: var(--purple-200);
	position: absolute;
	z-index: 2;
	height: 2px;
`;

const BottomContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	margin-top: 34px;
`;

const ValueBox = styled.div`
	display: flex;
	flex-direction: column;
	width: 106px;
	height: 42px;
	border: 0.8px solid var(--gray-300);
	border-radius: 6px;
	padding: 7px;
	&.right {
		margin-right: 20px;
	}
`;
const ValueDescription = styled.div`
	color: var(--gray-300);
	font-size: 9px;
	margin-bottom: 6px;
`;

const SliderValue = styled.div`
	color: var(--gray-400);
	font-size: 13px;
`;

const IconBox = styled.div`
	margin: 0px 23px;
	& > svg {
		path {
			color: var(--gray-300);
		}
	}
`;

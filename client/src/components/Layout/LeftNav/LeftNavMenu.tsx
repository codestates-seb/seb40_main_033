import { useCallback, useState } from 'react';
import { AiOutlineThunderbolt, AiOutlinePlusCircle } from 'react-icons/ai';
import { BiBone } from 'react-icons/bi';
import { GrPowerCycle } from 'react-icons/gr';
import { HiOutlineEye } from 'react-icons/hi';
import { RiHeartAddLine } from 'react-icons/ri';
import styled, { keyframes } from 'styled-components';
import { Intestine, Liver, Brain, Skin } from '../../../assets/Icons';

export default function LeftNavMenu({ el, i }: { el: string; i: number }) {
	const [hoverTarget, setHoverTarget] = useState('');

	const icons = [
		<HiOutlineEye key="1-icons" />,
		<BiBone key="2-icons" />,
		<Intestine key="3-icons" />,
		<Liver key="4-icons" />,
		<Brain key="5-icons" />,
		<Skin key="6-icons" />,
		<GrPowerCycle className="small bold-stroke" key="7-icons" />,
		<AiOutlineThunderbolt key="8-icons" className="bolt" />,
		<RiHeartAddLine className="heart-add" key="9-icons" />,
		<AiOutlinePlusCircle className="small bold-stroke" key="10-icons" />,
	];

	const handleHover: React.MouseEventHandler<HTMLLIElement> = useCallback(
		(e) => {
			const { innerText } = e.target as HTMLLIElement;
			setHoverTarget(innerText);
		},
		[],
	);
	const handleLeave: React.MouseEventHandler<HTMLLIElement> =
		useCallback(() => {
			setHoverTarget('');
		}, []);

	return (
		<ListContainer onMouseEnter={handleHover} onMouseLeave={handleLeave}>
			{hoverTarget === el && icons[i]}
			<Category>{el}</Category>
		</ListContainer>
	);
}
export const showIcon = keyframes`
	0% {
		opacity: 0%;
		left: -20px;
	}
	100% {
	opacity: 100%;
	left: 0;
	}
`;

export const turn = keyframes`
	0% {
		opacity: 0;
		-webkit-transform: translateY(6.5px) rotate(-360deg);
		transform: translateY(6.5px) rotate(-360deg);
	}
	100% {
		opacity: 50%;
	}
`;

const listHover = keyframes`
	0% {
		opacity: 0;
		top: -10px;
		pointer-events: none;
	}
	100% {
		top: 0;
		opacity: 100%;
		pointer-events: none;
	}
`;

const ListContainer = styled.li`
	display: flex;
	align-items: center;
	-webkit-user-select: none;
	user-select: none;
	cursor: pointer;
	position: relative;
	animation: ${listHover} 0.3s ease-in-out;

	:hover {
		animation: ${showIcon} 0.2s ease-in-out 1s;
		* {
			color: var(--green-100);
			stroke: var(--green-100);
		}
	}

	& > svg {
		margin: 10px 5px 10px 0;
		font-size: 27px;
		animation: ${turn} 0.3s ease-in-out;
		pointer-events: none;
	}

	.small {
		font-size: 23px;
	}

	.bold-stroke {
		stroke-width: 15;
	}

	.bolt {
		font-size: 26px;
		stroke-width: 10;
	}

	.heart-add {
		font-size: 24px;
	}
`;

const Category = styled.div`
	color: var(--purple-200);
	margin: 20px 0;
	font-weight: var(--extraBold);
	font-size: 13.6px;
	white-space: nowrap;
`;

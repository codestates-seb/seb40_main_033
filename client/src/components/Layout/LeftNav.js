import styled, { keyframes } from 'styled-components';
import { HiOutlineEye } from 'react-icons/hi';
import { useCallback, useState } from 'react';
import { BiBone } from 'react-icons/bi';
import { GrPowerCycle } from 'react-icons/gr';
import { RiHeartAddLine } from 'react-icons/ri';
import { AiOutlinePlusCircle, AiOutlineThunderbolt } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import {
	Skin,
	Brain,
	Intestine,
	TempLogo,
	Liver,
	Logo,
} from '../../assets/Icons';

function LeftNav() {
	const [openCategories, setOpenCategories] = useState(false);
	const [hoverTarget, setHoverTarget] = useState('');
	const categories = [
		'눈 건강',
		'관절/뼈 건강',
		'장 건강',
		'간 건강',
		'뇌 건강',
		'피부',
		'항산화',
		'피로',
		'혈행개선',
		'기타',
	];

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

	const handleCategoriesOpen = useCallback(() => {
		setOpenCategories(!openCategories);
	}, [openCategories]);

	// 호버 시 아이콘이 나오도록
	const handleBtnHover = useCallback((e) => {
		setHoverTarget(e.target.innerText);
	}, []);

	// 마우스가 카테고리를 떠났을 때 hoverTarget 초기화
	const handleBtnLeave = useCallback(() => {
		setHoverTarget('');
	}, []);

	// TempLogo는 로고 자리 확인용 임시 아이콘
	return (
		<Container>
			<Nav>
				<Link to="/">
					<Logo />
				</Link>
				<Hamburger onClick={handleCategoriesOpen}>
					<div className={openCategories ? 'bar1' : null} />
					<div className={openCategories ? 'bar2' : null} />
					<div className={openCategories ? 'bar3' : null} />
				</Hamburger>
				{openCategories && (
					<CategoryContainer>
						{categories.map((el, i) => (
							<Link
								to={`/list?categoryName=${categories[i]
									.replaceAll(' ', '_')
									.replaceAll('/', '_')}`}
								key={`${i.toString()}-${el}`}
							>
								<ListContainer
									onMouseEnter={handleBtnHover}
									onMouseLeave={handleBtnLeave}
								>
									{hoverTarget === el && icons[i]}
									<Category>{el}</Category>
								</ListContainer>
							</Link>
						))}
					</CategoryContainer>
				)}
			</Nav>
		</Container>
	);
}

const Container = styled.div`
	position: relative;
`;

const Nav = styled.nav`
	position: sticky;
	top: 45px;
	margin: 45px 0 0 40px;
	display: flex;
	flex-direction: column;
	width: 100px;
`;

const openList = keyframes`
	0% {
		opacity: 0;
		top: -20px;
	}
	100% {
		top: 0;
		opacity: 100%;
	}
`;

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

export const listHover = keyframes`
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

const CategoryContainer = styled.ul`
	display: flex;
	flex-direction: column;
	position: relative;
	animation: ${openList} 0.3s ease-in-out;
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

const Hamburger = styled.div`
	margin: 45px 0 20px 0;
	cursor: pointer;

	div {
		width: 18px;
		height: 3px;
		margin: 3.5px 0;
		background-color: var(--purple-200);
		border-radius: 4px;
		cursor: pointer;
		transition: 0.5s;
	}

	.bar1 {
		-webkit-transform: translateY(6.5px) rotate(-315deg);
		transform: translateY(6.5px) rotate(-315deg);
	}

	.bar2 {
		opacity: 0;
	}

	.bar3 {
		-webkit-transform: translateY(-6.5px) rotate(315deg);
		transform: translateY(-6.5px) rotate(315deg);
	}
`;

export default LeftNav;

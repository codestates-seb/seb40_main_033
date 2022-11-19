import styled from 'styled-components';
import { FaBars } from 'react-icons/fa';
import { HiOutlineEye } from 'react-icons/hi';
import { useState } from 'react';
import { BiBone } from 'react-icons/bi';
import { GrPowerCycle } from 'react-icons/gr';
import { RiHeartAddLine } from 'react-icons/ri';
import { AiOutlinePlusCircle, AiOutlineThunderbolt } from 'react-icons/ai';
import { Skin, Brain, Intestine, TempLogo, Liver } from '../assets/Icons';

function LeftNav() {
	const [isClicked, setIsClicked] = useState(false);
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
		<GrPowerCycle className="small stroke bold-stroke" key="7-icons" />,
		<AiOutlineThunderbolt key="8-icons" className="bolt" />,
		<RiHeartAddLine className="heart-add" key="9-icons" />,
		<AiOutlinePlusCircle className="small bold-stroke" key="10-icons" />,
	];

	const handleBtnClick = () => {
		setIsClicked(!isClicked);
	};

	const handleBtnHover = (e) => {
		setHoverTarget(e.target.innerText);
	};

	// TempLogo는 로고 자리 확인용 임시 아이콘
	return (
		<Nav>
			<TempLogo />
			<FaBars className="bars" onClick={handleBtnClick} />
			{isClicked ? (
				<CategoryContainer>
					{categories.map((el, i) => (
						<ListContainer
							key={`${i.toString()}-${el}`}
							onMouseEnter={handleBtnHover}
							onMouseLeave={() => setHoverTarget('')}
						>
							{hoverTarget === el ? icons[i] : null}
							<Category>{el}</Category>
						</ListContainer>
					))}
				</CategoryContainer>
			) : null}
		</Nav>
	);
}

const Nav = styled.nav`
	display: flex;
	flex-direction: column;
	margin-top: 45px;
	margin-left: 40px;

	.bars {
		font-size: 22px;
		margin: 30px 0;
		path {
			color: var(--purple-200);
		}
	}
`;

const CategoryContainer = styled.ul`
	display: flex;
	flex-direction: column;
`;

const ListContainer = styled.li`
	display: flex;
	align-items: center;
	-webkit-user-select: none; // 글씨 드래그 방지
	user-select: none;
	cursor: pointer;

	& > svg {
		margin: 10px 5px 10px 0;
		font-size: 27px;
		path {
			color: var(--purple-200);
		}
	}

	.stroke {
		path {
			stroke: var(--purple-200);
			stroke-width: 2.2;
		}
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
`;

export default LeftNav;

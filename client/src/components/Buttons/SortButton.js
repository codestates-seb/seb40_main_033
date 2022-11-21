import { useState } from 'react';
import styled from 'styled-components';
import { IoIosArrowBack } from 'react-icons/io';
import { BsToggles } from 'react-icons/bs';

function SortButton({ children }) {
	const [isOpen, setIsOpen] = useState(false);
	const handleOpenClick = () => {
		setIsOpen(!isOpen);
		console.log(isOpen);
	};

	return (
		<ButtonContainer>
			<OpenButton onClick={handleOpenClick}>
				<IoIosArrowBack />
			</OpenButton>
			<NameBox>
				{children}
				<BsToggles />
			</NameBox>
		</ButtonContainer>
	);
}

const ButtonContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 158px; // 이 부분은 이후 상태로 관리하여, 버튼을 누르면 바뀌게끔 해야 합니다.
	height: 54px;
	box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.07);
	background-color: white;
	border-radius: 27px;
	border: none;
	color: var(--purple-200);
	padding: 13px 20px 13px 13px;
	cursor: pointer;
`;

const OpenButton = styled.button`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	width: 29px;
	height: 29px;
	background-color: white;
	border: 1px solid #f1f0fe;
	border-radius: 50px;
	cursor: pointer;
	& > svg {
		path {
			color: var(--purple-200);
		}
	}
`;
const NameBox = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	width: 72px;
	font-weight: var(--bold);
	& > svg {
		path {
			color: var(--purple-200);
		}
	}
`;
export default SortButton;

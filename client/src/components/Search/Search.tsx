import styled, { css, keyframes } from 'styled-components';
import { useCallback, useState, useRef, useEffect } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

interface SearchProps {
	rightNav: boolean;
}

type SearchEvent =
	| React.MouseEvent<HTMLButtonElement, MouseEvent>
	| React.KeyboardEvent<HTMLInputElement>;

function Search({ rightNav }: SearchProps) {
	const [isActive, setIsActive] = useState(false);
	const [searchWord, setSearchWord] = useState('');
	const navigate = useNavigate();
	const searchRef = useRef<HTMLInputElement>(null);

	// enter 입력 시, 해당 키워드 페이지로 이동하는 함수 실행
	const handleSearch: React.KeyboardEventHandler<HTMLInputElement> =
		useCallback(
			(e) => {
				const { value } = e.target as HTMLInputElement;
				setSearchWord(value);

				if (isActive && (e as React.KeyboardEvent).key === 'Enter') {
					handleIconClick(e);
				}
			},
			[searchWord],
		);

	const handleInputClick: React.MouseEventHandler<HTMLInputElement> =
		useCallback(() => {
			setIsActive(true);
		}, [isActive]);

	const handleIconClick = useCallback(
		(e: SearchEvent) => {
			if (rightNav && e.type === 'click') {
				setIsActive(!isActive);
			} else if (searchWord.replaceAll(' ', '') === '') {
				toast.warn('검색어를 입력해주세요.');
			} else {
				navigate(`/search?keyword=${searchWord.replaceAll(' ', '_')}`);
				setIsActive(false);
			}
		},
		[isActive, searchWord],
	);

	const handleClickOutside = (e: MouseEvent) => {
		if (
			searchRef.current &&
			!searchRef.current.contains(e.target as HTMLElement)
		) {
			setIsActive(false);
		}
	};

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return (
		<Box ref={searchRef} isActive={isActive}>
			{!(rightNav && !isActive) && (
				<Input
					autoFocus
					placeholder={
						rightNav
							? '검색어 입력 후 엔터를 눌러주세요.'
							: '검색어를 입력하세요'
					}
					onKeyUp={handleSearch}
					onClick={handleInputClick}
					isActive={isActive}
					rightNav={rightNav}
				/>
			)}
			<Icon onClick={handleIconClick} isActive={isActive}>
				<AiOutlineSearch />
			</Icon>
		</Box>
	);
}

const Box = styled.div<{ isActive: boolean }>`
	width: 284px;
	height: 40px;
	display: flex;
	justify-content: flex-end;
	align-items: center;
	position: relative;
`;

const showSearchBar = keyframes`
	from{
		opacity: 0;
		width: 10px;
	}
	to{
		width: 284px;
	}
`;

const Input = styled.input<{ rightNav: boolean; isActive: boolean }>`
	border: 1px solid var(--purple-200);
	background-color: white;
	border-radius: 50px;
	position: absolute;
	width: 284px;
	height: 40px;
	font-size: 14px;
	text-indent: 24px;

	animation: ${({ rightNav }) =>
		rightNav &&
		css`
			${showSearchBar} 0.25s ease-in-out
		`};

	${({ isActive }) =>
		isActive &&
		css`
			border: 1px solid var(--green-100);
		`}

	:focus {
		outline: none;
	}

	::placeholder {
		font-size: 13px;
		color: var(--gray-300);
	}
`;

const Icon = styled.button<{ isActive: boolean }>`
	display: flex;
	align-items: flex-end;
	all: unset;

	svg {
		cursor: pointer;
		margin: 16px 0;
		position: relative;
		font-size: 24px;
		top: 2px;

		path {
			color: ${({ isActive }) =>
				isActive ? 'var(--green-100)' : 'var(--purple-200)'};
			stroke-width: 10;
		}
	}
`;

export default Search;

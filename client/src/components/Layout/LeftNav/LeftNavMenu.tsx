import { useCallback, useState } from 'react';
import LeftNavIcons from './LeftNavIcons';
import { ListContainer, Category } from './style';

export default function LeftNavMenu({ el, i }: { el: string; i: number }) {
	const [hoverTarget, setHoverTarget] = useState('');

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
			{hoverTarget === el && <LeftNavIcons i={i} />}
			<Category>{el}</Category>
		</ListContainer>
	);
}

import { Link } from 'react-router-dom';
import { CATEGORIES } from '../../../assets/Constants';
import LeftNavMenu from './LeftNavMenu';
import { CategoryContainer } from './style';

export default function MenuCategory() {
	return (
		<CategoryContainer>
			{CATEGORIES.map((el, i) => (
				<Link
					to={`/list?categoryName=${CATEGORIES[i]
						.replaceAll(' ', '_')
						.replaceAll('/', '_')}`}
					key={`${i.toString()}-${el}`}
				>
					<LeftNavMenu el={el} i={i} />
				</Link>
			))}
		</CategoryContainer>
	);
}

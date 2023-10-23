import { AiOutlineThunderbolt, AiOutlinePlusCircle } from 'react-icons/ai';
import { BiBone } from 'react-icons/bi';
import { GrPowerCycle } from 'react-icons/gr';
import { HiOutlineEye } from 'react-icons/hi';
import { RiHeartAddLine } from 'react-icons/ri';
import { Intestine, Liver, Brain, Skin } from '../../../assets/Icons';

export default function LeftNavIcons({ i }: { i: number }) {
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
	return icons[i];
}

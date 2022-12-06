/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import Slider from 'react-slick';
import styled from 'styled-components';
import './slick.css';
import './slick-theme.css';
import { useState } from 'react';
import { MdPlayArrow, MdPause } from 'react-icons/md';
import { IoIosArrowBack } from 'react-icons/io';
import CaroucelInfo from './Caroucel-Info';

const Info = [
	{
		type: 'EVENT',
		title: ['내 몸 구석구석 건강 관리', '하루가 더 가뿐해져요'],
		description: ['멀티비타민 할인전 이벤트', 'NOW ON SALE'],
		color: '#FE9701',
		link: '/detail/104',
		image:
			'https://cdn.discordapp.com/attachments/997446041811046432/1046621249238999140/pills.png',
	},
	{
		type: 'EVENT',
		title: ['Farm&Top과 함께', '우리가족 뼈 건강을', ' 지켜보세요!'],
		description: ['칼슘/마그네슘 할인전 이벤트', 'NOW ON SALE'],
		color: '#FDB9AA',
		link: '/detail/8',
		image:
			'https://farmntop.co.kr/web/product/big/202103/108ece6305937729911b08de5eb3e9d1.jpg',
	},
	{
		type: 'RECOMMEND',
		title: ['비타민과 미네랄', '구미젤리로 맛있게!'],
		description: ['세계판매 1위', '센트룸이 출시한 멀티비타민'],
		color: '#158118',
		link: '/detail/81',
		image:
			'https://www.gskshop.co.kr/shopimages/pcheshop/009000000070.jpg?1669795179',
	},
	{
		type: 'RECOMMEND',
		title: ['활발한 에너지 생성을', '원하신다면 솔가와 함께'],
		description: ['코셔 파브르 인증마크', '비오틴 1000mcg 함유'],
		color: '#D38E5A',
		link: '/detail/60',
		image:
			'https://shop-phinf.pstatic.net/20220923_241/1663896174866tUw7n_JPEG/65031954581413851_289985287.jpg?type=o1000',
	},
	{
		type: 'RECOMMEND',
		title: ['침묵의 장기 "간"', '평소 관리가 핵심입니다!'],
		description: ['GMP 인증, 건강 기능식품', '지금 바로 만나보세요'],
		color: '#40405A',
		link: '/detail/5',
		image:
			'http://farmntop.co.kr/web/product/big/202210/8589a3eae793977001d1bd0a6e164d98.jpg',
	},

	{
		type: 'EVENT',
		title: ['높은순도에', '체내흡수가 용이한', '알티지 오메가3'],
		description: ['국제기관이 인증하는', '고품질 원료생산', 'NOW ON SALE'],
		color: '#985EC1',
		link: '/detail/4',
		image:
			'http://farmntop.co.kr/web/product/big/202201/41df2b6b6ca81a977a0e976bfe31239b.jpg',
	},
];

const ArrowButton = styled.button`
	width: 40px;
	height: 40px;
	background-color: black;
	border-radius: 50px;
	transition: 0.25s ease;
	& > svg {
		path {
			color: white;
		}
		width: 20px;
		height: 20px;
		position: absolute;
		top: 25%;
		left: 23%;
		${({ right }) =>
			// 180도 회전
			right &&
			`
			transform: rotate(180deg);
			left: 28%;
		`}
	}
`;

const settings = {
	dots: true,
	infinite: true,
	speed: 500,
	slidesToShow: 2,
	slidesToScroll: 1,
	autoplay: true,
	autoplaySpeed: 5000,
	pauseOnHover: true,
	nextArrow: (
		<ArrowButton right>
			<IoIosArrowBack />
		</ArrowButton>
	),
	prevArrow: (
		<ArrowButton left>
			<IoIosArrowBack />
		</ArrowButton>
	),
	className: 'center',
	centerMode: true,
	centerPadding: '0px',
};

function MainCaroucel() {
	const [sliderRef, setSliderRef] = useState(null);
	const [isPlaying, setIsPlaying] = useState(true);

	const pauseFn = () => {
		sliderRef.slickPause();
	};
	const playFn = () => {
		sliderRef.slickPlay();
	};

	return (
		<SlideContainer>
			<Slider {...settings} ref={setSliderRef}>
				{Info.map((el, i) => (
					<SlidePage key={`${i.toString()}-${el}`}>
						<MultiItem>
							<SInfo>
								<CaroucelInfo
									type={el.type}
									title={el.title}
									description={el.description}
									color={el.color}
									link={el.link}
								/>
							</SInfo>
							<SImg src={el.image} />
						</MultiItem>
					</SlidePage>
				))}
			</Slider>
			<SbuttonBox>
				<Sbutton
					className={isPlaying ? 'hide' : ''}
					onClick={() => {
						playFn();
						setIsPlaying(true);
					}}
				>
					<MdPlayArrow />
				</Sbutton>
				<Sbutton
					className={!isPlaying ? 'hide' : ''}
					onClick={() => {
						pauseFn();
						setIsPlaying(false);
					}}
				>
					<MdPause />
				</Sbutton>
			</SbuttonBox>
		</SlideContainer>
	);
}

export default MainCaroucel;

// * 캐러셀 스타일
export const MultiItem = styled.div`
	opacity: 1;
	display: flex;
`;

export const SImg = styled.img`
	width: 55%;
	border-radius: 50%;
`;

const SInfo = styled.div`
	width: 45%;
	padding-left: 180px;
`;

export const SlideContainer = styled.div`
	/* width 옵션으로 전체 width 값을 지정할 수 있음 */
	width: 1090px;

	.slick-center ${MultiItem} {
		/* center 모드일때 center에게 강조할 경우 사용 */
		opacity: 1;
		transition: all 300ms ease;
		transform: scale(1);
		top: 0px;
	}

	${MultiItem} {
		/* center 모드일때 center 외 속성에게 사용 */
		transition: all 300ms ease;
		transform: scale(0.4);
		top: 155px;
	}
`;

export const SlidePage = styled.div`
	${MultiItem} {
		/* center 옵션의 경우 MultiTem 속성을 추가로 사용해서 내부 옵션을 추가로 줘야함 */
		margin: 10px;
		padding: 2%;
		position: relative;
		width: 950px;
		/* 센터아이템 왼쪽에 보여주기 */
		left: -130%;
		.slick-center & {
			/* left: -108%; */
			${SInfo} {
				color: var(--gray-500);
				transition: all 300ms ease;
				opacity: 1;
			}
		}
		${SInfo} {
			transition: all 300ms ease;
			opacity: 0;
		}
	}
`;

// * 버튼 스타일
const SbuttonBox = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 6px 210px 0 0;
`;

const Sbutton = styled.button`
	border: none;
	background-color: transparent;
	cursor: pointer;
	&.hide {
		display: none;
	}
	z-index: 999;
`;

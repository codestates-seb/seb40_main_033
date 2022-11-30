import styled from 'styled-components';
import dayjs from 'dayjs';

// YYYY.MM.DD
export function DotDate({ date }) {
	const tempDate = dayjs(date); // date를 dayjs 형식으로 변환
	const formattedDate = tempDate.format('YYYY.MM.DD'); // 날짜 포맷 통일
	return <Date>{formattedDate}</Date>;
}

// MM월 DD일
export function KrDate({ date }) {
	const tempDate = dayjs(date); // date를 dayjs 형식으로 변환
	const formattedDate = tempDate.format('MM월 DD일'); // 날짜 포맷 통일
	return <Date className="kr-date">{formattedDate}</Date>;
}

const Date = styled.time`
	color: var(--gray-300);

	&.kr-date {
		color: var(--gray-400);
	}
`;

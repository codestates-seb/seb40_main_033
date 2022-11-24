import styled from 'styled-components';
import dayjs from 'dayjs';

function ListDate({ date }) {
	const tempDate = dayjs(date); // 데이터로 받은 date를 dayjs 형식으로 변환 (|| 뒤는 임시데이터)
	const formattedDate = tempDate.format('YYYY.MM.DD'); // 날짜 포맷 통일
	return <Date>{formattedDate}</Date>;
}

const Date = styled.time`
	color: var(--gray-300);
`;

export default ListDate;

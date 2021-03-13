import styles from "./Calendar.module.scss";

import moment from "moment";
import { weekdays, monthsFull } from "./constants/dates";
import {
	getDayOfMonth,
	getMonth,
	getYear,
	getMonthDayYear,
} from "./utils/moment-utils";
import { getDatesInMonthDisplay, getMonthSet } from "./utils/date-utils";

import Button from "components/Button/Button";
import useTranslation from "next-translate/useTranslation";

const Calendar = ({ onChange, value, markedDates }) => {
	const handleDateChange = (date) => {
		onChange({ target: { value: date.toString() } });
	};

	return (
		<div className={styles.calendar}>
			<MonthPicker
				selectDate={value || moment().format("YYYY-MM-DD")}
				setSelectDate={handleDateChange}
			/>
			<WeekDays />
			<DatePicker
				selectDate={value || moment().format("YYYY-MM-DD")}
				markedDates={markedDates}
			/>
		</div>
	);
};

const WeekDays = () => {
	const { t } = useTranslation();
	return (
		<header className={styles.header}>
			{weekdays.map((weekday) => (
				<div key={weekday} className={`${styles.date} smcp`}>
					{t(`common:semana.${weekday}`)}
				</div>
			))}
		</header>
	);
};

const DatePicker = ({ selectDate, markedDates }) => {
	const datesInMonth = getDatesInMonthDisplay(
		getMonth(selectDate) + 1,
		getYear(selectDate)
	);

	return (
		<div className={styles.body}>
			{datesInMonth.map((i, key) => (
				<div
					className={`${styles.date} ${
						markedDates.includes(i.date) ? styles.marked : ""
					}`}
					data-active-month={i.currentMonth}
					data-date={i.date.toString()}
					key={key}
				>
					<span>{getDayOfMonth(i.date)}</span>
				</div>
			))}
		</div>
	);
};

const MonthPicker = ({ selectDate, setSelectDate }) => {
	const { t } = useTranslation();
	const changeMonth = (date) => {
		setSelectDate(date);
	};
	const monthSet = getMonthSet(selectDate);
	return (
		<div className={styles.footer}>
			<Button type="ghost" onClick={() => changeMonth(monthSet.prev)}>
				{t(`common:mes.${getMonth(monthSet.prev) + 1}`)}
			</Button>
			<h3 className={`${styles.month} h-2`}>
				<div className={`${styles.year} h-3`}>{getYear(selectDate)}</div>
				{t(`common:mes.${getMonth(monthSet.current) + 1}`)}{" "}
			</h3>
			<Button type="ghost" onClick={() => changeMonth(monthSet.next)}>
				{t(`common:mes.${getMonth(monthSet.next) + 1}`)}
			</Button>
		</div>
	);
};

export default Calendar;

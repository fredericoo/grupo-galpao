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

import { useState, useEffect } from "react";
import useColourEffect from "../../utils/hooks/useColourEffect";

import Button from "components/Button/Button";
import Grid from "components/Grid/Grid";

import useTranslation from "next-translate/useTranslation";
import { RichText } from "prismic-reactjs";
import Link from "next/link";
// import useSWR from "swr";
// import { fetchAllOfType } from "utils/fetcher";

const Calendar = () => {
	const { t } = useTranslation();

	const [isInViewport, targetRef] = useColourEffect({
		bg: "#2e4d83",
		fg: "#cc9d82",
	});

	const data = false;
	// const { data, error } = useSWR("filme", fetchAllOfType);

	const [markedDates, setMarkedDates] = useState([]);
	const [selectDate, setSelectDate] = useState(moment().toDate());

	// useEffect(() => {
	// 	data &&
	// 		setMarkedDates(
	// 			data
	// 				.map((filme) =>
	// 					filme.data.exibicoes.map((exibicao) =>
	// 						getMonthDayYear(moment(exibicao.datetime))
	// 					)
	// 				)
	// 				.flat()
	// 		);
	// }, [data]);

	const handleDateChange = (date) => {
		setSelectDate(date);
	};

	return (
		<section ref={targetRef} className={styles.section}>
			<Grid className="py-5">
				<Grid.Col md="col-4 / col-10" className="ta-center">
					<h2 className="h-2">{t("common:agenda")}</h2>
				</Grid.Col>
				<Grid.Col md="col-4 / col-10" className={styles.calendar}>
					<CalendarFooter
						selectDate={selectDate}
						setSelectDate={setSelectDate}
					/>
					<CalendarHeader />
					<CalendarBody
						selectDate={selectDate}
						setSelectDate={handleDateChange}
						markedDates={markedDates}
					/>
				</Grid.Col>
			</Grid>
			{/* {!error && <CalendarAirings selectDate={selectDate} filmes={data} />} */}
		</section>
	);
};

const CalendarAirings = ({ selectDate, filmes }) => {
	const { t } = useTranslation();
	if (!filmes)
		return (
			<div className={styles.airings}>
				<div className={styles.scroll}>
					<header className={`${styles.header} h-3`}>
						{`${t("common:exibicoesEm")} ${moment(selectDate).format("D/MM")}`}
					</header>
					<div className={`${styles.notFound} s-sm`}>
						{t("common:carregando")}
					</div>
				</div>
			</div>
		);

	const eventsToday = filmes
		.map((filme) =>
			filme.data.exibicoes.map((exibicao) => {
				return {
					film: filme,
					fullDate: moment(exibicao.datetime),
					local: exibicao.local,
					date: getMonthDayYear(moment(exibicao.datetime)),
				};
			})
		)
		.flat()
		.filter((event) => event.date === getMonthDayYear(moment(selectDate)));

	return (
		<div className={styles.airings}>
			<div className={styles.scroll}>
				<header className={`${styles.header} h-3`}>
					{`${t("common:exibicoesEm")} ${moment(selectDate).format("D/MM")}`}
				</header>
				{!!eventsToday.length ? (
					eventsToday.map((event) => (
						<div className={styles.event}>
							<Link href={`/filme/${event.film.uid}`}>
								<a>
									<h3 className={`${styles.filmName} h-4`}>
										{RichText.asText(event.film.data.titulo)}
									</h3>
								</a>
							</Link>
							<div className={`${styles.dateTime} smcp`}>
								{event.fullDate.format("D/MM, hh:mm")} —{" "}
								{RichText.asText(event.local)}
							</div>
							<div className={`s-sm ${styles.synopsis}`}>
								<RichText render={event.film.data.sinopse} />
							</div>
						</div>
					))
				) : (
					<div className={`${styles.notFound} s-sm`}>
						{t("common:nenhumaExibicao")}
					</div>
				)}
			</div>
		</div>
	);
};

const CalendarHeader = () => {
	return (
		<header className={styles.header}>
			{weekdays.map((weekday) => (
				<div key={weekday} className={`${styles.date} smcp`}>
					{weekday}
				</div>
			))}
		</header>
	);
};

const CalendarBody = ({ selectDate, setSelectDate, markedDates }) => {
	const datesInMonth = getDatesInMonthDisplay(
		getMonth(selectDate) + 1,
		getYear(selectDate)
	);

	const changeDate = (e) => {
		setSelectDate(e.target.getAttribute("data-date"));
	};

	return (
		<div className={styles.body}>
			{datesInMonth.map((i, key) => (
				<button
					type="button"
					className={`${styles.date} ${
						i.date.toString() === selectDate ? styles.active : ""
					} ${
						markedDates.includes(getMonthDayYear(i.date)) ? styles.marked : ""
					}`}
					data-active-month={i.currentMonth}
					data-date={i.date.toString()}
					key={key}
					onClick={changeDate}
				>
					{getDayOfMonth(i.date)}
				</button>
			))}
		</div>
	);
};

const CalendarFooter = ({ selectDate, setSelectDate }) => {
	const changeMonth = (date) => {
		setSelectDate(date);
	};
	const monthSet = getMonthSet(selectDate);
	return (
		<div className={styles.footer}>
			<Button type="ghost" onClick={() => changeMonth(monthSet.prev)}>
				{monthsFull[getMonth(monthSet.prev)]}
			</Button>
			<h3 className={`${styles.month}`}>
				{monthsFull[getMonth(monthSet.current)]} {getYear(selectDate)}
			</h3>
			<Button type="ghost" onClick={() => changeMonth(monthSet.next)}>
				{monthsFull[getMonth(monthSet.next)]}
			</Button>
		</div>
	);
};

export default Calendar;

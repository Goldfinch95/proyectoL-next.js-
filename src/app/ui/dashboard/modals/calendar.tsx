"use client";
import { useState, useEffect } from "react";
import styles from "./calendar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

interface CalendarDay {
  date: number;
  month: number;
  year: number;
  inactive: boolean;
}

export default function Calendar() {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedDays, setSelectedDays] = useState<CalendarDay[]>([]);
  const [rangeStart, setRangeStart] = useState<CalendarDay | null>(null);

  const monthNames = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  const weekDays = ["L", "M", "X", "J", "V", "S", "D"];

  const generateCalendar = (year: number, month: number) => {
    const days: CalendarDay[][] = [];
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    const startDate = new Date(firstDayOfMonth);
    const dayOfWeek = startDate.getDay();
    const diff = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    startDate.setDate(startDate.getDate() - diff);

    while (true) {
      const week: CalendarDay[] = [];
      let hasActiveDays = false;

      for (let i = 0; i < 7; i++) {
        const currentDate = new Date(startDate);
        const isInactive = currentDate.getMonth() !== month;

        week.push({
          date: currentDate.getDate(),
          month: currentDate.getMonth(),
          year: currentDate.getFullYear(),
          inactive: isInactive,
        });

        if (!isInactive) hasActiveDays = true;
        startDate.setDate(startDate.getDate() + 1);
      }

      if (hasActiveDays) days.push(week);
      else break;
      if (startDate > lastDayOfMonth) break;
    }

    return days;
  };

  const getDaysInRange = (start: CalendarDay, end: CalendarDay) => {
    const days: CalendarDay[] = [];
    const startDate = new Date(start.year, start.month, start.date);
    const endDate = new Date(end.year, end.month, end.date);

    const currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      days.push({
        date: currentDate.getDate(),
        month: currentDate.getMonth(),
        year: currentDate.getFullYear(),
        inactive: currentDate.getMonth() !== selectedMonth,
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return days;
  };

  const toggleDaySelection = (day: CalendarDay) => {
    if (day.inactive) return;

    if (!rangeStart) {
      setRangeStart(day);
      setSelectedDays([day]);
    } else {
      let startDate = new Date(rangeStart.year, rangeStart.month, rangeStart.date);
      let endDate = new Date(day.year, day.month, day.date);
      
      if (startDate > endDate) {
        const temp = startDate;
      startDate = endDate;
      endDate = temp;
      }

      const daysInRange = getDaysInRange(
        { 
          date: startDate.getDate(), 
          month: startDate.getMonth(), 
          year: startDate.getFullYear(), 
          inactive: false 
        },{ 
          date: endDate.getDate(), 
          month: endDate.getMonth(), 
          year: endDate.getFullYear(), 
          inactive: false 
        }
      );

      setSelectedDays(daysInRange);
    setRangeStart(null);
    }
  };

  const calendarDays = generateCalendar(selectedYear, selectedMonth);

  const prevYear = () => setSelectedYear((prev) => prev - 1);
  const nextYear = () => setSelectedYear((prev) => prev + 1);
  const prevMonth = () => setSelectedMonth((prev) => (prev === 0 ? 11 : prev - 1));
  const nextMonth = () => setSelectedMonth((prev) => (prev === 11 ? 0 : prev + 1));

  useEffect(() => {
    //console.log("Días seleccionados:", JSON.stringify(selectedDays, null, 2));
  }, [selectedDays]);

  return (
    <div>
      <div
        className="modal fade"
        id="modalCalendario"
        tabIndex={-1}
        aria-labelledby="calendarModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className={`modal-header ${styles["font-title"]}`}>
              <h5 className="modal-title">
                <div className="d-flex flex-column w-100">
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="font-title">{monthNames[selectedMonth]}</h5>
                    <div className="d-flex align-items-center gap-2">
                      <button className="btn" onClick={prevYear}>
                        <FontAwesomeIcon icon={faChevronLeft} />
                      </button>
                      <h3 className="m-0">{selectedYear}</h3>
                      <button className="btn" onClick={nextYear}>
                        <FontAwesomeIcon icon={faChevronRight} />
                      </button>
                    </div>
                  </div>
                </div>
              </h5>
            </div>
            <div className="modal-body">
              <div className="container">
                <div className="row align-items-center">
                  <div className="col-1 text-center d-flex justify-content-center">
                    <button
                      className="btn border-0 btn-outline-secondary"
                      onClick={prevMonth}
                    >
                      <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
                  </div>

                  <div className="col-10">
                    <div className="row mb-2 justify-content-center">
                      {weekDays.map((day, i) => (
                        <div
                          key={i}
                          className="col-1 font d-flex justify-content-center"
                        >
                          {day}
                        </div>
                      ))}
                    </div>

                    {calendarDays.map((week, i) => (
                      <div key={i} className="row justify-content-center">
                        {week.map((day, j) => {
                          const isSelected = selectedDays.some(
                            (d) =>
                              d.date === day.date &&
                              d.month === day.month &&
                              d.year === day.year
                          );

                          return (
                            <div
                              key={j}
                              className={`col-1 font d-flex justify-content-center py-2 ${
                                isSelected ? "bg-selected" : ""
                              }`}
                              style={{
                                borderRadius: "50%",
                                cursor: "pointer",
                                backgroundColor: isSelected
                                  ? "#e0f0ff"
                                  : "transparent",
                                color: day.inactive ? "#9e9e9e" : "inherit",
                              }}
                              onClick={() => toggleDaySelection(day)}
                            >
                              {day.date}
                            </div>
                          );
                        })}
                      </div>
                    ))}
                  </div>

                  <div className="col-1 text-center d-flex justify-content-center">
                    <button
                      className="btn border-0 btn-outline-secondary"
                      onClick={nextMonth}
                    >
                      <FontAwesomeIcon icon={faChevronRight} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                aria-label="Confirm"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
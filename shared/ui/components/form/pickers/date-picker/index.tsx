import { useState } from 'react';
import { Header, CalendarView, YearView } from './components/exports';
import { DatePickerProps } from './types';
import { DateTimeContextProvider } from './context';

export default function DatePicker({
  disablePastDates = false,
  startWeekOnMonday = false,
  minDate,
  maxDate,
  yearRange,
  onChange = () => {},
  dateLib,
}: DatePickerProps) {
  const [displayedMonth, setDisplayedMonth] = useState(dateLib.startOfMonth(new Date()));
  const [showYearGrid, setShowYearGrid] = useState(false);
  const today = new Date();

  today.setHours(0, 0, 0, 0);

  const daysOfWeek = startWeekOnMonday
    ? ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']
    : ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  const disablePrev =
    (disablePastDates && dateLib.isSameMonth(displayedMonth, today)) ||
    (minDate && dateLib.isBefore(displayedMonth, minDate));
  const disableNext = maxDate && dateLib.isAfter(displayedMonth, maxDate);

  const customYearRange = yearRange
    ? Array.from({ length: yearRange[1] - yearRange[0] + 1 }, (_, i) => i + yearRange[0])
    : Array.from({ length: 41 }, (_, i) => i + 1990); // Default if yearRange is not provided

  return (
    <DateTimeContextProvider>
      <div className='absolute z-10 mt-2 border rounded w-72 p-4'>
        <Header
          displayedMonth={displayedMonth}
          setDisplayedMonth={setDisplayedMonth}
          disablePrev={disablePrev}
          disableNext={disableNext}
          dateLib={dateLib}
          yearRange={customYearRange}
          showYearGrid={showYearGrid}
          setShowYearGrid={setShowYearGrid}
        />

        {showYearGrid ? (
          <YearView
            displayedMonth={displayedMonth}
            setDisplayedMonth={setDisplayedMonth}
            yearRange={customYearRange}
            setShowYearGrid={setShowYearGrid}
          />
        ) : (
          <CalendarView
            displayedMonth={displayedMonth}
            onChange={(date) => onChange(date)}
            disablePastDates={disablePastDates}
            minDate={minDate}
            maxDate={maxDate}
            dateLib={dateLib}
            today={today}
            daysOfWeek={daysOfWeek}
          />
        )}
      </div>
    </DateTimeContextProvider>
  );
}

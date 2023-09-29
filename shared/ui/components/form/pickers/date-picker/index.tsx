import { useState } from 'react';
import { Header, CalendarView, YearView } from './components/exports';
import { DatePickerProps } from './types';
import { DateTimeContextProvider, useDateTime } from './context';

export default function DatePicker({ ...props }: DatePickerProps) {
  return (
    <DateTimeContextProvider>
      <PickerContainer {...props} />
    </DateTimeContextProvider>
  );
}

function PickerContainer({
  disablePastDates = false,
  startWeekOnMonday = false,
  minDate,
  maxDate,
  yearRange,
  onChange = () => {},
}: DatePickerProps) {
  const { dateTime, startOfMonth, conditions } = useDateTime();
  const [displayedMonth, setDisplayedMonth] = useState(startOfMonth(new Date()));
  const [showYearGrid, setShowYearGrid] = useState(false);
  const today = new Date();

  today.setHours(0, 0, 0, 0);

  const daysOfWeek = startWeekOnMonday
    ? ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']
    : ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  const disablePrev =
    (disablePastDates && conditions.isSameMonth(dateTime, today)) ||
    (minDate && conditions.isBefore(dateTime, minDate));
  const disableNext = maxDate && conditions.isAfter(dateTime, maxDate);

  const customYearRange = yearRange
    ? Array.from({ length: yearRange[1] - yearRange[0] + 1 }, (_, i) => i + yearRange[0])
    : Array.from({ length: 41 }, (_, i) => i + 1990); // Default if yearRange is not provided

  return (
    <div className='absolute z-10 mt-2 border rounded w-72 p-4'>
      <Header
        displayedMonth={displayedMonth}
        setDisplayedMonth={setDisplayedMonth}
        disablePrev={disablePrev}
        disableNext={disableNext}
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
          today={today}
          daysOfWeek={daysOfWeek}
        />
      )}
    </div>
  );
}

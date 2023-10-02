import { useDTPCxt } from '../dtp-context';
import React, { useRef, useEffect } from 'react';
import { ViewTypes } from '../types';

interface YearButtonProps {
  year: number;
  dateTime: Date;
  setDateTime: (date: Date) => void;
  setView: (view: ViewTypes) => void;
  adjustDate: (date: Date) => Date;
  minDate?: Date;
  maxDate?: Date;
  disablePastDates?: boolean;
}

export default function YearView() {
  const {
    dateTime,
    yearRange,
    setView,
    setDateTime,
    adjustDate,
    minDate,
    maxDate,
    disablePastDates,
  } = useDTPCxt();
  const displayedYears = generateYearRange(yearRange[0], yearRange[1]);
  const selectedYearRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (selectedYearRef.current) {
      selectedYearRef.current.scrollIntoView({
        block: 'center',
      });
    }
  }, []);

  return (
    <div className='grid gap-[3px] grid-cols-4 w-full h-full overflow-y-auto'>
      {displayedYears.map((year) => (
        <YearButton
          key={year}
          year={year}
          dateTime={dateTime}
          setDateTime={setDateTime}
          setView={setView}
          adjustDate={adjustDate}
          minDate={minDate}
          maxDate={maxDate}
          disablePastDates={disablePastDates}
          ref={year === dateTime.getFullYear() ? selectedYearRef : null}
        />
      ))}
    </div>
  );
}

const YearButton = React.forwardRef<HTMLButtonElement, YearButtonProps>(
  function YearButton(
    {
      year,
      dateTime,
      setDateTime,
      setView,
      adjustDate,
      minDate,
      maxDate,
      disablePastDates,
    },
    ref
  ) {
    const isSelected = dateTime.getFullYear() === year;
    const isDisabled =
      (disablePastDates && year < (minDate?.getFullYear() || 0)) ||
      year > (maxDate?.getFullYear() || Infinity);

    return (
      <button
        ref={ref}
        className={`btn btn-ghost ${
          isDisabled
            ? 'opacity-disabled no-animation hover:bg-transparent cursor-default'
            : isSelected
            ? 'bg-primary hover:bg-primary hover:opacity-on-hover'
            : ''
        }`}
        type='button'
        onClick={() => {
          if (!isSelected && !isDisabled) {
            const newDate = new Date(dateTime);
            newDate.setFullYear(year);
            const adjustedDate = adjustDate(newDate);
            setDateTime(adjustedDate);
            setView('calendar');
          }
        }}>
        {year}
      </button>
    );
  }
);

// Generate an array of years between the start and end years
function generateYearRange(start: number, end: number): number[] {
  const years = [];
  for (let i = start; i <= end; i++) {
    years.push(i);
  }
  return years;
}

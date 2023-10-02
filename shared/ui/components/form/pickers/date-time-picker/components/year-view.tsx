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
  classNames?: {
    button?: string;
    disabled?: string;
    selected?: string;
  };
}

interface YearViewProps {
  classNames?: {
    container?: string;
    button?: string;
    disabled?: string;
    selected?: string;
  };
}

export default function YearView({ classNames }: YearViewProps) {
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
    <div
      className={
        classNames?.container ||
        'grid gap-[3px] grid-cols-4 w-full h-full overflow-y-auto'
      }>
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
          classNames={{
            button: classNames?.button,
            disabled: classNames?.disabled,
            selected: classNames?.selected,
          }}
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
      classNames,
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
        className={`${classNames?.button || 'btn btn-ghost'} ${
          isDisabled
            ? classNames?.disabled ||
              'opacity-disabled no-animation hover:bg-transparent cursor-default'
            : isSelected
            ? classNames?.selected || 'bg-primary hover:bg-primary hover:opacity-on-hover'
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

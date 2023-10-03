import { useDPCxt } from '../dp-context';
import React, { useRef, useEffect } from 'react';
import { ViewTypes, YearViewStyleProps } from '../types';
import { yearView as defaultStyles } from '../default-styles';

interface YearViewProps extends YearViewStyleProps {
  year: number;
  date: Date;
  setDate: (date: Date) => void;
  setView: (view: ViewTypes) => void;
  adjustDate: (date: Date) => Date;
  minDate?: Date;
  maxDate?: Date;
  disablePastDates?: boolean;
}

export default function YearView({ classNames, styles }: YearViewStyleProps) {
  const {
    date,
    yearRange,
    setView,
    setDate,
    adjustDate,
    minDate,
    maxDate,
    disablePastDates,
  } = useDPCxt();
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
      style={{ ...defaultStyles.container, ...styles?.container }}
      className={classNames?.container}>
      {displayedYears.map((year) => (
        <YearButton
          key={year}
          year={year}
          date={date}
          setDate={setDate}
          setView={setView}
          adjustDate={adjustDate}
          minDate={minDate}
          maxDate={maxDate}
          disablePastDates={disablePastDates}
          classNames={classNames}
          styles={styles}
          ref={year === date.getFullYear() ? selectedYearRef : null}
        />
      ))}
    </div>
  );
}

const YearButton = React.forwardRef<HTMLButtonElement, YearViewProps>(function YearButton(
  {
    year,
    date,
    setDate,
    setView,
    adjustDate,
    minDate,
    maxDate,
    disablePastDates,
    classNames,
    styles,
  },
  ref
) {
  const isSelected = date.getFullYear() === year;
  const isDisabled =
    (disablePastDates && year < (minDate?.getFullYear() || 0)) ||
    year > (maxDate?.getFullYear() || Infinity);

  return (
    <button
      ref={ref}
      style={{
        ...defaultStyles.button,
        ...(isDisabled ? defaultStyles.disabled : {}),
        ...(isSelected ? defaultStyles.selected : {}),
        ...styles?.button,
      }}
      className={`${classNames?.button || ''} ${
        isDisabled
          ? classNames?.disabled || ''
          : isSelected
          ? classNames?.selected || ''
          : ''
      }`}
      type='button'
      onClick={() => {
        if (!isSelected && !isDisabled) {
          const newDate = new Date(date);
          newDate.setFullYear(year);
          const adjustedDate = adjustDate(newDate);
          setDate(adjustedDate);
          setView('calendar');
        }
      }}>
      {year}
    </button>
  );
});

// Generate an array of years between the start and end years
function generateYearRange(start: number, end: number): number[] {
  const years = [];
  for (let i = start; i <= end; i++) {
    years.push(i);
  }
  return years;
}

import { useDTPCxt } from '../dtp-context';
import React from 'react';
import { ViewTypes } from '../types';

interface YearButtonProps {
  year: number;
  dateTime: Date;
  setDateTime: (date: Date) => void;
  setView: (view: ViewTypes) => void; // <-- Update this line
}

export default function YearView() {
  const { dateTime, yearRange, setView, setDateTime } = useDTPCxt();
  const displayedYears = generateYearRange(yearRange[0], yearRange[1]);

  return (
    <div className='grid gap-[3px] grid-cols-4 w-full max-h-[280px] overflow-y-auto'>
      {displayedYears.map((year) => (
        <YearButton
          key={year}
          year={year}
          dateTime={dateTime}
          setDateTime={setDateTime}
          setView={setView}
        />
      ))}
    </div>
  );
}

const YearButton = React.memo(function YearButton({
  year,
  dateTime,
  setDateTime,
  setView,
}: YearButtonProps) {
  return (
    <button
      className='btn btn-ghost'
      onClick={() => {
        const newDate = new Date(dateTime);
        newDate.setFullYear(year);
        setDateTime(new Date(newDate)); // Update the dateTime in context
        setView('calendar');
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

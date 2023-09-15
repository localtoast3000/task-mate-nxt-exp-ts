import { YearViewProps } from '../../types';

export default function YearView({
  displayedMonth,
  setDisplayedMonth,
  yearRange,
  setShowYearGrid,
}: YearViewProps) {
  return (
    <div className='grid gap-[3px] grid-cols-[calc(100%/4-3px)_calc(100%/4-1.3px)_calc(100%/4-3px)_calc(100%/4-3px)] w-full max-h-[280px] overflow-y-auto'>
      {yearRange.map((year) => (
        <button
          key={year}
          className='btn btn-ghost'
          onClick={() => {
            const newDate = new Date(displayedMonth);
            newDate.setFullYear(year);
            setDisplayedMonth(new Date(newDate));
            setShowYearGrid(false);
          }}>
          {year}
        </button>
      ))}
    </div>
  );
}

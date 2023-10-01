import { useDTPCxt } from '../dtp-context';

export default function YearView() {
  const { dateTime, yearRange, setView, setDateTime } = useDTPCxt();

  // Generate an array of years between the start and end years
  const generateYearRange = (start: number, end: number) => {
    const years = [];
    for (let i = start; i <= end; i++) {
      years.push(i);
    }
    return years;
  };

  const displayedYears = generateYearRange(yearRange[0], yearRange[1]);

  return (
    <div className='grid gap-[3px] grid-cols-[calc(100%/4-3px)_calc(100%/4-1.3px)_calc(100%/4-3px)_calc(100%/4-3px)] w-full max-h-[280px] overflow-y-auto'>
      {displayedYears.map((year) => (
        <button
          key={year}
          className='btn btn-ghost'
          onClick={() => {
            const newDate = new Date(dateTime);
            newDate.setFullYear(year);
            setDateTime(new Date(newDate)); // Update the dateTime in context
            setView('calendar');
          }}>
          {year}
        </button>
      ))}
    </div>
  );
}

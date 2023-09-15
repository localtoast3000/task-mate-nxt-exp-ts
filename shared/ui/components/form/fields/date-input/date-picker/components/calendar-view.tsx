import { CalendarViewProps } from '../../types';

export default function CalendarView({
  displayedMonth,
  onChange,
  disablePastDates,
  minDate,
  maxDate,
  dateLib,
  daysOfWeek,
  today,
}: CalendarViewProps) {
  const daysInMonth = dateLib.getDaysInMonth(displayedMonth);
  const firstDayOfMonth = dateLib.startOfMonth(displayedMonth).getDay();
  const totalDays = 42; // 6 weeks * 7 days
  const numberOfEmptyDays = totalDays - daysInMonth - firstDayOfMonth;

  return (
    <div className='grid grid-cols-7 gap-1 items-center justify-center'>
      {daysOfWeek.map((d, index) => (
        <div
          key={index}
          className='w-full h-10 text-center'>
          <p>{d}</p>
        </div>
      ))}
      {Array.from({ length: firstDayOfMonth }, (_, i) => i).map((_, index) => (
        <div
          key={index}
          className='w-full h-10'
        />
      ))}
      {Array.from({ length: daysInMonth }, (_, index) => index + 1).map((day) => {
        const thisDay = new Date(
          displayedMonth.getFullYear(),
          displayedMonth.getMonth(),
          day
        );
        thisDay.setHours(0, 0, 0, 0);
        const isPast = disablePastDates && dateLib.isBefore(thisDay, today);
        const isBeforeMin = minDate && dateLib.isBefore(thisDay, minDate);
        const isAfterMax = maxDate && dateLib.isAfter(thisDay, maxDate);
        const isDisabled = isPast || isBeforeMin || isAfterMax;

        return (
          <button
            key={day}
            className={`w-full btn-ghost h-10 text-center ${
              isDisabled
                ? 'opacity-[0.4] no-animation hover:bg-transparent cursor-default'
                : ''
            } btn`}
            onClick={() => {
              if (!isDisabled) {
                onChange(dateLib.format(thisDay, 'yyyy-MM-dd'));
              }
            }}>
            <p>{day}</p>
          </button>
        );
      })}
      {Array.from({ length: numberOfEmptyDays }, (_, i) => i).map((_, index) => (
        <div
          key={index}
          className='w-full h-10'
        />
      ))}
    </div>
  );
}

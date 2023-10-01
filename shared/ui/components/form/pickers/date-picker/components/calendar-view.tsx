import { useDateTime } from '../context';

export default function CalendarView() {
  const {
    dateTime,
    conditions,
    startWeekOnMonday,
    disablePastDates,
    minDate,
    maxDate,
    setDateTime,
    todaysDate,
    getDaysInMonth,
    startOfMonth,
  } = useDateTime();

  const daysInMonth = getDaysInMonth(dateTime);
  const firstDayOfMonth = startOfMonth(dateTime).getDay();
  const totalDays = 42; // 6 weeks * 7 days
  const numberOfEmptyDays = totalDays - daysInMonth - firstDayOfMonth;

  const daysOfWeek = startWeekOnMonday
    ? ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']
    : ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

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
      {Array.from({ length: daysInMonth }).map((_, dayIndex) => {
        const day = dayIndex + 1;
        const thisDay = new Date(dateTime.getFullYear(), dateTime.getMonth(), day);
        const isBeforeToday =
          disablePastDates && conditions.isBefore(thisDay, todaysDate());
        const isBeforeMin = minDate && conditions.isBefore(thisDay, minDate);
        const isAfterMax = maxDate && conditions.isAfter(thisDay, maxDate);
        const isDisabled = isBeforeToday || isBeforeMin || isAfterMax;
        const isSelected = thisDay.getTime() === dateTime.getTime();

        return (
          <button
            key={day}
            className={`w-full btn-ghost h-10 text-center ${
              isDisabled
                ? 'opacity-[0.4] no-animation hover:bg-transparent cursor-default'
                : isSelected
                ? 'bg-blue-500 text-white'
                : ''
            } btn`}
            onClick={() => {
              if (!isDisabled) {
                setDateTime(thisDay); // Update the context's dateTime
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

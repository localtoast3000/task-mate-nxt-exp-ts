import { useDTPCxt } from '../dtp-context';
import { useMemo } from 'react';

export default function CalendarView() {
  const context = useDTPCxt();
  const daysInMonth = context.getDaysInMonth(context.dateTime);
  const firstDayOfMonth = context.startOfMonth(context.dateTime).getDay();
  const totalDays = 42; // 6 weeks * 7 days
  const numberOfEmptyDays = totalDays - daysInMonth - firstDayOfMonth;

  const daysOfWeek = context.startWeekOnMonday
    ? ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']
    : ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  return (
    <div className='grid grid-cols-7 gap-1 items-center justify-center'>
      <DaysOfWeek days={daysOfWeek} />
      <EmptyDays count={firstDayOfMonth} />
      <Days
        context={context}
        daysInMonth={daysInMonth}
      />
      <EmptyDays count={numberOfEmptyDays} />
    </div>
  );
}

interface DaysOfWeekProps {
  days: string[];
}

function DaysOfWeek({ days }: DaysOfWeekProps) {
  return (
    <>
      {days.map((d, index) => (
        <div
          key={index}
          className='w-full h-10 text-center text-neutral'>
          <p>{d}</p>
        </div>
      ))}
    </>
  );
}

interface EmptyDaysProps {
  count: number;
}

function EmptyDays({ count }: EmptyDaysProps) {
  const emptyDays = useMemo(() => Array.from({ length: count }), [count]);

  return (
    <>
      {emptyDays.map((_, index) => (
        <div
          key={index}
          className='w-full h-10'
        />
      ))}
    </>
  );
}

interface DaysProps {
  daysInMonth: number;
  context: ReturnType<typeof useDTPCxt>;
}

function Days({ daysInMonth, context }: DaysProps) {
  const days = useMemo(() => Array.from({ length: daysInMonth }), [daysInMonth]);

  return (
    <>
      {days.map((_, dayIndex) => {
        const day = dayIndex + 1;
        const thisDay = new Date(
          context.dateTime.getFullYear(),
          context.dateTime.getMonth(),
          day,
          context.dateTime.getHours(),
          context.dateTime.getMinutes(),
          context.dateTime.getSeconds(),
          context.dateTime.getMilliseconds()
        );
        const isBeforeToday =
          context.disablePastDates &&
          context.conditions.isBefore(thisDay, context.todaysDate());
        const isBeforeMin =
          context.minDate && context.conditions.isBefore(thisDay, context.minDate);
        const isAfterMax =
          context.maxDate && context.conditions.isAfter(thisDay, context.maxDate);
        const isDisabled = isBeforeToday || isBeforeMin || isAfterMax;
        const isSelected = thisDay.getTime() === context.dateTime.getTime();

        return (
          <button
            key={day}
            type='button'
            className={`w-full btn-ghost h-10 text-center ${
              isDisabled
                ? 'opacity-[0.4] no-animation hover:bg-transparent cursor-default'
                : isSelected
                ? 'bg-blue-500 text-white'
                : ''
            } btn`}
            onClick={() => {
              if (!isDisabled) {
                context.setDateTime(thisDay);
                context.setView('time');
              }
            }}>
            <p>{day}</p>
          </button>
        );
      })}
    </>
  );
}

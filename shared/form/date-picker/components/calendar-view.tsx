import { useDPCxt } from '../dp-context';
import React, { useMemo } from 'react';
import { CalendarViewStyleProps } from '../types';
import { calendarView as defaultStyles } from '../default-styles';

export default function CalendarView({
  classNames = {},
  styles = {},
}: CalendarViewStyleProps) {
  const context = useDPCxt();
  const daysInMonth = context.getDaysInMonth(context.date);
  const firstDayOfMonth = context.startOfMonth(context.date).getDay();
  const totalDays = 42; // 6 weeks * 7 days
  const numberOfEmptyDays = totalDays - daysInMonth - firstDayOfMonth;

  const daysOfWeek = context.startWeekOnMonday
    ? ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']
    : ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  return (
    <div
      style={{ ...defaultStyles.container, ...styles.container }}
      className={classNames.container}>
      <DaysOfWeek
        days={daysOfWeek}
        classNames={classNames}
        styles={styles}
      />
      <EmptyDays
        count={firstDayOfMonth}
        classNames={classNames}
        styles={styles}
      />
      <Days
        context={context}
        daysInMonth={daysInMonth}
        classNames={classNames}
        styles={styles}
      />
      <EmptyDays
        count={numberOfEmptyDays}
        classNames={classNames}
        styles={styles}
      />
    </div>
  );
}

interface DaysOfWeekProps extends CalendarViewStyleProps {
  days: string[];
}

function DaysOfWeek({ days, styles, classNames }: DaysOfWeekProps) {
  return (
    <>
      {days.map((d, index) => (
        <div
          key={index}
          style={{ ...defaultStyles.dayContainer, ...styles?.dayContainer }}
          className={classNames?.dayContainer}>
          <p>{d}</p>
        </div>
      ))}
    </>
  );
}

interface EmptyDaysProps extends CalendarViewStyleProps {
  count: number;
}

function EmptyDays({ count, styles, classNames }: EmptyDaysProps) {
  const emptyDays = useMemo(() => Array.from({ length: count }), [count]);

  return (
    <>
      {emptyDays.map((_, index) => (
        <div
          key={index}
          style={{ ...defaultStyles.dayContainer, ...styles?.dayContainer }}
          className={classNames?.dayContainer}
        />
      ))}
    </>
  );
}

interface DaysProps extends CalendarViewStyleProps {
  daysInMonth: number;
  context: ReturnType<typeof useDPCxt>;
}

function Days({ daysInMonth, context, classNames, styles }: DaysProps) {
  const days = useMemo(() => Array.from({ length: daysInMonth }), [daysInMonth]);

  return (
    <>
      {days.map((_, dayIndex) => {
        const day = dayIndex + 1;
        const thisDay = new Date(
          context.date.getFullYear(),
          context.date.getMonth(),
          day,
          context.date.getHours(),
          context.date.getMinutes(),
          context.date.getSeconds(),
          context.date.getMilliseconds()
        );
        const isBeforeToday =
          context.disablePastDates &&
          context.conditions.isBefore(thisDay, context.todaysDate());
        const isBeforeMin =
          context.minDate && context.conditions.isBefore(thisDay, context.minDate);
        const isAfterMax =
          context.maxDate && context.conditions.isAfter(thisDay, context.maxDate);
        const isDisabled = isBeforeToday || isBeforeMin || isAfterMax;
        const isSelected = thisDay.getTime() === context.date.getTime();

        return (
          <button
            key={day}
            type='button'
            style={{
              ...defaultStyles.dayButton,
              ...(isSelected ? defaultStyles.selectedDayButton : {}),
              ...(isDisabled ? defaultStyles.disabledDayButton : {}),
              ...styles?.dayButton,
              ...(isSelected ? styles?.selectedDayButton : {}),
              ...(isDisabled ? styles?.disabledDayButton : {}),
            }}
            className={`${classNames?.dayButton || ''} ${
              isSelected
                ? classNames?.selectedDayButton || ''
                : isDisabled
                ? classNames?.disabledDayButton || ''
                : ''
            }`}
            onClick={() => {
              if (!isDisabled && !isSelected) {
                context.setDate(thisDay);
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

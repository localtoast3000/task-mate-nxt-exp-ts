import { useDTPCxt } from '../dtp-context';
import React, { useMemo } from 'react';

const defaultStyles = {
  calendarContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gap: 10,
  },
  dayContainer: {
    width: '100%',
    textAlign: 'center' as 'center',
    marginBottom: 10,
  },
  dayButton: {
    width: '100%',
    textAlign: 'center' as 'center',
  },
  selectedDayButton: {
    backgroundColor: '#3498db',
  },
  disabledDayButton: {
    opacity: '0.5',
  },
};

interface CalendarViewProps {
  classNames?: {
    container?: string;
    dayContainer?: string;
    dayButton?: string;
    selectedDayButton?: string;
    disabledDayButton?: string;
  };
  styles?: {
    container?: React.CSSProperties;
    dayContainer?: React.CSSProperties;
    dayButton?: React.CSSProperties;
    selectedDayButton?: React.CSSProperties;
    disabledDayButton?: React.CSSProperties;
  };
}

export default function CalendarView({
  classNames = {},
  styles = {},
}: CalendarViewProps) {
  const context = useDTPCxt();
  const daysInMonth = context.getDaysInMonth(context.dateTime);
  const firstDayOfMonth = context.startOfMonth(context.dateTime).getDay();
  const totalDays = 42; // 6 weeks * 7 days
  const numberOfEmptyDays = totalDays - daysInMonth - firstDayOfMonth;

  const daysOfWeek = context.startWeekOnMonday
    ? ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']
    : ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  return (
    <div
      style={{ ...defaultStyles.calendarContainer, ...styles.container }}
      className={classNames.container}>
      <DaysOfWeek days={daysOfWeek} />
      <EmptyDays count={firstDayOfMonth} />
      <Days
        context={context}
        daysInMonth={daysInMonth}
        classNames={classNames}
        styles={styles}
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
          style={defaultStyles.dayContainer}>
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
          style={defaultStyles.dayContainer}
        />
      ))}
    </>
  );
}

interface DaysProps {
  daysInMonth: number;
  context: ReturnType<typeof useDTPCxt>;
  classNames: CalendarViewProps['classNames'];
  styles: CalendarViewProps['styles'];
}

function Days({ daysInMonth, context, classNames, styles }: DaysProps) {
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

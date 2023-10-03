import { useDPCxt } from '../dp-context';
import { ViewTypes, HeaderStyleProps } from '../types';
import React from 'react';
import { header as defaultStyles } from '../default-styles';

export default function Header({ classNames = {}, styles = {} }: HeaderStyleProps) {
  const context = useDPCxt();

  const headerComponents = [
    {
      Component: YearButton,
      props: {
        view: context.view,
        date: context.date,
        setView: context.setView,
      } as YearButtonProps,
    },
    {
      Component: TimeButton,
      props: {
        date: context.date,
        view: context.view,
        setView: context.setView,
        format: context.format,
      } as TimeButtonProps,
    },
    {
      Component: MonthButton,
      props: {
        view: context.view,
        date: context.date,
        setView: context.setView,
        format: context.format,
      } as MonthButtonProps,
    },
    {
      Component: CalendarNavButtons,
      props: {
        date: context.date,
        minDate: context.minDate,
        maxDate: context.maxDate,
        conditions: context.conditions,
        view: context.view,
        todaysDate: context.todaysDate,
        updateDate: context.updateDate,
      } as CalendarNavButtonProps,
    },
  ];

  return (
    <div
      style={{
        ...defaultStyles.container,
        ...styles?.container,
      }}
      className={classNames?.container || ''}>
      {headerComponents.map(({ Component, props }, index) => (
        <Component
          key={index}
          {...(props as any)}
          classNames={classNames}
          styles={styles}
        />
      ))}
    </div>
  );
}

interface YearButtonProps extends HeaderStyleProps {
  date: Date;
  view: ViewTypes;
  setView: (view: ViewTypes) => void;
}

const YearButton: React.FC<YearButtonProps> = ({
  date,
  setView,
  view,
  classNames,
  styles,
}) => {
  return (
    <button
      type='button'
      style={{
        ...defaultStyles.viewButton,
        ...defaultStyles.yearButton,
        ...(view === 'year' ? defaultStyles.viewButtonActive : {}),
        ...(view === 'year' ? defaultStyles.yearButtonActive : {}),
        ...styles?.viewButton,
        ...styles?.yearButton,
        ...(view === 'year' ? styles?.viewButtonActive : {}),
        ...(view === 'year' ? styles?.yearButtonActive : {}),
      }}
      className={`${classNames?.viewButton || ''} ${classNames?.yearButton || ''} ${
        view === 'year' ? classNames?.viewButtonActive || '' : ''
      } ${view === 'year' ? classNames?.yearButtonActive || '' : ''}`}
      onClick={() => setView('year')}>
      <span>{date.getFullYear()}</span>
    </button>
  );
};

interface TimeButtonProps extends HeaderStyleProps {
  date: Date;
  view: ViewTypes;
  setView: (view: ViewTypes) => void;
  format: (date: Date, format: string, options?: {}) => string;
}

const TimeButton: React.FC<TimeButtonProps> = ({
  date,
  view,
  setView,
  format,
  classNames,
  styles,
}) => {
  return (
    <button
      type='button'
      style={{
        ...defaultStyles.viewButton,
        ...defaultStyles.timeButton,
        ...(view === 'time' ? defaultStyles.viewButtonActive : {}),
        ...(view === 'time' ? defaultStyles.timeButtonActive : {}),
        ...styles?.viewButton,
        ...styles?.timeButton,
        ...(view === 'time' ? styles?.viewButtonActive : {}),
        ...(view === 'time' ? styles?.timeButtonActive : {}),
        ...(view === 'calendar' ? {} : defaultStyles.timeButtonSpan),
        ...(view === 'calendar' ? {} : styles?.timeButtonSpan),
      }}
      className={`${classNames?.viewButton || ''} ${classNames?.timeButton || ''} ${
        view === 'time' ? classNames?.viewButtonActive || '' : ''
      } ${view === 'time' ? classNames?.timeButtonActive || '' : ''} ${
        view === 'calendar' ? '' : classNames?.timeButtonSpan
      }`}
      onClick={() => setView('time')}>
      {format(date, 'HH:mm')}
    </button>
  );
};

interface MonthButtonProps extends HeaderStyleProps {
  date: Date;
  view: ViewTypes;
  setView: (view: ViewTypes) => void;
  format: (date: Date, format: string, options?: {}) => string;
}

const MonthButton: React.FC<MonthButtonProps> = ({
  date,
  setView,
  format,
  view,
  classNames,
  styles,
}) => {
  return (
    <button
      type='button'
      style={{
        ...defaultStyles.viewButton,
        ...defaultStyles.monthButton,
        ...(view === 'calendar' ? defaultStyles.viewButtonActive : {}),
        ...(view === 'calendar' ? defaultStyles.monthButtonActive : {}),
        ...styles?.viewButton,
        ...styles?.monthButton,
        ...(view === 'calendar' ? styles?.viewButtonActive : {}),
        ...(view === 'calendar' ? styles?.monthButtonActive : {}),
      }}
      className={`${classNames?.viewButton || ''} ${classNames?.monthButton || ''} ${
        view === 'calendar' ? classNames?.viewButtonActive || '' : ''
      } ${view === 'calendar' ? classNames?.monthButtonActive || '' : ''}`}
      onClick={() => setView('calendar')}>
      <span>{format(date, 'MMMM')}</span>
    </button>
  );
};

interface CalendarNavButtonProps extends HeaderStyleProps {
  date: Date;
  minDate?: Date;
  maxDate?: Date;
  conditions: {
    isBefore: (date1: Date, date2: Date) => boolean;
    isAfter: (date1: Date, date2: Date) => boolean;
  };
  view: ViewTypes;
  todaysDate: () => Date;
  updateDate: (
    modifier: 'add' | 'sub',
    options: {
      month?: number;
    }
  ) => void;
}

const CalendarNavButtons: React.FC<CalendarNavButtonProps> = ({
  date,
  minDate,
  maxDate,
  conditions,
  view,
  todaysDate,
  updateDate,
  classNames,
  styles,
}) => {
  const previousMonth = new Date(date.getFullYear(), date.getMonth() - 1, 1);
  const nextMonth = new Date(date.getFullYear(), date.getMonth() + 1, 1);
  const currentMonth = new Date(todaysDate().getFullYear(), todaysDate().getMonth(), 1);

  const disablePrev =
    (minDate && conditions.isBefore(previousMonth, minDate)) ||
    conditions.isBefore(previousMonth, currentMonth);

  const disableNext = maxDate && conditions.isAfter(nextMonth, maxDate);

  return (
    <div
      style={{
        ...defaultStyles.navButtonsWrapper,
        ...styles?.navButtonsWrapper,
        ...(view === 'calendar' ? {} : defaultStyles.navButtonsHidden),
        ...(view === 'calendar' ? {} : styles?.navButtonsHidden),
      }}
      className={`${classNames?.navButtonsWrapper || ''} ${
        view === 'calendar' ? '' : classNames?.navButtonsHidden
      }`}>
      <CalendarNavButton
        disabled={disablePrev}
        onClick={() => !disablePrev && updateDate('sub', { month: 1 })}
        points='10,0 0,5 10,10'
        classNames={classNames}
        styles={styles}
      />
      <CalendarNavButton
        disabled={disableNext}
        onClick={() => !disableNext && updateDate('add', { month: 1 })}
        points='0,0 10,5 0,10'
        classNames={classNames}
        styles={styles}
      />
    </div>
  );
};

interface NavButtonProps extends HeaderStyleProps {
  disabled?: boolean;
  onClick: () => void;
  points: string;
}

const CalendarNavButton: React.FC<NavButtonProps> = ({
  disabled,
  onClick,
  points,
  classNames,
  styles,
}) => {
  return (
    <button
      type='button'
      style={{
        ...defaultStyles.navButton,
        ...(disabled ? defaultStyles.navButtonDisabled : {}),
        ...styles?.navButton,
        ...(disabled ? styles?.navButtonDisabled : {}),
      }}
      className={`${classNames?.navButton || ''} ${
        disabled ? classNames?.navButtonDisabled || '' : ''
      }`}
      onClick={onClick}>
      <svg
        style={{
          ...defaultStyles.navButtonIcon,
          ...(disabled ? defaultStyles.navButtonIconDisabled : {}),
          ...styles?.navButtonIcon,
          ...(disabled ? styles?.navButtonIconDisabled : {}),
        }}
        className={`${classNames?.navButtonIcon} ${
          disabled ? classNames?.navButtonIconDisabled : ''
        }`}>
        <polygon points={points} />
      </svg>
    </button>
  );
};

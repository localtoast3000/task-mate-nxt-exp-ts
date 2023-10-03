import { useDTPCxt } from '../dtp-context';
import { ViewTypes } from '../types';
import React from 'react';

const defaultStyles = {
  container: {
    display: 'grid',
    gridTemplateRows: 'repeat(2, 20px)',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: 10,
    width: '100%',
    paddingBottom: '20px',
  },
  viewButton: {
    opacity: 0.8,
  },
  viewButtonActive: {
    opacity: 1,
  },
  yearButton: {
    justifySelf: 'start',
  },
  yearButtonActive: {},
  timeButton: {
    justifySelf: 'end',
  },
  timeButtonActive: {},
  timeButtonSpan: {
    gridRow: 'span 2',
    alignSelf: 'end',
    fontSize: '1.5rem',
  },
  monthButton: {
    justifySelf: 'start',
  },
  monthButtonActive: {},
  navButtonsWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'end',
    gap: 30,
  },
  navButtonsHidden: {
    display: 'none',
  },
  navButton: {
    opacity: 1,
  },
  navButtonDisabled: {
    opacity: 0.6,
  },
  navButtonIcon: {
    opacity: 1,
    width: 10,
    height: 10,
    fill: 'white',
  },
  navButtonIconDisabled: {
    opacity: 0.6,
  },
};

interface HeaderProps {
  classNames?: {
    container?: string;
    viewButton?: string;
    viewButtonActive?: string;
    yearButton?: string;
    yearButtonActive?: string;
    timeButton?: string;
    timeButtonSpan?: string;
    timeButtonActive?: string;
    monthButton?: string;
    monthButtonActive?: string;
    navButtonsWrapper?: string;
    navButtonsHidden?: string;
    navButton?: string;
    navButtonDisabled?: string;
    navButtonIcon?: string;
    navButtonIconDisabled?: string;
  };
  styles?: {
    container?: React.CSSProperties;
    viewButton?: React.CSSProperties;
    viewButtonActive?: React.CSSProperties;
    yearButton?: React.CSSProperties;
    yearButtonActive?: React.CSSProperties;
    timeButton?: React.CSSProperties;
    timeButtonSpan?: React.CSSProperties;
    timeButtonActive?: React.CSSProperties;
    monthButton?: React.CSSProperties;
    monthButtonActive?: React.CSSProperties;
    navButtonsWrapper?: React.CSSProperties;
    navButtonsHidden?: React.CSSProperties;
    navButton?: React.CSSProperties;
    navButtonDisabled?: React.CSSProperties;
    navButtonIcon?: React.CSSProperties;
    navButtonIconDisabled?: React.CSSProperties;
  };
}

export default function Header({ classNames = {}, styles = {} }: HeaderProps) {
  const context = useDTPCxt();

  return (
    <div
      style={{
        ...defaultStyles.container,
        ...styles?.container,
      }}
      className={classNames?.container || ''}>
      <YearButton
        view={context.view}
        dateTime={context.dateTime}
        setView={context.setView}
        classNames={classNames}
        styles={styles}
      />
      <TimeButton
        dateTime={context.dateTime}
        view={context.view}
        setView={context.setView}
        format={context.format}
        classNames={classNames}
        styles={styles}
      />
      <MonthButton
        view={context.view}
        dateTime={context.dateTime}
        setView={context.setView}
        format={context.format}
        classNames={classNames}
        styles={styles}
      />
      <CalendarNavButtons
        {...context}
        classNames={classNames}
        styles={styles}
      />
    </div>
  );
}

interface YearButtonProps extends HeaderProps {
  dateTime: Date;
  view: ViewTypes;
  setView: (view: ViewTypes) => void;
}

const YearButton: React.FC<YearButtonProps> = ({
  dateTime,
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
      <span>{dateTime.getFullYear()}</span>
    </button>
  );
};

interface TimeButtonProps extends HeaderProps {
  dateTime: Date;
  view: ViewTypes;
  setView: (view: ViewTypes) => void;
  format: (date: Date, format: string, options?: {}) => string;
}

const TimeButton: React.FC<TimeButtonProps> = ({
  dateTime,
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
      {format(dateTime, 'HH:mm')}
    </button>
  );
};

interface MonthButtonProps extends HeaderProps {
  dateTime: Date;
  view: ViewTypes;
  setView: (view: ViewTypes) => void;
  format: (date: Date, format: string, options?: {}) => string;
}

const MonthButton: React.FC<MonthButtonProps> = ({
  dateTime,
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
      <span>{format(dateTime, 'MMMM')}</span>
    </button>
  );
};

interface CalendarNavButtonProps extends HeaderProps {
  dateTime: Date;
  minDate?: Date;
  maxDate?: Date;
  conditions: {
    isBefore: (date1: Date, date2: Date) => boolean;
    isAfter: (date1: Date, date2: Date) => boolean;
  };
  view: ViewTypes;
  todaysDate: () => Date;
  updateDateTime: (
    modifier: 'add' | 'sub',
    options: {
      month?: number;
    }
  ) => void;
}

const CalendarNavButtons: React.FC<CalendarNavButtonProps> = ({
  dateTime,
  minDate,
  maxDate,
  conditions,
  view,
  todaysDate,
  updateDateTime,
  classNames,
  styles,
}) => {
  const previousMonth = new Date(dateTime.getFullYear(), dateTime.getMonth() - 1, 1);
  const nextMonth = new Date(dateTime.getFullYear(), dateTime.getMonth() + 1, 1);
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
        onClick={() => !disablePrev && updateDateTime('sub', { month: 1 })}
        points='10,0 0,5 10,10'
        classNames={classNames}
        styles={styles}
      />
      <CalendarNavButton
        disabled={disableNext}
        onClick={() => !disableNext && updateDateTime('add', { month: 1 })}
        points='0,0 10,5 0,10'
        classNames={classNames}
        styles={styles}
      />
    </div>
  );
};

interface NavButtonProps extends HeaderProps {
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

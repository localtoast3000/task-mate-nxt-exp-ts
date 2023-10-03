import { ReactNode, CSSProperties } from 'react';

export type ViewTypes = 'calendar' | 'year' | 'time';

export interface DatePickerProps {
  views: ViewTypes[];
  initialDate?: Date;
  disablePastDates: boolean;
  startWeekOnMonday: boolean;
  minDate?: Date;
  maxDate?: Date;
  yearRange: number[];
  onChange?: (date: Date) => void;
  children?: ReactNode;
}

export interface DatePickerStyleProps {
  styles?: {
    container?: CSSProperties;
    viewContainer?: CSSProperties;
    header?: HeaderStyleProps['styles'];
    yearView?: YearViewStyleProps['styles'];
    calendarView?: CalendarViewStyleProps['styles'];
    timeView?: TimeViewStyleProps['styles'];
  };
  classNames?: {
    container?: string;
    viewContainer?: string;
    header?: HeaderStyleProps['classNames'];
    yearView?: YearViewStyleProps['classNames'];
    calendarView?: CalendarViewStyleProps['classNames'];
    timeView?: TimeViewStyleProps['classNames'];
  };
}

export interface HeaderStyleProps {
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

export interface CalendarViewStyleProps {
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

export interface YearViewStyleProps {
  classNames?: {
    container?: string;
    button?: string;
    disabled?: string;
    selected?: string;
  };
  styles?: {
    container?: React.CSSProperties;
    button?: React.CSSProperties;
    disabled?: React.CSSProperties;
    selected?: React.CSSProperties;
  };
}

export interface TimeViewStyleProps {
  classNames?: {
    container?: string;
    column?: string;
    button?: string;
    disabled?: string;
    selected?: string;
    divider?: string;
  };
  styles?: {
    button?: React.CSSProperties;
    container?: React.CSSProperties;
    column?: React.CSSProperties;
    disabled?: React.CSSProperties;
    selected?: React.CSSProperties;
    divider?: React.CSSProperties;
  };
}

import React from 'react';
import { DateLib } from '../../types';

export interface DatePickerProps {
  selectedDate: Date;
  disablePastDates: boolean;
  startWeekOnMonday: boolean;
  minDate?: Date;
  maxDate?: Date;
  yearRange: number[];
  selectedDate: Date;
  onChange?: (date: Date) => void;
}

export interface HeaderProps {
  displayedMonth: Date;
  setDisplayedMonth: React.Dispatch<React.SetStateAction<Date>>;
  disablePrev: boolean | undefined;
  disableNext: boolean | undefined;
  yearRange: number[];
  showYearGrid: boolean;
  setShowYearGrid: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface CalendarViewProps {
  daysInMonth?: number;
  displayedMonth: Date;
  onChange: (date: Date) => void;
  disablePastDates?: boolean;
  minDate?: Date;
  maxDate?: Date;
  today: Date;
  daysOfWeek: string[];
}

export interface YearViewProps {
  displayedMonth: Date;
  setDisplayedMonth: React.Dispatch<React.SetStateAction<Date>>;
  yearRange: number[];
  setShowYearGrid: React.Dispatch<React.SetStateAction<boolean>>;
}
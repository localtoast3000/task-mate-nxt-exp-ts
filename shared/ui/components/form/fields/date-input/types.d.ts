import React from 'react';

export interface DateLib {
  format: (date: Date, formatString: string) => string;
  parse: (dateString: string, formatString: string, referenceDate: Date | number) => Date;
  startOfMonth: (date: Date) => Date;
  getDaysInMonth: (date: Date) => number;
  subMonths: (date: Date, amount: number) => Date;
  addMonths: (date: Date, amount: number) => Date;
  isBefore: (date1: Date, date2: Date) => boolean;
  isSameMonth: (date1: Date, date2: Date) => boolean;
  isAfter: (date1: Date, date2: Date) => boolean;
}

export interface DateInputProps {
  selectedDate: string;
  onChange: (date: string) => void;
  dateLib: DateLib;
  disablePastDates?: boolean;
  startWeekOnMonday?: boolean;
  minDate?: Date;
  maxDate?: Date;
  yearRange?: [number, number];
}

export interface HeaderProps {
  displayedMonth: Date;
  setDisplayedMonth: React.Dispatch<React.SetStateAction<Date>>;
  disablePrev: boolean | undefined;
  disableNext: boolean | undefined;
  dateLib: DateLib;
  yearRange: number[];
  showYearGrid: boolean;
  setShowYearGrid: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface CalendarViewProps {
  daysInMonth?: number;
  displayedMonth: Date;
  onChange: (date: string) => void;
  disablePastDates?: boolean;
  minDate?: Date;
  maxDate?: Date;
  dateLib: DateLib;
  today: Date;
  daysOfWeek: string[];
}

export interface YearViewProps {
  displayedMonth: Date;
  setDisplayedMonth: React.Dispatch<React.SetStateAction<Date>>;
  yearRange: number[];
  setShowYearGrid: React.Dispatch<React.SetStateAction<boolean>>;
}

import { ReactNode } from 'react';

export interface DateTimePickerProps {
  disablePastDates: boolean;
  startWeekOnMonday: boolean;
  minDate?: Date;
  maxDate?: Date;
  yearRange: number[];
  onChange?: (date: Date) => void;
  children?: ReactNode;
}

export type ViewTypes = 'calendar' | 'year' | 'time';

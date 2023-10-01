import React from 'react';

export interface DatePickerContextProps {
  disablePastDates: boolean;
  startWeekOnMonday: boolean;
  minDate?: Date;
  maxDate?: Date;
  yearRange: number[];
  onChange?: (date: Date) => void;
  children?: React.ReactNode;
}

export type ViewTypes = 'calendar' | 'year' | 'time';

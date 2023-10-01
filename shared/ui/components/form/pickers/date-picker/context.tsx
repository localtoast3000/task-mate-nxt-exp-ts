import { createContext, useContext, useState, useEffect } from 'react';
import {
  addDays,
  addMonths,
  addYears,
  addHours,
  addMinutes,
  startOfMonth,
  getDaysInMonth,
  format,
  isSameMonth,
  isBefore,
  isAfter,
} from 'date-fns';
import { DatePickerContextProps, ViewTypes } from './types';

interface DateTimeProps extends DatePickerContextProps {
  dateTime: Date;
  view: ViewTypes;
  setDateTime: (newDateTime: Date) => void;
  setView: (view: ViewTypes) => void;
  updateDateTime: (
    modifier: 'add' | 'sub',
    options: {
      day?: number;
      month?: number;
      year?: number;
      hours?: number;
      minutes?: number;
      milliseconds?: number;
    }
  ) => void;
  todaysDate: () => Date;
  startOfMonth: (date: Date) => Date;
  getDaysInMonth: (date: Date) => number;
  format: (date: Date, format: string, options?: {}) => string;
  conditions: {
    isAfter: (date1: Date, date2: Date) => boolean;
    isBefore: (date1: Date, date2: Date) => boolean;
    isSameMonth: (date1: Date, date2: Date) => boolean;
  };
}

const DateTimeContext = createContext<DateTimeProps | undefined>(undefined);

export function DateTimeContextProvider({
  children,
  onChange = () => {},
  ...props
}: DatePickerContextProps) {
  const [dateTime, setDateTime] = useState(new Date());
  const [view, setView] = useState<ViewTypes>('calendar');

  useEffect(() => {
    onChange(dateTime);
  }, [dateTime]);

  return (
    <DateTimeContext.Provider
      value={{
        dateTime,
        view,
        setDateTime,
        setView,
        updateDateTime: (modifier, options) => {
          const {
            day = 0,
            month = 0,
            year = 0,
            hours = 0,
            minutes = 0,
            milliseconds = 0,
          } = options;

          let newDate = dateTime;

          // Handle days
          if (modifier === 'add') {
            newDate = addDays(newDate, day);
          } else {
            newDate = addDays(newDate, -day);
          }

          // Handle months
          if (modifier === 'add') {
            newDate = addMonths(newDate, month);
          } else {
            newDate = addMonths(newDate, -month);
          }

          // Handle years
          if (modifier === 'add') {
            newDate = addYears(newDate, year);
          } else {
            newDate = addYears(newDate, -year);
          }

          // Handle hours
          if (modifier === 'add') {
            newDate = addHours(newDate, hours);
          } else {
            newDate = addHours(newDate, -hours);
          }

          // Handle minutes
          if (modifier === 'add') {
            newDate = addMinutes(newDate, minutes);
          } else {
            newDate = addMinutes(newDate, -minutes);
          }

          // Handle milliseconds
          if (modifier === 'add') {
            newDate = new Date(newDate.getTime() + milliseconds);
          } else {
            newDate = new Date(newDate.getTime() - milliseconds);
          }

          setDateTime(newDate);
        },
        todaysDate: () => {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          return today;
        },
        format,
        startOfMonth,
        getDaysInMonth,
        conditions: {
          isAfter: (date1, date2) => isAfter(date1, date2),
          isBefore: (date1, date2) => isBefore(date1, date2),
          isSameMonth: (date1, date2) => isSameMonth(date1, date2),
        },
        ...props,
      }}>
      {children}
    </DateTimeContext.Provider>
  );
}

export function useDateTime() {
  const context = useContext(DateTimeContext);
  if (context === undefined)
    throw new Error('useDateTime must be used within a DateTimeProvider');
  return context;
}

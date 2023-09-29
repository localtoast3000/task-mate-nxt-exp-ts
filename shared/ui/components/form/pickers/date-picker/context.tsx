import { createContext, useContext, useState, ReactNode } from 'react';
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

interface DateTimeContextProps {
  dateTime: Date;
  setDateTime: (newDateTime: Date) => void;
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
  startOfMonth: (date: Date) => Date;
  getDaysInMonth: (date: Date) => number;
  format: (date: Date, format: string, options?: {}) => string;
  conditions: {
    isAfter: (date1: Date, date2: Date) => boolean;
    isBefore: (date1: Date, date2: Date) => boolean;
    isSameMonth: (date1: Date, date2: Date) => boolean;
  };
}

const DateTimeContext = createContext<DateTimeContextProps | undefined>(undefined);

export function DateTimeContextProvider({ children }: { children: ReactNode }) {
  const [dateTime, setDateTime] = useState(new Date());

  return (
    <DateTimeContext.Provider
      value={{
        dateTime,
        setDateTime,
        updateDateTime(modifier, options) {
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
        format,
        startOfMonth,
        getDaysInMonth,
        conditions: {
          isAfter: (date: Date) => isAfter(dateTime, date),
          isBefore: (date: Date) => isBefore(dateTime, date),
          isSameMonth: (date: Date) => isSameMonth(dateTime, date),
        },
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

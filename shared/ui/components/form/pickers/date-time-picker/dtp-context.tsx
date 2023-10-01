import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
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
import { DateTimePickerProps, ViewTypes } from './types';

interface DateTimePickerContextProps extends DateTimePickerProps {
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

const DateTimeContext = createContext<DateTimePickerContextProps | undefined>(undefined);

export function DateTimePickerContextProvider({
  children,
  initialDate = new Date(),
  onChange = () => {},
  ...props
}: DateTimePickerProps) {
  const [dateTime, setDateTime] = useState(initialDate);
  const [view, setView] = useState<ViewTypes>('calendar');

  useEffect(() => {
    onChange(dateTime);
  }, [dateTime]);

  const updateDateTime = useCallback(
    (modifier: 'add' | 'sub', options: any) => {
      let newDate = dateTime;
      const operations = {
        day: addDays,
        month: addMonths,
        year: addYears,
        hours: addHours,
        minutes: addMinutes,
        milliseconds: (date: Date, value: number) =>
          new Date(date.getTime() + (modifier === 'add' ? value : -value)),
      };

      for (const [unit, operation] of Object.entries(operations)) {
        if (options[unit]) {
          newDate = operation(
            newDate,
            modifier === 'add' ? options[unit] : -options[unit]
          );
        }
      }

      setDateTime(newDate);
    },
    [dateTime]
  );

  const todaysDate = useCallback(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
  }, []);

  const contextValue = useMemo(
    () => ({
      dateTime,
      view,
      setDateTime,
      setView,
      updateDateTime,
      todaysDate,
      format,
      startOfMonth,
      getDaysInMonth,
      conditions: {
        isAfter: (date1: Date, date2: Date) => isAfter(date1, date2),
        isBefore: (date1: Date, date2: Date) => isBefore(date1, date2),
        isSameMonth: (date1: Date, date2: Date) => isSameMonth(date1, date2),
      },
      ...props,
    }),
    [dateTime, view, updateDateTime, todaysDate, props]
  );

  return (
    <DateTimeContext.Provider value={contextValue}>{children}</DateTimeContext.Provider>
  );
}

export function useDTPCxt() {
  const context = useContext(DateTimeContext);
  if (context === undefined)
    throw new Error('useDateTime must be used within a DateTimeProvider');
  return context;
}

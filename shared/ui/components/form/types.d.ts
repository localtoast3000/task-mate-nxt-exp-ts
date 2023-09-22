import { Props, FieldError, UseFormRegister } from 'react-hook-form';

export interface InputFieldProps extends Partial<HTMLInputElement> {
  wrapper?: boolean;
  register?: UseFormRegister;
  name: string;
  label?: string;
  type?: string;
  rules?: { [key: string]: any };
  controlled?: boolean;
  error?: FieldError;
}

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

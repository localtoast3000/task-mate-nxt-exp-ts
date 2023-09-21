import { useState } from 'react';
import { InputFieldProps, DateLib } from '../types';
import { DatePicker, DatePickerProps } from '../pickers/date-picker/exports';

export interface DateInputProps extends InputFieldProps {
  onChange: (date: string) => void;
  dateLib: DateLib;
  classNames?: {
    container?: string;
    error?: string;
  };
  picker: boolean;
  pickerProps: DatePickerProps;
}

export default function DateInput({
  register,
  name,
  rules,
  controlled,
  error,
  onChange,
  dateLib,
  classNames = {
    container: '',
    error: '',
  },
  picker,
  pickerProps,
  ...props
}: DateInputProps) {
  const [isOpen, setIsOpen] = useState(false);

  console.log(register);

  return (
    <div className='relative'>
      <input
        {...props}
        type='date'
        readOnly={picker ? true : false}
        value={dateLib.format(new Date(), 'yyyy-MM-dd')}
        onClick={() => (picker ? setIsOpen(!isOpen) : null)}
        {...register(name, rules)}
        className='border rounded px-3 py-2 focus:outline-none focus:border-blue-500'
      />
      <p
        className={`${classNames.error} text-error ${error?.message ? 'mt-[10px]' : ''}`}>
        {error?.message}
      </p>
      {picker && isOpen ? <DatePicker {...pickerProps} /> : <></>}
    </div>
  );
}

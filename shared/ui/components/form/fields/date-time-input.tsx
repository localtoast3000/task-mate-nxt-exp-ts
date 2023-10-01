import { useState, useEffect } from 'react';
import { InputFieldProps } from '../types';
import { DateTimePicker, DateTimePickerProps } from '../pickers/date-time-picker/exports';
import format from 'date-fns/format';

export interface DateTimeInputProps extends Partial<InputFieldProps> {
  onChange?: (date: Date) => void;
  onValueChange?: (val: any) => void;
  classNames?: {
    container?: string;
    error?: string;
  };
  picker: boolean;
  pickerProps: DateTimePickerProps;
}

export default function DateTimeInput({
  register,
  name,
  rules,
  controlled = true,
  error,
  onChange = () => {},
  onValueChange = () => {},
  classNames = {
    container: '',
    error: '',
  },
  picker,
  pickerProps,
  ...props
}: DateTimeInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState<Date>(
    props.defaultValue instanceof Date ? props.defaultValue : new Date()
  );

  useEffect(() => {
    onChange(value);
    onValueChange(value);
  }, [value]);

  return (
    <div className='relative'>
      <input
        type='date'
        value={value}
        {...register(name, rules)}
        className='hidden'
        {...props}
      />
      <div
        role='textbox'
        tabIndex={0}
        onClick={() => (picker ? setIsOpen(!isOpen) : null)}
        className='border cursor-pointer rounded px-3 py-2 focus:outline-none focus:border-blue-500'>
        {format(value, 'dd/MM/yyyy HH:mm')}
      </div>
      <p
        className={`${classNames.error} text-error ${error?.message ? 'mt-[10px]' : ''}`}>
        {error?.message}
      </p>
      {picker && isOpen ? (
        <DateTimePicker
          {...pickerProps}
          initialDate={value}
          onChange={(date) => setValue(date)}
        />
      ) : (
        <></>
      )}
    </div>
  );
}

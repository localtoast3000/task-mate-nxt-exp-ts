import { useState, useEffect } from 'react';
import { InputFieldProps } from '../types';
import { DatePicker, DatePickerProps } from '../pickers/date-picker/exports';
import format from 'date-fns/format';

export interface DateInputProps extends Partial<InputFieldProps> {
  onChange?: (date: Date) => void;
  onValueChange?: (val: any) => void;
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
}: DateInputProps) {
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
        {...props}
        type='date'
        readOnly={picker ? true : false}
        value={format(value, 'yyyy-MM-dd')}
        onClick={() => (picker ? setIsOpen(!isOpen) : null)}
        {...register(name, rules)}
        className='border rounded px-3 py-2 focus:outline-none focus:border-blue-500'
      />
      <p
        className={`${classNames.error} text-error ${error?.message ? 'mt-[10px]' : ''}`}>
        {error?.message}
      </p>
      {picker && isOpen ? (
        <DatePicker
          {...pickerProps}
          onChange={(date) => setValue(date)}
        />
      ) : (
        <></>
      )}
    </div>
  );
}

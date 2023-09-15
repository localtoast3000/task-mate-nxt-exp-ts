import { useState } from 'react';
import { DateInputProps } from './types';
import DatePicker from './date-picker';

export default function DateInput({ selectedDate, onChange, dateLib }: DateInputProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='relative'>
      <input
        type='text'
        readOnly
        value={dateLib.format(
          dateLib.parse(selectedDate, 'yyyy-MM-dd', new Date()),
          'yyyy-MM-dd'
        )}
        onClick={() => setIsOpen(!isOpen)}
        className='border rounded px-3 py-2 focus:outline-none focus:border-blue-500'
      />
      {isOpen && <DatePicker />}
    </div>
  );
}

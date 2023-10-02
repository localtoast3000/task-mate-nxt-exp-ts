import { useDTPCxt } from '../dtp-context';
import React, { useCallback } from 'react';

const HOURS = Array.from({ length: 24 }, (_, i) => i);
const MINUTES = Array.from({ length: 60 }, (_, i) => i);

export default function TimeView() {
  const { dateTime, setDateTime, setView } = useDTPCxt();

  const setHour = useCallback(
    (hour: number) => {
      const newDate = new Date(dateTime);
      newDate.setHours(hour);
      setDateTime(newDate);
    },
    [dateTime, setDateTime]
  );

  const setMinute = useCallback(
    (minute: number) => {
      const newDate = new Date(dateTime);
      newDate.setMinutes(minute);
      setDateTime(newDate);
      setView('calendar');
    },
    [dateTime, setDateTime, setView]
  );

  return (
    <div className='flex h-full overflow-scroll'>
      <TimeColumn
        values={HOURS}
        onClickValue={setHour}
        selectedValue={dateTime.getHours()}
      />
      <div className='border-r' />
      <TimeColumn
        values={MINUTES}
        onClickValue={setMinute}
        selectedValue={dateTime.getMinutes()}
      />
    </div>
  );
}

interface TimeColumnProps {
  values: number[];
  onClickValue: (value: number) => void;
  selectedValue: number;
}

const TimeColumn: React.FC<TimeColumnProps> = React.memo(
  ({ values, onClickValue, selectedValue }) => {
    return (
      <div className='flex-1 overflow-y-auto'>
        {values.map((value) => (
          <TimeButton
            key={value}
            value={value}
            onClickValue={onClickValue}
            isSelected={value === selectedValue}
          />
        ))}
      </div>
    );
  }
);

interface TimeButtonProps {
  value: number;
  onClickValue: (value: number) => void;
  isSelected: boolean;
}

const TimeButton: React.FC<TimeButtonProps> = React.memo(
  ({ value, onClickValue, isSelected }) => {
    return (
      <button
        className={`btn btn-ghost w-full text-center ${
          isSelected ? 'bg-blue-500 text-white' : ''
        }`}
        onClick={() => onClickValue(value)}>
        {value.toString().padStart(2, '0')}
      </button>
    );
  }
);

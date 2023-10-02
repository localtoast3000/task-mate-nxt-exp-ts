import { useDTPCxt } from '../dtp-context';
import React, { useCallback, useRef, useEffect } from 'react';

const HOURS = Array.from({ length: 24 }, (_, i) => i);
const MINUTES = Array.from({ length: 60 }, (_, i) => i);

export default function TimeView() {
  const { dateTime, setDateTime, setView } = useDTPCxt();

  const hourRef = useRef<HTMLButtonElement | null>(null);
  const minuteRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (hourRef.current) {
      hourRef.current.scrollIntoView({
        block: 'center',
      });
    }
    if (minuteRef.current) {
      minuteRef.current.scrollIntoView({
        block: 'center',
      });
    }
  }, []);

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
        refValue={hourRef}
      />
      <div className='border-r mx-[20px]' />
      <TimeColumn
        values={MINUTES}
        onClickValue={setMinute}
        selectedValue={dateTime.getMinutes()}
        refValue={minuteRef}
      />
    </div>
  );
}

interface TimeColumnProps {
  values: number[];
  onClickValue: (value: number) => void;
  selectedValue: number;
  refValue: React.RefObject<HTMLButtonElement>;
}

const TimeColumn: React.FC<TimeColumnProps> = React.memo(
  ({ values, onClickValue, selectedValue, refValue }) => {
    return (
      <div className='flex-1 overflow-y-auto'>
        {values.map((value) => (
          <TimeButton
            key={value}
            value={value}
            onClickValue={onClickValue}
            isSelected={value === selectedValue}
            ref={value === selectedValue ? refValue : null}
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

const TimeButton = React.forwardRef<HTMLButtonElement, TimeButtonProps>(
  ({ value, onClickValue, isSelected }, ref) => {
    return (
      <button
        ref={ref}
        type='button'
        className={`btn btn-ghost w-full text-center ${
          isSelected ? 'bg-primary hover:bg-primary hover:opacity-on-hover' : ''
        }`}
        onClick={() => {
          if (!isSelected) {
            onClickValue(value);
          }
        }}>
        {value.toString().padStart(2, '0')}
      </button>
    );
  }
);

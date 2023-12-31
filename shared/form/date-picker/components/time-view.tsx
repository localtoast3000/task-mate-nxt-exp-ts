import { useDPCxt } from '../dp-context';
import React, { useCallback, useRef, useEffect } from 'react';
import { TimeViewStyleProps } from '../types';
import { timeView as defaultStyles } from '../default-styles';

const HOURS = Array.from({ length: 24 }, (_, i) => i);
const MINUTES = Array.from({ length: 60 }, (_, i) => i);

export default function TimeView({ classNames = {}, styles = {} }: TimeViewStyleProps) {
  const { date, setDate, setView } = useDPCxt();

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
      const newDate = new Date(date);
      newDate.setHours(hour);
      setDate(newDate);
    },
    [date, setDate]
  );

  const setMinute = useCallback(
    (minute: number) => {
      const newDate = new Date(date);
      newDate.setMinutes(minute);
      setDate(newDate);
      setView('calendar');
    },
    [date, setDate, setView]
  );

  return (
    <div
      style={{
        ...defaultStyles.container,
        ...styles?.container,
      }}
      className={classNames?.container || ''}>
      <TimeColumn
        values={HOURS}
        onClickValue={setHour}
        selectedValue={date.getHours()}
        refValue={hourRef}
        styles={styles}
        classNames={classNames}
      />
      <div
        style={{ ...defaultStyles.divider, ...styles?.divider }}
        className={classNames?.divider || ''}
      />
      <TimeColumn
        values={MINUTES}
        onClickValue={setMinute}
        selectedValue={date.getMinutes()}
        refValue={minuteRef}
        styles={styles}
        classNames={classNames}
      />
    </div>
  );
}

interface TimeColumnProps extends TimeViewStyleProps {
  values: number[];
  onClickValue: (value: number) => void;
  selectedValue: number;
  refValue: React.RefObject<HTMLButtonElement>;
}

const TimeColumn: React.FC<TimeColumnProps> = React.memo(
  ({ values, onClickValue, selectedValue, refValue, styles, classNames }) => {
    return (
      <div
        style={{ ...defaultStyles.column, ...styles?.column }}
        className={classNames?.column || ''}>
        {values.map((value) => (
          <TimeButton
            key={value}
            value={value}
            onClickValue={onClickValue}
            isSelected={value === selectedValue}
            ref={value === selectedValue ? refValue : null}
            style={styles?.button}
            selectedStyle={styles?.selected}
            className={classNames?.button}
            selectedClassName={classNames?.selected}
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
  style?: React.CSSProperties;
  selectedStyle?: React.CSSProperties;
  className?: string;
  selectedClassName?: string;
}

const TimeButton = React.forwardRef<HTMLButtonElement, TimeButtonProps>(
  (
    {
      value,
      onClickValue,
      isSelected,
      style,
      selectedStyle,
      className,
      selectedClassName,
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type='button'
        style={{
          ...defaultStyles.button,
          ...(isSelected ? defaultStyles.selected : {}),
          ...style,
          ...(isSelected ? selectedStyle : {}),
        }}
        className={`${className || ''} ${isSelected ? selectedClassName || '' : ''}`}
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

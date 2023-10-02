import { useDTPCxt } from '../dtp-context';
import React, { useCallback, useRef, useEffect } from 'react';

const HOURS = Array.from({ length: 24 }, (_, i) => i);
const MINUTES = Array.from({ length: 60 }, (_, i) => i);

const defaultStyles = {
  container: {
    display: 'flex',
    height: '100%',
    overflow: 'scroll',
  },
  column: {
    flex: 1,
    overflowY: 'auto' as 'auto',
  },
  button: {
    width: '100%',
    textAlign: 'center' as 'center',
  },
  selected: {
    backgroundColor: '#3498db',
  },
  divider: {
    borderRight: '1px solid',
    margin: '0 20px',
  },
};

interface TimeViewProps {
  classNames?: {
    container?: string;
    column?: string;
    button?: string;
    disabled?: string;
    selected?: string;
    divider?: string;
  };
  styles?: {
    button?: React.CSSProperties;
    container?: React.CSSProperties;
    column?: React.CSSProperties;
    disabled?: React.CSSProperties;
    selected?: React.CSSProperties;
    divider?: React.CSSProperties;
  };
}

export default function TimeView({ classNames = {}, styles = {} }: TimeViewProps) {
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
    <div
      style={{ ...defaultStyles.container, ...styles.container }}
      className={classNames.container}>
      <TimeColumn
        values={HOURS}
        onClickValue={setHour}
        selectedValue={dateTime.getHours()}
        refValue={hourRef}
        styles={styles}
        classNames={classNames}
      />
      <div
        style={{ ...defaultStyles.divider, ...styles.divider }}
        className={classNames.divider}
      />
      <TimeColumn
        values={MINUTES}
        onClickValue={setMinute}
        selectedValue={dateTime.getMinutes()}
        refValue={minuteRef}
        styles={styles}
        classNames={classNames}
      />
    </div>
  );
}

interface TimeColumnProps {
  values: number[];
  onClickValue: (value: number) => void;
  selectedValue: number;
  refValue: React.RefObject<HTMLButtonElement>;
  styles?: typeof defaultStyles;
  classNames?: typeof defaultClassNames;
}

const TimeColumn: React.FC<TimeColumnProps> = React.memo(
  ({ values, onClickValue, selectedValue, refValue, styles, classNames }) => {
    return (
      <div
        style={{ ...defaultStyles.column, ...styles?.column }}
        className={classNames?.column}>
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
        style={
          isSelected
            ? { ...defaultStyles.button, ...style, ...selectedStyle }
            : { ...defaultStyles.button, ...style }
        }
        className={`${className} ${isSelected ? selectedClassName : ''}`}
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

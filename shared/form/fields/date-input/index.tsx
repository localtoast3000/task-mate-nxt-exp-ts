import { useState, useEffect, useRef, RefObject } from 'react';
import { InputFieldProps } from '../../types';
import {
  DatePicker,
  type DatePickerProps,
  DatePickerStyleProps,
} from '../../date-picker/exports';
import format from 'date-fns/format';
import { CSSProperties } from 'react';

const defaultStyles = {
  container: { position: 'relative' as 'relative' },
  input: { border: 'solid 1px', padding: '10px 20px', cursor: 'text' },
  error: { color: 'red', marginTop: 10 },
};

export interface DateInputProps extends Partial<InputFieldProps> {
  onChange?: (date: Date) => void;
  onValueChange?: (val: any) => void;
  dateFormat?: string;
  initialDate: Date;
  styles?: {
    container?: CSSProperties;
    input: CSSProperties;
    error?: CSSProperties;
    dtpClassNames?: DatePickerStyleProps['styles'];
  };
  classNames?: {
    container?: string;
    input?: string;
    error?: string;
    dtpClassNames?: DatePickerStyleProps['classNames'];
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
  dateFormat,
  styles = {
    container: {},
    input: {},
    error: {},
    dtpClassNames: {},
  },
  classNames = {
    container: '',
    error: '',
    dtpClassNames: {},
  },
  picker,
  initialDate = new Date(),
  pickerProps,
  ...props
}: DateInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState<Date>(initialDate);

  function handleClickOutside(event: MouseEvent) {
    if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  }

  useEffect(() => {
    if (picker) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [containerRef]);

  useEffect(() => {
    onChange(value);
    onValueChange(value);
  }, [value]);

  return (
    <div
      ref={containerRef}
      style={{ ...defaultStyles.container, ...styles.container }}>
      <input
        type='date'
        style={{
          ...(picker ? { display: 'none' } : {}),
        }}
        value={value}
        {...register(name, rules)}
        {...props}
      />
      {!picker ? (
        <ErrorMessage
          className={classNames?.error}
          style={styles?.error}
          message={error?.message}
        />
      ) : (
        <></>
      )}
      {picker ? (
        <>
          <div
            role='textbox'
            tabIndex={0}
            onClick={() => setIsOpen(!isOpen)}
            style={{ ...defaultStyles.input, ...styles?.input }}>
            {dateFormat ? format(value, dateFormat) : format(value, 'dd/MM/yyyy')}
          </div>
          <ErrorMessage
            className={classNames?.error}
            style={styles?.error}
            message={error?.message}
          />
          {isOpen ? (
            <DatePicker
              {...pickerProps}
              initialDate={initialDate}
              onChange={(date) => {
                setValue(date);
                if (
                  pickerProps.views.includes('time') &&
                  date.getMinutes() !== value.getMinutes()
                ) {
                  setIsOpen(false);
                }
              }}
            />
          ) : (
            <></>
          )}
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

interface ErrorMessageProps {
  className?: string;
  style?: CSSProperties;
  message: string | undefined;
}

function ErrorMessage({ className, style, message }: ErrorMessageProps) {
  return (
    <p
      className={className}
      style={{
        ...(!message ? { display: 'hidden' } : {}),
        ...defaultStyles.error,
        ...style,
      }}>
      {message}
    </p>
  );
}

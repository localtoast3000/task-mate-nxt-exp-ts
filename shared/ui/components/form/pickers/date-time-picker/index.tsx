import { Header, CalendarView, YearView, TimeView } from './components/exports';
import { DateTimePickerProps, DateTimePickerStyleProps } from './types';
import { DateTimePickerContextProvider, useDTPCxt } from './dtp-context';
import { dateTimePicker as defaultStyles } from './default-styles';

export default function DateTimePicker({
  onChange = () => {},
  styles,
  classNames,
  ...props
}: DateTimePickerProps & DateTimePickerStyleProps) {
  return (
    <DateTimePickerContextProvider
      {...props}
      onChange={(date) => onChange(date)}>
      <DateTimePickerComponent
        styles={styles}
        classNames={classNames}
      />
    </DateTimePickerContextProvider>
  );
}

function DateTimePickerComponent({ styles, classNames }: DateTimePickerStyleProps) {
  const { view } = useDTPCxt();

  return (
    <div
      style={{
        ...defaultStyles.container,
        ...styles?.container,
      }}
      className={classNames?.container}>
      <Header
        styles={styles?.header}
        classNames={classNames?.header}
      />
      <div
        style={{
          ...defaultStyles.viewContainer,
          ...styles?.viewContainer,
        }}
        className={classNames?.viewContainer}>
        {view === 'calendar' ? (
          <CalendarView
            styles={styles?.calendarView}
            classNames={classNames?.calendarView}
          />
        ) : view === 'year' ? (
          <YearView
            styles={styles?.yearView}
            classNames={classNames?.yearView}
          />
        ) : view === 'time' ? (
          <TimeView
            styles={styles?.timeView}
            classNames={classNames?.timeView}
          />
        ) : (
          <CalendarView
            styles={styles?.calendarView}
            classNames={classNames?.calendarView}
          />
        )}
      </div>
    </div>
  );
}

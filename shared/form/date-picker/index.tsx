import { Header, CalendarView, YearView, TimeView } from './components/exports';
import { DatePickerProps, DatePickerStyleProps } from './types';
import { DatePickerContextProvider, useDPCxt } from './dp-context';
import { datePicker as defaultStyles } from './default-styles';

export default function DatePicker({
  onChange = () => {},
  styles,
  classNames,
  ...props
}: DatePickerProps & DatePickerStyleProps) {
  return (
    <DatePickerContextProvider
      {...props}
      onChange={(date) => onChange(date)}>
      <DatePickerComponent
        styles={styles}
        classNames={classNames}
      />
    </DatePickerContextProvider>
  );
}

function DatePickerComponent({ styles, classNames }: DatePickerStyleProps) {
  const { view } = useDPCxt();

  // Mapping of views to their respective components
  const viewComponents = {
    calendar: CalendarView,
    year: YearView,
    time: TimeView,
  };

  const viewStyles = {
    calendar: { styles: styles?.calendarView, classNames: classNames?.calendarView },
    year: { styles: styles?.yearView, classNames: classNames?.yearView },
    time: { styles: styles?.timeView, classNames: classNames?.timeView },
  };

  // Get the current view component based on the `view` prop
  const CurrentViewComponent = viewComponents[view] || CalendarView;

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
        <CurrentViewComponent
          styles={viewStyles[view]?.styles}
          classNames={viewStyles[view]?.classNames}
        />
      </div>
    </div>
  );
}

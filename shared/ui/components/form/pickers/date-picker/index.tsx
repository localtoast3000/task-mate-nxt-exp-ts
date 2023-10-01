import { Header, CalendarView, YearView, TimeView } from './components/exports';
import { DatePickerContextProps } from './types';
import { DateTimeContextProvider, useDateTime } from './context';

export default function DatePicker({
  onChange = () => {},
  ...props
}: DatePickerContextProps) {
  return (
    <DateTimeContextProvider
      {...props}
      onChange={(date) => onChange(date)}>
      <PickerComponent />
    </DateTimeContextProvider>
  );
}

function PickerComponent() {
  const { view } = useDateTime();

  return (
    <div className='absolute z-10 mt-2 border rounded w-72 p-4'>
      <Header />
      {view === 'calendar' ? (
        <CalendarView />
      ) : view === 'year' ? (
        <YearView />
      ) : view === 'time' ? (
        <TimeView />
      ) : (
        <CalendarView />
      )}
    </div>
  );
}

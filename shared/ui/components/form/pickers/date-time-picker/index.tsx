import { Header, CalendarView, YearView, TimeView } from './components/exports';
import { DateTimePickerProps } from './types';
import { DateTimePickerContextProvider, useDTPCxt } from './dtp-context';

export default function DateTimePicker({
  onChange = () => {},
  ...props
}: DateTimePickerProps) {
  return (
    <DateTimePickerContextProvider
      {...props}
      onChange={(date) => onChange(date)}>
      <DateTimePickerComponent />
    </DateTimePickerContextProvider>
  );
}

function DateTimePickerComponent() {
  const { view } = useDTPCxt();

  return (
    <div className='absolute z-10 mt-2 border rounded w-72 p-4 bg-black'>
      <Header />
      <div className='w-full h-[350px] overflow-hidden'>
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
    </div>
  );
}

import { useDTPCxt } from '../dtp-context';
import { ViewTypes } from '../types'; // Assuming you have this import

export default function Header() {
  const context = useDTPCxt();

  return (
    <div className='grid grid-rows-2 grid-cols-2 w-full pb-[20px]'>
      <YearButton
        view={context.view}
        dateTime={context.dateTime}
        setView={context.setView}
      />
      <TimeButton
        dateTime={context.dateTime}
        view={context.view}
        setView={context.setView}
        format={context.format}
      />
      <MonthButton
        view={context.view}
        dateTime={context.dateTime}
        setView={context.setView}
        format={context.format}
      />
      <CalendarNavButtons {...context} />
    </div>
  );
}

interface YearButtonProps {
  dateTime: Date;
  view: ViewTypes;
  setView: (view: ViewTypes) => void;
}

const YearButton: React.FC<YearButtonProps> = ({ dateTime, setView, view }) => {
  return (
    <button
      type='button'
      className={`btn btn-ghost btn-sm flex items-center justify-self-start ${
        view === 'year' ? '' : 'text-neutral'
      }`}
      onClick={() => setView('year')}>
      <span>{dateTime.getFullYear()}</span>
    </button>
  );
};

interface TimeButtonProps {
  dateTime: Date;
  view: ViewTypes;
  setView: (view: ViewTypes) => void;
  format: (date: Date, format: string, options?: {}) => string;
}

const TimeButton: React.FC<TimeButtonProps> = ({ dateTime, view, setView, format }) => {
  return (
    <button
      type='button'
      onClick={() => setView('time')}
      className={`btn btn-ghost justify-self-end ${
        view === 'time' ? '' : 'text-neutral'
      } ${
        view === 'calendar' ? 'row-span-1 btn-sm' : 'row-span-2 self-end text-[1.5rem]'
      }`}>
      {format(dateTime, 'HH:mm')}
    </button>
  );
};

interface MonthButtonProps {
  dateTime: Date;
  view: ViewTypes;
  setView: (view: ViewTypes) => void;
  format: (date: Date, format: string, options?: {}) => string;
}

const MonthButton: React.FC<MonthButtonProps> = ({ dateTime, setView, format, view }) => {
  return (
    <button
      type='button'
      className={`btn btn-ghost btn-sm flex items-center justify-self-start ${
        view === 'calendar' ? '' : 'text-neutral'
      }`}
      onClick={() => setView('calendar')}>
      <span>{format(dateTime, 'MMMM')}</span>
    </button>
  );
};

interface CalendarNavButtonProps {
  dateTime: Date;
  minDate?: Date;
  maxDate?: Date;
  conditions: {
    isBefore: (date1: Date, date2: Date) => boolean;
    isAfter: (date1: Date, date2: Date) => boolean;
  };
  view: ViewTypes;
  todaysDate: () => Date;
  updateDateTime: (
    modifier: 'add' | 'sub',
    options: {
      month?: number;
    }
  ) => void;
}

const CalendarNavButtons: React.FC<CalendarNavButtonProps> = ({
  dateTime,
  minDate,
  maxDate,
  conditions,
  view,
  todaysDate,
  updateDateTime,
}) => {
  const previousMonth = new Date(dateTime.getFullYear(), dateTime.getMonth() - 1, 1);
  const nextMonth = new Date(dateTime.getFullYear(), dateTime.getMonth() + 1, 1);
  const currentMonth = new Date(todaysDate().getFullYear(), todaysDate().getMonth(), 1);

  const disablePrev =
    (minDate && conditions.isBefore(previousMonth, minDate)) ||
    conditions.isBefore(previousMonth, currentMonth);

  const disableNext = maxDate && conditions.isAfter(nextMonth, maxDate);

  return (
    <div
      className={`flex justify-center gap-[5px] ${
        view === 'calendar' ? 'flex' : 'hidden'
      } justify-self-end`}>
      <CalendarNavButton
        disabled={disablePrev}
        onClick={() => !disablePrev && updateDateTime('sub', { month: 1 })}
        points='10,0 0,5 10,10'
      />
      <CalendarNavButton
        disabled={disableNext}
        onClick={() => !disableNext && updateDateTime('add', { month: 1 })}
        points='0,0 10,5 0,10'
      />
    </div>
  );
};

interface NavButtonProps {
  disabled?: boolean;
  onClick: () => void;
  points: string;
}

const CalendarNavButton: React.FC<NavButtonProps> = ({ disabled, onClick, points }) => {
  return (
    <button
      type='button'
      className={`btn btn-ghost btn-sm ${
        disabled ? 'opacity-[0.4] no-animation hover:bg-transparent cursor-default' : ''
      }`}
      onClick={onClick}>
      <svg
        height='10'
        width='10'
        className='fill-base-content'>
        <polygon points={points} />
      </svg>
    </button>
  );
};

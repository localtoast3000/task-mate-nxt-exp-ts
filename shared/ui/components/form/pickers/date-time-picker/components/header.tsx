import { useDTPCxt } from '../dtp-context';

export default function Header() {
  const {
    dateTime,
    updateDateTime,
    format,
    minDate,
    maxDate,
    todaysDate,
    conditions,
    view,
    setView,
  } = useDTPCxt();

  const previousMonth = new Date(dateTime.getFullYear(), dateTime.getMonth() - 1, 1);
  const nextMonth = new Date(dateTime.getFullYear(), dateTime.getMonth() + 1, 1);
  const currentMonth = new Date(todaysDate().getFullYear(), todaysDate().getMonth(), 1);

  const disablePrev =
    (minDate && conditions.isBefore(previousMonth, minDate)) ||
    conditions.isBefore(previousMonth, currentMonth);

  const disableNext = maxDate && conditions.isAfter(nextMonth, maxDate);

  return (
    <div className='flex justify-between pb-[20px]'>
      <div className='flex gap-[5px]'>
        <button
          onClick={() => {
            view !== 'year' ? setView('year') : setView('calendar');
          }}
          className='flex items-center'>
          <span className='mr-2'>{format(dateTime, 'MMMM')}</span>
          <span>{dateTime.getFullYear()}</span>
        </button>
        <button
          onClick={() => {
            view !== 'time' ? setView('time') : setView('calendar');
          }}
          className='btn btn-ghost'>
          {format(dateTime, 'HH:mm')}
        </button>
      </div>

      <div className='flex gap-[5px]'>
        <button
          className={`btn btn-ghost btn-sm ${
            disablePrev
              ? 'opacity-[0.4] no-animation hover:bg-transparent cursor-default'
              : ''
          }`}
          onClick={() => !disablePrev && updateDateTime('sub', { month: 1 })}>
          <svg
            height='10'
            width='10'
            className='fill-base-content'>
            <polygon points='10,0 0,5 10,10' />
          </svg>
        </button>
        <button
          className={`btn btn-ghost btn-sm ${
            disableNext
              ? 'opacity-[0.4] no-animation hover:bg-transparent cursor-default'
              : ''
          }`}
          onClick={() => !disableNext && updateDateTime('add', { month: 1 })}>
          <svg
            height='10'
            width='10'
            className='fill-base-content'>
            <polygon points='0,0 10,5 0,10' />
          </svg>
        </button>
      </div>
    </div>
  );
}

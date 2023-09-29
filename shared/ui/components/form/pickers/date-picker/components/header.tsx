import { HeaderProps } from '../types';
import { useDateTime } from '../context';

export default function Header({
  displayedMonth,
  setDisplayedMonth,
  disablePrev,
  disableNext,
  showYearGrid,
  setShowYearGrid,
}: HeaderProps) {
  const { dateTime, updateDateTime, format } = useDateTime();
  const toggleYearGrid = () => {
    setShowYearGrid(!showYearGrid);
  };

  return (
    <div className='flex justify-between pb-[20px]'>
      <button
        onClick={toggleYearGrid}
        className='flex items-center'>
        <span className='mr-2'>{format(displayedMonth, 'MMMM')}</span>
        <span>{dateTime.getFullYear()}</span>
      </button>

      <div className='flex gap-[5px]'>
        <button
          className={`btn btn-ghost btn-sm ${
            disablePrev
              ? 'opacity-[0.4] no-animation hover:bg-transparent cursor-default'
              : ''
          }`}
          onClick={() => !disablePrev && updateDateTime('add', { month: 1 })}>
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
          onClick={() => !disableNext && updateDateTime('sub', { month: 1 })}>
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

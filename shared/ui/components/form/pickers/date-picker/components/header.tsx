import { HeaderProps } from '../../../fields/date-input/types';

export default function Header({
  displayedMonth,
  setDisplayedMonth,
  disablePrev,
  disableNext,
  dateLib,
  showYearGrid,
  setShowYearGrid,
}: HeaderProps) {
  const toggleYearGrid = () => {
    setShowYearGrid(!showYearGrid);
  };

  return (
    <div className='flex justify-between pb-[20px]'>
      <button
        onClick={toggleYearGrid}
        className='flex items-center'>
        <span className='mr-2'>{dateLib.format(displayedMonth, 'MMMM')}</span>
        <span>{displayedMonth.getFullYear()}</span>
      </button>

      <div className='flex gap-[5px]'>
        <button
          className={`btn btn-ghost btn-sm ${
            disablePrev
              ? 'opacity-[0.4] no-animation hover:bg-transparent cursor-default'
              : ''
          }`}
          onClick={() => {
            if (!disablePrev) {
              setDisplayedMonth(dateLib.subMonths(displayedMonth, 1));
            }
          }}>
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
          onClick={() => {
            if (!disableNext) {
              setDisplayedMonth(dateLib.addMonths(displayedMonth, 1));
            }
          }}>
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

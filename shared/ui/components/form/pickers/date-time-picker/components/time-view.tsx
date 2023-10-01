import { useDTPCxt } from '../dtp-context';

export default function TimeView() {
  const { dateTime, setDateTime, setView } = useDTPCxt();

  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = Array.from({ length: 60 }, (_, i) => i);

  return (
    <div className='flex'>
      <div className='flex-1 overflow-y-auto border-r'>
        {hours.map((hour) => (
          <button
            key={hour}
            className='btn btn-ghost w-full text-center'
            onClick={() => {
              const newDate = new Date(dateTime);
              newDate.setHours(hour);
              setDateTime(new Date(newDate));
              setView('calendar');
            }}>
            {hour.toString().padStart(2, '0')}
          </button>
        ))}
      </div>
      <div className='flex-1 overflow-y-auto'>
        {minutes.map((minute) => (
          <button
            key={minute}
            className='btn btn-ghost w-full text-center'
            onClick={() => {
              const newDate = new Date(dateTime);
              newDate.setMinutes(minute);
              setDateTime(new Date(newDate));
              setView('calendar');
            }}>
            {minute.toString().padStart(2, '0')}
          </button>
        ))}
      </div>
    </div>
  );
}

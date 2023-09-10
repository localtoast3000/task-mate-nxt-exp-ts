import React, { useState } from 'react';

const formatDate = (date: Date) => {
  return date.toISOString().substr(0, 10);
};

const formatTime = (date: Date) => {
  return `${date.getHours().toString().padStart(2, '0')}:${date
    .getMinutes()
    .toString()
    .padStart(2, '0')}`;
};

export default function DateTimePicker() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [inputDate, setInputDate] = useState(formatDate(currentDate));
  const [inputTime, setInputTime] = useState(formatTime(currentDate));

  const incrementDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 1);
    setCurrentDate(newDate);
    setInputDate(formatDate(newDate));
  };

  const decrementDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 1);
    setCurrentDate(newDate);
    setInputDate(formatDate(newDate));
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputDate(e.target.value);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputTime(e.target.value);
  };

  return (
    <div className='flex flex-col items-center justify-center space-y-4'>
      <div className='flex space-x-4'>
        <button
          onClick={decrementDay}
          className='px-4 py-2 bg-blue-500 text-white rounded'>
          Previous
        </button>
        <input
          type='text'
          value={inputDate}
          onChange={handleDateChange}
          className='border p-2 rounded'
        />
        <button
          onClick={incrementDay}
          className='px-4 py-2 bg-blue-500 text-white rounded'>
          Next
        </button>
      </div>
      <input
        type='text'
        value={inputTime}
        onChange={handleTimeChange}
        className='border p-2 rounded'
      />
    </div>
  );
}

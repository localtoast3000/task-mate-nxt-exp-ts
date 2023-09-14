import React, { useState } from 'react';
import {
  DatePickerProps,
  HeaderProps,
  DayNamesProps,
  DaysProps,
  YearPickerProps,
} from './date-types';

export default function DatePicker({
  selectedDate,
  onChange,
  dateLib,
  disablePastDates = false,
  startWeekOnMonday = false,
  minDate,
  maxDate,
  yearRange,
}: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [displayedMonth, setDisplayedMonth] = useState(dateLib.startOfMonth(new Date()));
  const [showYearGrid, setShowYearGrid] = useState(false);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const daysOfWeek = startWeekOnMonday
    ? ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']
    : ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  const disablePrev =
    (disablePastDates && dateLib.isSameMonth(displayedMonth, today)) ||
    (minDate && dateLib.isBefore(displayedMonth, minDate));
  const disableNext = maxDate && dateLib.isAfter(displayedMonth, maxDate);

  const customYearRange = yearRange
    ? Array.from({ length: yearRange[1] - yearRange[0] + 1 }, (_, i) => i + yearRange[0])
    : Array.from({ length: 41 }, (_, i) => i + 1990); // Default if yearRange is not provided

  return (
    <div className='relative'>
      <input
        type='text'
        readOnly
        value={dateLib.format(
          dateLib.parse(selectedDate, 'yyyy-MM-dd', new Date()),
          'yyyy-MM-dd'
        )}
        onClick={() => setIsOpen(!isOpen)}
        className='border rounded px-3 py-2 focus:outline-none focus:border-blue-500'
      />
      {isOpen && (
        <div className='absolute z-10 mt-2 border rounded w-72 p-4'>
          <Header
            displayedMonth={displayedMonth}
            setDisplayedMonth={setDisplayedMonth}
            disablePrev={disablePrev}
            disableNext={disableNext}
            dateLib={dateLib}
            yearRange={customYearRange}
            showYearGrid={showYearGrid}
            setShowYearGrid={setShowYearGrid}
          />

          {showYearGrid ? (
            <YearPicker
              displayedMonth={displayedMonth}
              setDisplayedMonth={setDisplayedMonth}
              yearRange={customYearRange}
              setShowYearGrid={setShowYearGrid}
            />
          ) : (
            <div className='grid grid-cols-7 gap-1 items-center justify-center'>
              <DayNames daysOfWeek={daysOfWeek} />
              <Days
                displayedMonth={displayedMonth}
                onChange={onChange}
                disablePastDates={disablePastDates}
                minDate={minDate}
                maxDate={maxDate}
                dateLib={dateLib}
                today={today}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function Header({
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

function DayNames({ daysOfWeek }: DayNamesProps) {
  return (
    <>
      {daysOfWeek.map((d, index) => (
        <div
          key={index}
          className='w-full h-10 text-center'>
          <p>{d}</p>
        </div>
      ))}
    </>
  );
}

function Days({
  displayedMonth,
  onChange,
  disablePastDates,
  minDate,
  maxDate,
  dateLib,
  today,
}: DaysProps) {
  const daysInMonth = dateLib.getDaysInMonth(displayedMonth);
  const firstDayOfMonth = dateLib.startOfMonth(displayedMonth).getDay();
  const totalDays = 42; // 6 weeks * 7 days
  const numberOfEmptyDays = totalDays - daysInMonth - firstDayOfMonth;

  return (
    <>
      {Array.from({ length: firstDayOfMonth }, (_, i) => i).map((_, index) => (
        <div
          key={index}
          className='w-full h-10'
        />
      ))}
      {Array.from({ length: daysInMonth }, (_, index) => index + 1).map((day) => {
        const thisDay = new Date(
          displayedMonth.getFullYear(),
          displayedMonth.getMonth(),
          day
        );
        thisDay.setHours(0, 0, 0, 0);
        const isPast = disablePastDates && dateLib.isBefore(thisDay, today);
        const isBeforeMin = minDate && dateLib.isBefore(thisDay, minDate);
        const isAfterMax = maxDate && dateLib.isAfter(thisDay, maxDate);
        const isDisabled = isPast || isBeforeMin || isAfterMax;

        return (
          <button
            key={day}
            className={`w-full btn-ghost h-10 text-center ${
              isDisabled
                ? 'opacity-[0.4] no-animation hover:bg-transparent cursor-default'
                : ''
            } btn`}
            onClick={() => {
              if (!isDisabled) {
                onChange(dateLib.format(thisDay, 'yyyy-MM-dd'));
              }
            }}>
            <p>{day}</p>
          </button>
        );
      })}
      {Array.from({ length: numberOfEmptyDays }, (_, i) => i).map((_, index) => (
        <div
          key={index}
          className='w-full h-10'
        />
      ))}
    </>
  );
}

function YearPicker({
  displayedMonth,
  setDisplayedMonth,
  yearRange,
  setShowYearGrid,
}: YearPickerProps) {
  return (
    <div className='grid gap-[3px] grid-cols-[calc(100%/4-3px)_calc(100%/4-1.3px)_calc(100%/4-3px)_calc(100%/4-3px)] w-full max-h-[280px] overflow-y-auto'>
      {yearRange.map((year) => (
        <button
          key={year}
          className='btn btn-ghost'
          onClick={() => {
            const newDate = new Date(displayedMonth);
            newDate.setFullYear(year);
            setDisplayedMonth(new Date(newDate));
            setShowYearGrid(false);
          }}>
          {year}
        </button>
      ))}
    </div>
  );
}

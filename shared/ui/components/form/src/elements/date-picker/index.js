import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { useRef, useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material';
import { overides } from '../../util/mui-overide-fns';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import styles from './date-picker.module.css';
import cssModule from '../../form.module.css';

export default function DatePicker({
  register,
  name,
  onChange = () => {},
  onValueChange = () => {},
  rules = {},
  controlled = true,
  disabledDates = [],
  errorTop = false,
  defaultValue = new Date(),
  error,
  fontFamily = 'monospace',
  yearButtonStyles = {},
  dayButtonStyles = {},
  yearButtonHoverStyles = {},
  dayButtonHoverStyles = {},
  yearContentBottomPadding = '10px',
  bottomMargin = '20px',
  yearContainerHeight = '200px',
  light = false,
  textSizeOverides = {
    header: '',
    weekdayLabel: '',
    yearButton: '',
    day: '',
  },
  colorOverides = {
    weekdayLabel: '#585858',

    dayText: '#000000',
    dayHoverText: '#000000',
    daySelectedText: '#ffffff',
    dayDisabledText: '#a7a7a7',
    dayDisabledBackground: 'transparent',
    dayBackground: 'transparent',
    dayHoverBackground: '#ffffff',
    daySelectedBackground: '#000000',
    dayTodayRing: '#000000',

    yearText: '#000000',
    yearHoverText: '#000000',
    yearSelectedText: '#ffffff',
    yearDisabledText: '#a7a7a7',
    yearDisabledBackground: 'transparent',
    yearBackground: 'transparent',
    yearHoverBackground: '#ffffff',
    yearSelectedBackground: '#000000',

    switchViewBackground: 'transparent',
    switchViewHoverBackground: 'transparent',
    switchViewArrow: '#000000',
    switchViewArrowDisabled: '#a7a7a7',

    monthYearDisplay: '#000000',
    monthYearDisplayHover: '#000000',

    monthSelectorArrowHover: 'transparent',
    monthSelectorLeftArrow: '#000000',
    monthSelectorRightArrow: '#000000',
    monthSelectorLeftArrowDisabled: '#a7a7a7',
    monthSelectorRightArrowDisabled: '#a7a7a7',
  },
  classNames = {
    container: '',
    input: '',
    label: '',
    error: '',
  },
}) {
  const [value, setValue] = useState(defaultValue);
  const wrapperRef = useRef();

  useEffect(() => {
    if (!value) return;
    onChange(value);
    onValueChange(value);
  }, [value]);

  useEffect(() => {
    const interval = setInterval(() => {
      overides(wrapperRef.current, {
        '.MuiDateCalendar-root': {
          style: {
            position: 'relative',
            backgroundColor: 'transparent',
            width: '100%',
            maxWidth: '300px',
            marginBottom: bottomMargin,
          },
          className: styles.mainContainer,
        },
        '.MuiDateCalendar-root > div': {
          style: {
            width: '100%',
            maxHeight: yearContainerHeight,
          },
          className: styles.mainContainer,
        },
        '.MuiPickersCalendarHeader-root': {
          style: {
            width: '100%',
          },
        },
        '.MuiPickersFadeTransitionGroup-root': {
          style: {
            width: '100%',
          },
        },
        '.MuiPickersFadeTransitionGroup-root > div': {
          style: {
            width: '100%',
          },
        },
        '.MuiPickersFadeTransitionGroup-root > div > div': {
          style: {
            width: '100%',
          },
        },
        '.MuiDayCalendar-header': {
          style: {
            width: '100%',
          },
        },
        '.MuiYearCalendar-root': {
          style: {
            width: '100%',
            paddingBottom: yearContentBottomPadding,
          },
        },
        '.MuiPickersSlideTransition-root': {
          style: {
            width: '100%',
          },
        },
        '.MuiDayCalendar-weekContainer': {
          style: {
            width: '100%',
          },
        },
        '.MuiDayCalendar-monthContainer': {
          style: {
            width: '100%',
          },
        },

        '.MuiDayCalendar-weekDayLabel': {
          style: {
            width: '100%',
            fontFamily: fontFamily,
            color: colorOverides.weekdayLabel,
            fontSize: textSizeOverides.weekdayLabel,
          },
        },

        '.MuiPickersDay-root': {
          style: {
            backgroundColor: colorOverides.dayBackground,
            color: colorOverides.dayText,
            opacity: 0.9,
            fontFamily: fontFamily,
            fontSize: textSizeOverides.day,
            ...dayButtonStyles,
          },
        },
        '.MuiPickersDay-today.MuiPickersDay-root': {
          style: {
            borderColor: colorOverides.dayTodayRing,
          },
        },
        '.Mui-selected.MuiPickersDay-today.MuiPickersDay-root': {
          style: {
            borderColor: 'transparent',
          },
        },
        '.MuiPickersDay-root:hover': {
          style: {
            backgroundColor: colorOverides.dayHoverBackground,
            color: colorOverides.dayHoverText,
            ...dayButtonHoverStyles,
          },
        },
        '.Mui-selected.MuiPickersDay-root:not(.MuiPickersDay-hiddenDaySpacingFiller)': {
          style: {
            backgroundColor: colorOverides.daySelectedBackground,
            color: colorOverides.daySelectedText,
            opacity: 1,
          },
        },
        '.Mui-disabled.MuiPickersDay-root': {
          style: {
            backgroundColor: colorOverides.dayDisabledBackground,
            color: colorOverides.dayDisabledText,
            opacity: 1,
          },
        },

        '.MuiPickersYear-yearButton': {
          style: {
            backgroundColor: colorOverides.yearBackground,
            color: colorOverides.yearText,
            opacity: 0.9,
            fontFamily: fontFamily,
            fontSize: textSizeOverides.yearButton,
            ...yearButtonStyles,
          },
        },
        '.MuiPickersYear-yearButton:hover': {
          style: {
            backgroundColor: colorOverides.yearHoverBackground,
            color: colorOverides.yearHoverText,
            ...yearButtonHoverStyles,
          },
        },
        '.Mui-selected.MuiPickersYear-yearButton': {
          style: {
            backgroundColor: colorOverides.yearSelectedBackground,
            color: colorOverides.yearSelectedText,
            opacity: 1,
          },
        },
        '.Mui-disabled.MuiPickersYear-yearButton': {
          style: {
            backgroundColor: colorOverides.yearDisabledBackground,
            color: colorOverides.yearDisabledText,
            opacity: 1,
          },
        },

        '.MuiPickersCalendarHeader-label': {
          style: {
            color: colorOverides.monthYearDisplay,
            opacity: 0.7,
            fontFamily: fontFamily,
            transition: 'opacity 0.2s ease-in',
            fontSize: textSizeOverides.header,
          },
        },
        '.MuiPickersCalendarHeader-label:hover': {
          style: {
            color: colorOverides.monthYearDisplayHover,
            opacity: 1,
          },
        },
        '.MuiPickersCalendarHeader-switchViewButton': {
          style: {
            backgroundColor: colorOverides.switchViewBackground,
            opacity: 0.6,
            transition: 'opacity 0.2s ease-in',
          },
        },
        '.MuiPickersCalendarHeader-switchViewButton:hover': {
          style: {
            backgroundColor: colorOverides.switchViewHoverBackground,
            opacity: '1',
          },
        },
        '.MuiPickersCalendarHeader-switchViewIcon': {
          style: {
            fill: colorOverides.switchViewArrow,
          },
        },
        '.MuiSvgIcon-root[data-testid=ArrowLeftIcon]': {
          style: {
            fill: colorOverides.monthSelectorLeftArrow,
          },
        },
        '.MuiSvgIcon-root[data-testid=ArrowRightIcon]': {
          style: {
            fill: colorOverides.monthSelectorRightArrow,
          },
        },
        '.MuiPickersArrowSwitcher-button': {
          style: {
            opacity: '0.6',
            transition: 'opacity 0.2s ease-in',
          },
        },
        '.MuiPickersArrowSwitcher-button:hover': {
          style: {
            backgroundColor: colorOverides.monthSelectorArrowHover,
            opacity: '1',
          },
        },
        '.Mui-disabled .MuiSvgIcon-root[data-testid=ArrowLeftIcon]': {
          style: {
            fill: colorOverides.monthSelectorLeftArrowDisabled,
          },
        },
        '.Mui-disabled .MuiSvgIcon-root[data-testid=ArrowRightIcon]': {
          style: {
            fill: colorOverides.monthSelectorRightArrowDisabled,
          },
        },
        '.Mui-disabled .MuiPickersCalendarHeader-switchViewIcon': {
          style: {
            fill: colorOverides.switchViewArrowDisabled,
          },
        },
      });
    }, 0);
    return () => clearInterval(interval);
  }, []);

  const shouldDisableDate = (date) => {
    return disabledDates.some((disabledDate) =>
      isSameDay(new Date(disabledDate), new Date(date))
    );
  };

  const isSameDay = (dateA, dateB) =>
    dateA.getDate() === dateB.getDate() &&
    dateA.getMonth() === dateB.getMonth() &&
    dateA.getFullYear() === dateB.getFullYear();

  return (
    <ThemeProvider
      theme={createTheme({
        palette: {
          primary: {
            main: colorOverides.daySelectedBackground,
          },
        },
      })}>
      <div className='w-full'>
        {errorTop && (
          <p
            className={`${classNames.error} ${
              light ? cssModule.errorLight : cssModule.error
            }`}>
            {error?.message}
          </p>
        )}
        <input
          {...register(name, rules)}
          type='date'
          value={value ? format(value, 'yyyy-MM-dd') : value}
          className='hidden'
        />
        <div
          className='w-full'
          ref={wrapperRef}>
          <LocalizationProvider
            adapterLocale={fr}
            dateAdapter={AdapterDateFns}
            className='w-full'>
            <DateCalendar
              shouldDisableDate={shouldDisableDate}
              value={value}
              disablePast
              onChange={(date) => setValue(date)}
            />
          </LocalizationProvider>
        </div>
        {!errorTop && (
          <p
            className={`${classNames.error} ${
              light ? cssModule.errorLight : cssModule.error
            }`}>
            {error?.message}
          </p>
        )}
      </div>
    </ThemeProvider>
  );
}

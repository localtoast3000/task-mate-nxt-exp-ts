const selected = '#3498db';

export const dateTimePicker = {
  container: {
    position: 'absolute' as 'absolute',
    zIndex: 10,
    marginTop: 10,
    border: 'solid 1px black',
    padding: 10,
    width: 200,
  },
  viewContainer: {
    width: '100%',
    height: '350px',
    overflow: 'hidden',
  },
};

export const header = {
  container: {
    display: 'grid',
    gridTemplateRows: 'repeat(2, 20px)',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: 10,
    width: '100%',
    paddingBottom: '20px',
  },
  viewButton: {
    opacity: 0.8,
  },
  viewButtonActive: {
    opacity: 1,
  },
  yearButton: {
    justifySelf: 'start',
  },
  yearButtonActive: {},
  timeButton: {
    justifySelf: 'end',
  },
  timeButtonActive: {},
  timeButtonSpan: {
    gridRow: 'span 2',
    alignSelf: 'end',
    fontSize: '1.5rem',
  },
  monthButton: {
    justifySelf: 'start',
  },
  monthButtonActive: {},
  navButtonsWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'end',
    gap: 30,
  },
  navButtonsHidden: {
    display: 'none',
  },
  navButton: {
    opacity: 1,
  },
  navButtonDisabled: {
    opacity: 0.6,
  },
  navButtonIcon: {
    opacity: 1,
    width: 10,
    height: 10,
    fill: 'white',
  },
  navButtonIconDisabled: {
    opacity: 0.6,
  },
};

export const calendarView = {
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gap: 10,
  },
  dayContainer: {
    width: '100%',
    textAlign: 'center' as 'center',
    marginBottom: 10,
  },
  dayButton: {
    width: '100%',
    textAlign: 'center' as 'center',
  },
  selectedDayButton: {
    backgroundColor: selected,
  },
  disabledDayButton: {
    opacity: '0.5',
  },
};

export const yearView = {
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    width: '100%',
    height: '100%',
    overflowY: 'auto' as 'auto',
  },
  button: {
    width: '100%',
    textAlign: 'center' as 'center',
  },
  disabled: {
    opacity: 0.5,
  },
  selected: {
    backgroundColor: selected,
  },
};

export const timeView = {
  container: {
    display: 'flex',
    height: '100%',
    overflow: 'scroll',
  },
  column: {
    flex: 1,
    overflowY: 'auto' as 'auto',
  },
  button: {
    width: '100%',
    textAlign: 'center' as 'center',
    margin: '10px 0',
  },
  selected: {
    backgroundColor: selected,
  },
  divider: {
    borderRight: '1px solid',
    margin: '0 20px',
  },
};

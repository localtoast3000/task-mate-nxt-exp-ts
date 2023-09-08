import { useState, useEffect } from 'react';
import { Button } from 'ui/components/buttons';

export default function ButtonsSelector({
  slots = [{ value: '', label: '' }],
  register,
  name,
  rules = {},
  unSelect = null,
  defaultValue = slots[0].value,
  onChange = () => {},
  onValueChange = () => {},
  controlled = true,
  disable = [],
  error,
  classNames = {
    container: '',
    button: '',
    label: '',
    selected: '',
    error: '',
    selectedLabel: '',
  },
}) {
  const [currentValue, setCurrentValue] = useState(defaultValue);

  useEffect(() => {
    if (!currentValue) return;
    onChange(currentValue);
    onValueChange(currentValue);
  }, [currentValue]);

  useEffect(() => {
    if (unSelect) {
      if (slots.find(({ value }) => value === unSelect)) {
        setCurrentValue('');
      }
    }
  }, [unSelect]);

  return (
    <div className={classNames.container}>
      <input
        {...register(name, rules)}
        type='text'
        value={currentValue}
        className='hidden'
      />
      <div className={`${classNames.wrapper}`}>
        {slots.map((slot, i) => (
          <Button
            key={i}
            type='button'
            disabled={disable.includes(slot.value)}
            classNames={{
              button: `${disable.includes(slot.value) && 'opacity-[0.3]'} ${
                currentValue === slot.value ? classNames.selected : classNames.button
              }`,
            }}
            onClick={() => setCurrentValue(slot.value)}>
            <span
              className={`${
                currentValue === slot.value ? classNames.selectedLabel : classNames.label
              }`}>
              {slot.label}
            </span>
          </Button>
        ))}
      </div>
      <p className={`${classNames.error}`}>{error?.message}</p>
    </div>
  );
}

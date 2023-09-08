import { Checkbox as MuiCheckbox } from '@mui/material';
import { Checked, UnChecked } from 'ui/components/graphics/icons';
import cssModule from '../form.module.css';

export default function Checkbox({
  register,
  name,
  rules = {},
  controlled = true,
  error,
  label,
  classNames = {
    container: '',
    wrapper: '',
    checkbox: '',
    checkedIcon: '',
    uncheckedIcon: '',
    label: '',
    error: '',
  },
  ...props
}) {
  return (
    <div className={`${cssModule.checkbox} w-full font-body ${classNames.container}`}>
      <div className={`ml-[3px] flex gap-[10px] flex-row${classNames.wrapper}`}>
        <MuiCheckbox
          {...props}
          {...register(name, rules)}
          checkedIcon={
            <Checked className={`h-auto w-[16px] fill-first ${classNames.checkedIcon}`} />
          }
          icon={
            <UnChecked
              className={`h-auto w-[16px] fill-[#a5a5a5] group-hover:fill-first ${classNames.uncheckedIcon}`}
            />
          }
          inputProps={{
            className: `${classNames.checkbox} group`,
          }}
          sx={{
            checkbox: {
              '&:hover': {
                backgroundColor: 'transparent',
              },
            },
            '&:hover': { backgroundColor: 'transparent' },
          }}
        />
        <p className={`text-wrap w-full text-[0.75rem] ${classNames.label}`}>{label}</p>
      </div>
      <p className={`${cssModule.error} ${classNames.error}`}>{error?.message}</p>
    </div>
  );
}

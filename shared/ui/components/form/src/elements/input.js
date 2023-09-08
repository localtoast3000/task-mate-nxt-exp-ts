import { useEffect, useRef } from 'react';
import { TextField } from '@mui/material';
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from 'config/tailwind.config';
import cssModule from '../form.module.css';

const {
  theme: { colors, fontFamily },
} = resolveConfig(tailwindConfig);

export default function Input({
  register,
  name,
  rules = {},
  controlled = true,
  onChange = () => {},
  onValueChange = () => {},
  light = false,
  error,
  styles = {
    fontFamily: fontFamily.body,
    textColor: light ? colors.highlight : colors.first,
    focusedColor: light ? colors.highlight : colors.first,
    hoverColor: light ? colors.highlight : colors.first,
    unfocusedColor: colors.greyout,
    errorColor: light ? colors.error2 : colors.error,
  },
  classNames = {
    container: '',
    input: '',
    label: '',
    error: '',
  },
  ...props
}) {
  const wrapperRef = useRef();

  useEffect(() => {
    // Removes MUI's helper text element
    const container = wrapperRef.current;
    const p = container.querySelector('p');
    if (p) {
      p.remove();
    }
  }, []);

  return (
    <div className={`w-full font-body ${classNames.container}`}>
      <div ref={wrapperRef}>
        <TextField
          {...props}
          {...register(name, rules)}
          onChange={(e) => {
            onChange(e);
            onValueChange(e.target.value);
          }}
          InputLabelProps={{
            shrink: true,
            className: `${classNames.label}`,
          }}
          InputProps={{
            className: `min-h-[30px] w-full ${classNames.input}`,
          }}
          error={Boolean(error)}
          sx={{
            // Label
            '& label': {
              fontFamily: styles.fontFamily,
            },
            '& .MuiFormLabel-root[data-shrink=true]': {
              color: styles.focusedColor,
              fontFamily: styles.fontFamily,
            },
            '& .MuiFormLabel-root[data-shrink=false]': {
              color: styles.unfocusedColor,
              fontFamily: styles.fontFamily,
            },

            // Input
            input: {
              color: styles.textColor,
              fontFamily: styles.fontFamily,
            },
            textarea: {
              color: styles.textColor,
              fontFamily: styles.fontFamily,
            },

            // Border full outline
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: styles.unfocusedColor,
              },
              '&:hover fieldset': {
                borderColor: styles.hoverColor,
              },
              '&.Mui-focused fieldset': {
                borderColor: styles.focusedColor,
              },
            },

            // Border underline
            '& .MuiInput-underline::before': {
              borderColor: styles.unfocusedColor,
            },
            '& .MuiInput-underline:hover::before': {
              borderColor: styles.hoverColor,
            },
            '& .MuiInput-underline::after': {
              borderColor: styles.focusedColor,
            },

            // Errors
            '& label.Mui-error': {
              color: styles.errorColor,
            },
            '& .MuiFormLabel-root[data-shrink=true].Mui-error': {
              color: styles.errorColor,
              fontFamily: styles.fontFamily,
            },
            '& .MuiInput-underline.Mui-error::before': {
              borderColor: styles.errorColor,
            },
            '& .MuiInput-underline.Mui-error::after': {
              borderColor: styles.errorColor,
            },
            '& .MuiInput-underline.Mui-error:after': {
              borderBottomColor: styles.errorColor,
            },
            '& .MuiOutlinedInput-root.Mui-error': {
              '& fieldset': {
                borderColor: styles.errorColor,
              },
              '&:hover fieldset': {
                borderColor: styles.errorColor,
              },
              '&.Mui-focused fieldset': {
                borderColor: styles.errorColor,
              },
            },
            '& .MuiFormHelperText-root.Mui-error': {
              color: styles.errorColor,
              fontFamily: styles.fontFamily,
            },
          }}
        />
      </div>
      <p
        className={`${classNames.error} ${
          light ? cssModule.errorLight : cssModule.error
        }`}>
        {error?.message}
      </p>
    </div>
  );
}

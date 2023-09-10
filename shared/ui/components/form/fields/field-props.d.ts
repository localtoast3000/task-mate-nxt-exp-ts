import { Props, FieldError, UseFormRegister } from 'react-hook-form';

export interface FieldProps {
  wrapper?: boolean;
  register?: UseFormRegister;
  name: string;
  label?: string;
  type?: string;
  rules?: { [key: string]: any };
  controlled?: boolean;
  error?: FieldError;
}

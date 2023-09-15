import React, { ReactNode } from 'react';
import { useForm, Controller, SubmitHandler, FieldValues } from 'react-hook-form';

// Type Definitions

interface FormProps<TFieldValues extends FieldValues> {
  defaultValues?: Partial<TFieldValues>;
  children: ReactNode;
  onSubmit: SubmitHandler<TFieldValues>;
  removeNativeErrors?: boolean;
  className?: string;
  [key: string]: any;
}

type MapChildrenProps = {
  ignore?: boolean;
  wrapper?: boolean;
  name?: string;
  controlled?: boolean;
  rules?: object;
  children?: ReactNode;
  [key: string]: any;
};

// Component

const Form = React.forwardRef<HTMLFormElement, FormProps<any>>(
  (
    { defaultValues = {}, children, onSubmit, removeNativeErrors = true, ...props },
    ref
  ) => {
    const {
      handleSubmit,
      control,
      register,
      formState: { errors },
    } = useForm({ defaultValues });

    let trackedId = 0;

    const mapChildrenRecursively = (child: React.ReactNode): React.ReactNode => {
      if (React.isValidElement<MapChildrenProps>(child)) {
        if (child.props?.ignore) {
          const { ignore, ...restOfProps } = child.props;
          return React.createElement(child.type, {
            ...restOfProps,
            key: trackedId++,
          });
        }

        if (child.props?.wrapper && child.props.children) {
          const { wrapper, ...restOfProps } = child.props;
          return React.createElement(
            child.type,
            restOfProps,
            React.Children.map(child.props.children, mapChildrenRecursively)
          );
        } else if (child.props?.name) {
          if (child.props.controlled) {
            return (
              <Controller
                key={child.props?.name}
                name={child.props?.name}
                control={control}
                rules={child.props?.rules}
                render={({ field, fieldState: { error } }) =>
                  React.createElement(child.type, {
                    ...child.props,
                    ...field,
                    register,
                    ref: null,
                    error,
                  })
                }
              />
            );
          } else {
            return React.createElement(child.type, {
              ...child.props,
              register,
              key: child.props?.name,
              error: errors[child.props?.name],
            });
          }
        } else {
          return child;
        }
      } else {
        return child; // for strings, numbers, etc.
      }
    };

    return (
      <form
        {...props}
        ref={ref}
        noValidate={removeNativeErrors}
        onSubmit={handleSubmit((values) => onSubmit({ values, errors }))}>
        {React.Children.map(children, mapChildrenRecursively)}
      </form>
    );
  }
);

export default Form;

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import styles from '../form.module.css';

/**
 * Form component that utilizes react-hook-form for form handling.
 * @param {Object} props - Component props.
 * @param {Object} props.defaultValues - Default values for the form fields.
 * @param {React.ReactNode} props.children - Child components representing form inputs --
 *
 * The "Form" accepts controlled and none controlled form elements, construct your form field components so that
 * it accepts the props "{ controlled, name, register, rules, error, ...otherPropsYouWont }"
 *
 * eg:
 *        // Controlled material UI TextField
 *        export default function Input({
 *                        register,
 *                        name,
 *                        rules = {},
 *                        controlled = true,
 *                        error,
 *                        ...props
 *                      }) {
 *                        return (
 *                          <div>
 *                              <TextField
 *                                {...props}
 *                                {...register(name, rules)}
 *                                error={Boolean(error)}
 *                               />
 *                               <p>{error?.message}</p>
 *                          </div>
 *                      );
 *                    }
 *
 *
 * The form element component must have a "name" prop when called if it is to be registerd to the form
 *
 * Set controlled to true if the component is a controlled form field and Form will wrap that component in a react-hook-form controller
 * else set controlled to false
 *
 * If seperation of form fields are needed, you can wrap your elements in a "div" and the "Form" will recursively search fo the children at each level to find
 * a component that is not a "div" and has a "name" prop
 *
 * @param {Function} props.onSubmit - Callback function called when the form is submitted.
 * @returns {React.ReactNode} The rendered form component.
 */
const Form = React.forwardRef(
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

    /**
     * Recursively maps and processes child components of the form.
     * @param {React.ReactNode} child - The current child component.
     * @returns {React.ReactNode} The processed child component.
     */
    const mapChildrenRecursively = (child) => {
      if (child.props?.ignore) {
        const { ignore, ...restOfProps } = child.props;
        const key = trackedId;
        trackedId += 1;
        return React.createElement(child.type, {
          ...{
            ...restOfProps,
            key: key,
          },
        });
      }
      if (child.props?.wrapper && child.props.children) {
        const { wrapper, ...restOfProps } = child.props;
        const { children: nestedChildren, ...childProps } = restOfProps;
        return React.createElement(
          child.type,
          { ...childProps },
          React.Children.map(nestedChildren, (nestedChild) =>
            mapChildrenRecursively(nestedChild)
          )
        );
      } else if (child.props && child.props?.name) {
        if (child.props.controlled) {
          return (
            <Controller
              key={child.props?.name}
              name={child.props?.name}
              control={control}
              rules={child.props?.rules}
              render={({ field, fieldState: { error } }) =>
                React.createElement(child.type, {
                  ...{
                    ...child.props,
                    ...field,
                    register,
                    ref: null,
                    error,
                  },
                })
              }
            />
          );
        } else {
          return React.createElement(child.type, {
            ...{
              ...child.props,
              register,
              key: child.props?.name,
              error: errors[child.props?.name],
            },
          });
        }
      } else {
        return child;
      }
    };

    return (
      /**
       * HTML form element with provided props.
       * @type {JSX.Element}
       */
      <form
        {...props}
        noValidate={removeNativeErrors ? true : false}
        className={`${styles.form} ${props?.className}`}
        onSubmit={handleSubmit((values) => {
          /**
           * Handles form submission.
           * @param {Object} formValues - The submitted form values.
           * @param {Object} formErrors - The validation errors associated with the form fields.
           */
          onSubmit({ values, errors });
        })}>
        {React.Children.map(children, (child) => mapChildrenRecursively(child))}
      </form>
    );
  }
);

export default Form;

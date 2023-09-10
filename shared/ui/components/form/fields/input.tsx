import React from 'react';
import { useState, SVGProps } from 'react';
import { FieldProps } from './field-props';

interface InputProps extends FieldProps {
  classNames?: {
    container?: string;
    error?: string;
  };
}

export default function Input({
  register,
  name,
  type = '',
  rules = {},
  controlled = true,
  error,
  classNames = {
    container: '',
    error: '',
  },
  ...props
}: InputProps) {
  const [hidePassword, setHidePassword] = useState(true);

  return (
    <div className={`w-full input mb-[10px] ${classNames.container}`}>
      <div>
        <input
          {...props}
          {...register(name, rules)}
        />
        {type === 'password' ? (
          hidePassword ? (
            <button
              className='btn btn-ghost'
              onClick={() => setHidePassword(false)}>
              <EyeVisible className='fill-neutral' />
            </button>
          ) : (
            <button
              className='btn btn-ghost'
              onClick={() => setHidePassword(true)}>
              <EyeBlind className='fill-neutral' />
            </button>
          )
        ) : (
          <></>
        )}
      </div>
      <p
        className={`${classNames.error} text-error ${error?.message ? 'mt-[10px]' : ''}`}>
        {error?.message}
      </p>
    </div>
  );
}

function EyeVisible({ ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox='0 -960 960 960'
      {...props}>
      <path d='M480.118-330Q551-330 600.5-379.618q49.5-49.617 49.5-120.5Q650-571 600.382-620.5q-49.617-49.5-120.5-49.5Q409-670 359.5-620.382q-49.5 49.617-49.5 120.5Q310-429 359.618-379.5q49.617 49.5 120.5 49.5Zm-.297-61.826q-45.147 0-76.571-31.603t-31.424-76.75q0-45.147 31.603-76.571t76.75-31.424q45.147 0 76.571 31.603t31.424 76.75q0 45.147-31.603 76.571t-76.75 31.424ZM480-194.5q-147.913 0-267.348-84.674T34.5-500q58.717-136.152 178.152-220.826Q332.087-805.5 480-805.5t267.348 84.674Q866.783-636.152 925.5-500q-58.717 136.152-178.152 220.826Q627.913-194.5 480-194.5Z' />
    </svg>
  );
}

function EyeBlind({ ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox='0 -960 960 960'
      {...props}>
      <path d='M813.848-61.848 649.196-223.739q-35 14-79.239 21.62Q525.717-194.5 480-194.5q-147.196 0-267.75-82.456Q91.696-359.413 34.5-500q19.522-51.761 55.38-101.859 35.859-50.098 86.381-95.815L50.978-822.478l43.913-45.152 759.87 759.869-40.913 45.913ZM480-330q13.283 0 28.446-2.5 15.163-2.5 25.445-7.261l-214.608-214.13q-4.522 11.282-6.903 25.565Q310-514.043 310-500q0 72 50 121t120 49Zm283.739 41.913L629.957-422.109q9.521-15.043 14.782-36.185Q650-479.435 650-500q0-71-49.5-120.5T480-670q-20.804 0-41.087 4.761-20.283 4.761-36.804 15.043L287.565-765.5q35-16 90.218-28Q433-805.5 485-805.5q143.957 0 264.011 82.337Q869.065-640.826 925.5-500q-25.761 64.478-67.119 118.076-41.359 53.598-94.642 93.837ZM578.065-474l-125.5-125.5q25.174-10.282 52.826-5.098 27.652 5.185 48.5 24.555 20.609 20.608 28.533 45.999 7.924 25.392-4.359 60.044Z' />
    </svg>
  );
}

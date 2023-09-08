import React, { SVGProps } from 'react';

interface LogoProps extends SVGProps<SVGSVGElement> {
  classNames: {
    svg?: string;
    saw?: string;
    text?: string;
  };
}

export default function Logo({ classNames, ...props }: LogoProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='142'
      height='82'
      viewBox='0 0 142 82'
      fill='none'
      {...props}></svg>
  );
}

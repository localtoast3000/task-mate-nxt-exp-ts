import React, { PropsWithChildren } from 'react';

export default function Logo({ ...props }) {
  return (
    <h1
      className={`text-header ${props?.className ? props?.className : ''}`}
      {...props}>
      Task Mate
    </h1>
  );
}

import React, { SVGProps } from 'react';

export default function EyeBlind({ ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox='0 -960 960 960'
      {...props}>
      <path d='M813.848-61.848 649.196-223.739q-35 14-79.239 21.62Q525.717-194.5 480-194.5q-147.196 0-267.75-82.456Q91.696-359.413 34.5-500q19.522-51.761 55.38-101.859 35.859-50.098 86.381-95.815L50.978-822.478l43.913-45.152 759.87 759.869-40.913 45.913ZM480-330q13.283 0 28.446-2.5 15.163-2.5 25.445-7.261l-214.608-214.13q-4.522 11.282-6.903 25.565Q310-514.043 310-500q0 72 50 121t120 49Zm283.739 41.913L629.957-422.109q9.521-15.043 14.782-36.185Q650-479.435 650-500q0-71-49.5-120.5T480-670q-20.804 0-41.087 4.761-20.283 4.761-36.804 15.043L287.565-765.5q35-16 90.218-28Q433-805.5 485-805.5q143.957 0 264.011 82.337Q869.065-640.826 925.5-500q-25.761 64.478-67.119 118.076-41.359 53.598-94.642 93.837ZM578.065-474l-125.5-125.5q25.174-10.282 52.826-5.098 27.652 5.185 48.5 24.555 20.609 20.608 28.533 45.999 7.924 25.392-4.359 60.044Z' />
    </svg>
  );
}

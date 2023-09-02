import React from 'react';
import cx from 'classnames';

import s from './stats-wrapper.module.css';

type StatsWrapperProps = {
  variant?: 'large' | 'small';
  className?: string;
  children: React.ReactNode;
};

export const StatsWrapper: React.FC<StatsWrapperProps> = ({
  variant = 'large',
  children,
  className,
}: StatsWrapperProps) => {
  return <div className={cx(s.root, className, s[variant])}>{children}</div>;
};

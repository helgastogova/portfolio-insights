import cx from 'classnames';
import s from './stats-wrapper.module.css';

type StatsWrapperProps = {
  variant?: 'large' | 'small';
  className?: string;
};

export const StatsWrapper = ({
  children,
  variant = 'large',
}: StatsWrapperProps) => {
  return <div className={cx(s.root, s[variant])}>{children}</div>;
};

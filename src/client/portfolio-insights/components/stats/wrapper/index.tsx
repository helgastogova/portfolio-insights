import cx from 'classnames';
import s from './stats-wrapper.module.css';

type StatsWrapperProps = {
  variant?: 'large' | 'small';
  className?: string;
  children: React.ReactNode;
};

export const StatsWrapper = ({
  variant = 'large',
  children,
  className,
}: StatsWrapperProps) => {
  return <div className={cx(s.root, className, s[variant])}>{children}</div>;
};

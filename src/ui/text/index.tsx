import * as React from 'react';
import cx from 'classnames';
import s from './text.module.css';

type TextProps<T extends React.ElementType = 'span'> = {
  as?: T;
  children: React.ReactNode;
  variant: 'body/base' | 'heading/large' | 'heading/medium' | 'heading/small';
  color?: 'black' | 'grey';
  className?: string;
  bold?: boolean;
} & React.HTMLProps<T>;

const Text = <T extends React.ElementType = 'span'>({
  as,
  children,
  className,
  variant,
  bold,
  color,
  ...rest
}: TextProps<T>) => {
  const Component = as || 'span';

  return (
    <Component
      className={cx(className, s.text, s[variant], {
        [s[color]]: color,
        [s.bold]: bold,
      })}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default Text;

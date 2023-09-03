import React from 'react';
import cx from 'classnames';
import { Text } from '@ui';
import { useBreakpoint } from '@ui/hooks';
import s from './stats-item.module.css';

import { inflect } from '@client/universal/text';

type StatsItemProps = {
  title: string;
  value: string;
  subTitle: number;
  variant?: 'large' | 'small';
};

export const StatsItem: React.FC<StatsItemProps> = ({
  title,
  value,
  subTitle,
  variant = 'large',
}) => {
  const { isXl, isS } = useBreakpoint();

  const headingVariant =
    variant === 'small' && isS ? 'heading/xsmall' : 'heading/small';

  const valueVariant =
    variant === 'large' && isXl
      ? 'heading/large'
      : isS && variant === 'small'
      ? 'heading/small'
      : 'heading/medium';

  return (
    <div className={cx(s.root, s[variant])}>
      <Text as="h2" fontWidth="semibold" variant={headingVariant} color="grey">
        {title}
      </Text>
      <Text as="h2" variant={valueVariant}>
        {value}
      </Text>
      <Text variant="body/base" color="grey">
        {subTitle} {inflect('deal', 'deals', subTitle)}
      </Text>
    </div>
  );
};

export default StatsItem;

import { Text } from '@ui';
import { useBreakpoint } from '@ui/hooks';
import s from './stats-item.module.css';

type StatsItemProps = {
  title: string;
  value: string;
  subTitle: number;
  variant?: 'large' | 'small';
};

export const StatsItem = ({
  title,
  value,
  subTitle,
  variant = 'large',
}: StatsItemProps) => {
  const { isXl, isS } = useBreakpoint();

  return (
    <div className={s.root}>
      <Text
        as="h2"
        variant={
          variant === 'small' && isS ? 'heading/xsmall' : 'heading/small'
        }
        color="grey"
      >
        {title}
      </Text>
      <Text
        as="h2"
        variant={
          variant === 'large' && isXl ? 'heading/large' : 'heading/medium'
        }
      >
        {value}
      </Text>
      <Text variant="body/base" color="grey">
        {subTitle} deal{subTitle > 1 ? 's' : ''}
      </Text>
    </div>
  );
};

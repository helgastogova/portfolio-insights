import { StatsItem } from './item';

import { Divider } from '@ui';
import { StatsWrapper } from './wrapper';
import { StatsTable } from './table';

import { IMarket, IInvestment } from '../../types';
import { generatePortfolio } from '../../utils';
import { inflect } from '@client/universal/text';

import s from './stats.module.css';

type StatsProps = {
  items: IInvestment[];
  markets: IMarket[];
};

export const Stats = ({ items, markets }: StatsProps) => {
  const {
    totalInvested,
    topMarket,
    topCompany,
    marketComposition,
    investments,
  } = generatePortfolio(items, markets);
  return (
    <>
      <StatsWrapper>
        <StatsItem
          title="All investments"
          value={`${totalInvested.numMarkets} ${inflect(
            'market',
            'markets',
            totalInvested.numMarkets,
          )}`}
          subTitle={totalInvested.numDeals}
          variant="large"
        />
        {topMarket && (
          <StatsItem
            title="Top market"
            value={topMarket.marketTagName}
            subTitle={topMarket.numDeals}
            variant="large"
          />
        )}
        {topCompany && (
          <StatsItem
            title="Top company"
            value={topCompany.companyName}
            subTitle={topCompany.numDeals}
            variant="large"
          />
        )}
      </StatsWrapper>
      <Divider className={s.smallStatDivider} />
      <StatsWrapper variant="small">
        {marketComposition.map((item, index) => {
          const { marketTagName, percentage, numDeals } = item;
          return (
            <StatsItem
              key={`${marketTagName}_${index}`}
              title={marketTagName}
              value={percentage + '%'}
              subTitle={numDeals}
              variant="small"
            />
          );
        })}
      </StatsWrapper>
      <Divider className={s.tableDivider} />
      <StatsTable investments={investments} />
    </>
  );
};

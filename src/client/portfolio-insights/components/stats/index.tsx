import { StatsItem } from './item';

import { Divider } from '@ui';
import { StatsWrapper } from './wrapper';
import { StatsTable } from './table';

import { IMarket, IInvestment } from '../../types';
import { analyzePortfolio } from '../../utils';

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
  } = analyzePortfolio(items, markets);
  return (
    <>
      <StatsWrapper>
        <StatsItem
          title="All investments"
          value={`${totalInvested.numDeals} markets`}
          subTitle={totalInvested.numMarkets}
        />
        <StatsItem
          title="Top market"
          value={topMarket.marketTagName}
          subTitle={topMarket.numDeals}
        />
        <StatsItem
          title="Top company"
          value={topCompany.companyName}
          subTitle={topCompany.numDeals}
        />
      </StatsWrapper>
      <Divider className={s.smallStatDivider} />
      <StatsWrapper variant="small">
        {marketComposition.map((item, index) => {
          const { marketId, marketTagName, percentage, numDeals } = item;
          return (
            <StatsItem
              key={`${marketId}_${index}`}
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

import { Stats } from './components/stats';
import { Layout } from '@ui';
import { markets, investments } from './constants';

import s from './portfolio-insights.module.css';

export const PortfolioInsights = () => {
  return (
    <div className={s.root}>
      <Layout.Title>Portfolio Insights</Layout.Title>
      <Stats items={investments} markets={markets} />
    </div>
  );
};

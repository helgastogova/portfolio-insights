import React from 'react';
import { PortfolioInsights } from '@client/portfolio-insights';

import { Layout } from '@ui';

const IndexPage = () => {
  return (
    <main>
      <Layout>
        <PortfolioInsights />
      </Layout>
    </main>
  );
};

export default IndexPage;

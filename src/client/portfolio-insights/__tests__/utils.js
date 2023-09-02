import { calculatePortfolioInsights } from '../utils';
import { markets, investments } from '../constants';

describe('calculatePortfolioInsights', () => {
  it('should return the correct totalInvested object', () => {
    const result = calculatePortfolioInsights(investments, markets);
    expect(result.totalInvested).toEqual({ numMarkets: 8, numDeals: 9 });
  });

  it('should return the correct topMarket object', () => {
    const result = calculatePortfolioInsights(investments, markets);
    expect(result.topMarket).toEqual({
      marketTagName: 'Banking as a Service',
      numDeals: 2,
    });
  });

  it('should return the correct topCompany object', () => {
    const result = calculatePortfolioInsights(investments, markets);
    expect(result.topCompany).toEqual({ companyName: 'Chase.io', numDeals: 2 });
  });

  it('should return the correct marketComposition array', () => {
    const result = calculatePortfolioInsights(investments, markets);
    const expectedComposition = [
      { marketTagName: 'Insurtech', percentage: '11.1', numDeals: 1 },
      { marketTagName: 'Ecommerce', percentage: '11.1', numDeals: 1 },
      { marketTagName: 'Enterprise', percentage: '22.2', numDeals: 2 },
      { marketTagName: 'Banking', percentage: '11.1', numDeals: 1 },
      {
        marketTagName: 'Banking as a Service',
        percentage: '22.2',
        numDeals: 2,
      },
      { marketTagName: 'Space', percentage: '11.1', numDeals: 1 },
      { marketTagName: 'NFTs', percentage: '11.1', numDeals: 1 },
    ];
    expect(result.marketComposition).toEqual(expectedComposition);
  });

  it('should return the correct detailedInvestments array', () => {
    const result = calculatePortfolioInsights(investments, markets);
    const expectedInvestments = investments.map((investment) => ({
      ...investment,
      marketTagName: markets.find((market) => market.id === investment.marketId)
        ?.name,
    }));
    expect(result.investments).toEqual(expectedInvestments);
  });
});

import {
  IMarket,
  IInvestment,
  ITotalInvested,
  IComposition,
  IInsightInvestment,
  IPortfolioInsights,
} from './types';

const createMarketMap = (markets: IMarket[]): Map<string, IMarket> => {
  const marketMap = new Map<string, IMarket>();
  markets.forEach((market) => marketMap.set(market.id, market));
  return marketMap;
};

const countDealsNumber = (
  investments: IInvestment[],
  marketData: Map<string, IMarket>,
) => {
  const counts = investments.reduce(
    (acc, investment) => {
      const market = marketData.get(investment.marketId);
      if (market) {
        acc.marketCount.set(
          market.name,
          (acc.marketCount.get(market.name) || 0) + 1,
        );
      }
      acc.companyCount.set(
        investment.companyName,
        (acc.companyCount.get(investment.companyName) || 0) + 1,
      );
      return acc;
    },
    {
      marketCount: new Map<string, number>(),
      companyCount: new Map<string, number>(),
    },
  );

  return counts;
};

const findTopMarket = (data: Map<string, number>) => {
  let maxEntry: [string, number] = ['', 0];
  data.forEach((value, key) => {
    if (value > maxEntry[1]) {
      maxEntry = [key, value];
    }
  });
  return maxEntry;
};

const canculateMarketComposition = (
  marketCounts: Map<string, number>,
  total: number,
): IComposition[] => {
  const compositions: IComposition[] = [];
  marketCounts.forEach((count, market) => {
    compositions.push({
      marketTagName: market,
      percentage: parseFloat(((count / total) * 100).toFixed(1)),
      numDeals: count,
    });
  });
  return compositions;
};

const findInvestments = (
  investments: IInvestment[],
  marketData: Map<string, IMarket>,
): IInsightInvestment[] => {
  return investments.map((investment) => ({
    id: investment.id,
    marketId: investment.marketId,
    companyName: investment.companyName,
    marketTagName: marketData.get(investment.marketId)?.name,
  }));
};
export const analyzePortfolio = (
  investments: IInvestment[],
  markets: IMarket[],
): IPortfolioInsights => {
  const marketData = createMarketMap(markets);
  const { marketCount, companyCount } = countDealsNumber(
    investments,
    marketData,
  );

  const totalInvested: ITotalInvested = {
    numMarkets: marketCount.size,
    numDeals: investments.length,
  };

  const [topMarketName, topMarketDeals] = findTopMarket(marketCount);
  const [topCompanyName, topCompanyDeals] = findTopMarket(companyCount);

  return {
    totalInvested,
    topMarket: { marketTagName: topMarketName, numDeals: topMarketDeals },
    topCompany: { companyName: topCompanyName, numDeals: topCompanyDeals },
    marketComposition: canculateMarketComposition(
      marketCount,
      totalInvested.numDeals,
    ),
    investments: findInvestments(investments, marketData),
  };
};

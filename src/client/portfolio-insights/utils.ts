import {
  IMarket,
  IInvestment,
  ITotalInvested,
  IComposition,
  IInsightInvestment,
  IPortfolioInsights,
  ITopMarket,
  ITopCompany,
} from './types';

/**
 * Calculate the number of unique markets and deals from a list of investments.
 */
export const findMarketsAndDealsCount = (
  investments: IInvestment[],
): ITotalInvested => {
  const markets = new Set<string>();
  const deals = new Set<string>();

  investments.forEach((item) => {
    markets.add(item.marketId);
    deals.add(item.id);
  });

  return {
    numMarkets: markets.size,
    numDeals: deals.size,
  };
};

/**
 * Identify the market with the most deals based on a list of investments.
 */
export const findTopMarket = (
  investments: IInvestment[],
  markets: IMarket[],
): ITopMarket | undefined => {
  const marketMap = new Map<string, number>();

  investments.forEach((item) => {
    const market = markets.find((market) => market.id === item.marketId);

    if (market) {
      const count = marketMap.get(market.name) || 0;
      marketMap.set(market.name, count + 1);
    }
  });

  let topMarket: ITopMarket | undefined;

  marketMap.forEach((value, key) => {
    if (!topMarket || value > topMarket.numDeals) {
      topMarket = {
        marketTagName: key,
        numDeals: value,
      };
    }
  });

  return topMarket;
};

/**
 * Identify the company with the most deals based on a list of investments.
 */
export const findTopCompany = (
  investments: IInvestment[],
): ITopCompany | undefined => {
  const companyMap = new Map<string, number>();

  investments.forEach((item) => {
    const count = companyMap.get(item.companyName) ?? 0;
    companyMap.set(item.companyName, count + 1);
  });

  let topCompany: ITopCompany | undefined;

  companyMap.forEach((value, key) => {
    if (!topCompany || value > topCompany.numDeals) {
      topCompany = {
        companyName: key,
        numDeals: value,
      };
    }
  });

  return topCompany;
};

/**
 * Calculate the market composition based on investments and available markets.
 */
export const findMarketComposition = (
  investments: IInvestment[],
  markets: IMarket[],
): IComposition[] => {
  const marketCount: Record<string, number> = {};
  const totalDeals = investments.length;
  const compositions: IComposition[] = [];

  const marketById: Record<string, IMarket> = {};

  markets.forEach((item) => {
    marketById[item.id] = item;
  });

  investments.forEach((investment) => {
    let currentMarketId: string | null = investment.marketId;

    while (currentMarketId) {
      const market: IMarket | undefined = marketById[currentMarketId];
      if (!market) break;

      marketCount[currentMarketId] = (marketCount[currentMarketId] || 0) + 1;
      currentMarketId = market.parentId ?? null;
    }
  });

  const parentMarkets = markets.filter((market) => !market.parentId);

  parentMarkets.forEach((item) => {
    const count = marketCount[item.id] ?? 0;

    compositions.push({
      marketTagName: item.name,
      percentage:
        count === 0 || totalDeals === 0
          ? 0
          : parseFloat(((count / totalDeals) * 100).toFixed(1)),
      numDeals: count,
    });
  });

  compositions.sort((a, b) => b.percentage - a.percentage);

  return compositions;
};

export const findInvestments = (
  investments: IInvestment[],
  marketData: Map<string, IMarket>,
): IInsightInvestment[] =>
  investments.map((item) => ({
    id: item.id,
    marketId: item.marketId,
    companyName: item.companyName,
    marketTagName: marketData.get(item.marketId)?.name,
  }));

export function portfolioInsights(
  investments: IInvestment[],
  markets: IMarket[],
): IPortfolioInsights {
  const marketData = new Map<string, IMarket>();

  markets.forEach((item) => {
    marketData.set(item.id, item);
  });

  const insights: IPortfolioInsights = {
    totalInvested: findMarketsAndDealsCount(investments),
    topMarket: findTopMarket(investments, markets),
    topCompany: findTopCompany(investments),
    marketComposition: findMarketComposition(investments, markets),
    investments: findInvestments(investments, marketData),
  };

  return insights;
}

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
const findMarketsAndDealsCount = (
  investments: IInvestment[],
): ITotalInvested => {
  const markets = new Set<string>();
  const deals = new Set<string>();

  investments.forEach((investment) => {
    markets.add(investment.marketId);
    deals.add(investment.id);
  });

  return {
    numMarkets: markets.size,
    numDeals: deals.size,
  };
};

/**
 * Identify the market with the most deals based on a list of investments.
 */
const findTopMarket = (
  investments: IInvestment[],
  markets: IMarket[],
): ITopMarket | undefined => {
  const marketMap = new Map<string, number>();
  investments.forEach((investment) => {
    const market = markets.find((market) => market.id === investment.marketId);
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
const findTopCompany = (
  investments: IInvestment[],
): ITopCompany | undefined => {
  const companyMap = new Map<string, number>();
  investments.forEach((investment) => {
    const count = companyMap.get(investment.companyName) || 0;
    companyMap.set(investment.companyName, count + 1);
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
 *
 * 1. Create a mapping between market IDs and market objects for quick lookup.
 * 2. Iterate through each investment to count the number of deals in each market.
 *    - We go up the market hierarchy by using parentId to count for parent markets as well.
 * 3. Filter out child markets to consider only parent markets (markets without a parentId).
 * 4. Calculate and create an array of market compositions which includes:
 *    - Market name (marketTagName)
 *    - Percentage of deals in that market (percentage)
 *    - Total number of deals in that market (numDeals)
 * 5. Sort the composition array by percentage in descending order.
 */
const findMarketComposition = (
  investments: IInvestment[],
  markets: IMarket[],
): IComposition[] => {
  const marketCount: Record<string, number> = {};
  const totalDeals = investments.length;
  const compositions: IComposition[] = [];

  const marketById: Record<string, IMarket> = {};
  markets.forEach((market) => {
    marketById[market.id] = market;
  });

  investments.forEach((investment) => {
    let currentMarketId: string | null = investment.marketId;
    while (currentMarketId) {
      const market: IMarket | undefined = marketById[currentMarketId];
      if (market) {
        marketCount[currentMarketId] = (marketCount[currentMarketId] || 0) + 1;
        currentMarketId = market.parentId ?? null;
      } else {
        break;
      }
    }
  });

  const parentMarkets = markets.filter((market) => !market.parentId);

  parentMarkets.forEach((market) => {
    const count = marketCount[market.id] || 0;
    compositions.push({
      marketTagName: market.name,
      percentage: parseFloat(((count / totalDeals) * 100).toFixed(1)),
      numDeals: count,
    });
  });

  compositions.sort((a, b) => b.percentage - a.percentage);

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

export function generatePortfolio(
  investments: IInvestment[],
  markets: IMarket[],
): IPortfolioInsights {
  const marketData = new Map<string, IMarket>();
  markets.forEach((market) => {
    marketData.set(market.id, market);
  });

  const totalInvested = findMarketsAndDealsCount(investments);
  const topMarket = findTopMarket(investments, markets);
  const topCompany = findTopCompany(investments);
  const marketComposition = findMarketComposition(investments, markets);

  const insights: IPortfolioInsights = {
    totalInvested,
    topMarket,
    topCompany,
    marketComposition,
    investments: findInvestments(investments, marketData),
  };

  return insights;
}

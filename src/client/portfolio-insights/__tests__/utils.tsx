import {
  findMarketsAndDealsCount,
  findTopMarket,
  findTopCompany,
  findMarketComposition,
  findInvestments,
  portfolioInsights,
} from '../utils';
import { IMarket, IInvestment } from '../types';
import { markets, investments } from '../constants';

describe('findMarketsAndDealsCount function', () => {
  test('should correctly count unique markets and deals', () => {
    const result = findMarketsAndDealsCount(investments);

    expect(result.numMarkets).toBe(7);
    expect(result.numDeals).toBe(9);
  });

  test('should return zeros if the investments array is empty', () => {
    const result = findMarketsAndDealsCount([]);

    expect(result.numMarkets).toBe(0);
    expect(result.numDeals).toBe(0);
  });
});

describe('findTopMarket function', () => {
  it('should return the market with the most deals', () => {
    const result = findTopMarket(investments, markets);
    expect(result).toEqual({
      marketTagName: 'Enterprise',
      numDeals: 2,
    });
  });

  it('should return undefined if no investments are provided', () => {
    const result = findTopMarket([], markets);
    expect(result).toBeUndefined();
  });

  it('should return undefined if no markets are provided', () => {
    const result = findTopMarket(investments, []);
    expect(result).toBeUndefined();
  });

  it('should return undefined if both investments and markets are empty', () => {
    const result = findTopMarket([], []);
    expect(result).toBeUndefined();
  });
});

describe('findTopCompany function', () => {
  it('should return the company with the most deals', () => {
    const result = findTopCompany(investments);
    expect(result).toEqual({
      companyName: 'Chase.io',
      numDeals: 2,
    });
  });

  it('should return undefined if no investments are provided', () => {
    const result = findTopCompany([]);
    expect(result).toBeUndefined();
  });

  it('should handle a tie correctly', () => {
    const tieInvestments = [
      { id: '1', companyName: 'Company A', marketId: '2' },
      { id: '2', companyName: 'Company A', marketId: '1' },
      { id: '3', companyName: 'Company B', marketId: '3' },
      { id: '4', companyName: 'Company B', marketId: '4' },
    ];
    const result = findTopCompany(tieInvestments);
    expect(result).toEqual({
      companyName: 'Company A',
      numDeals: 2,
    });
  });
});

describe('findMarketComposition function', () => {
  it('should return correct market composition', () => {
    const result = findMarketComposition(investments, markets);
    expect(result).toEqual([
      {
        marketTagName: 'Finance',
        percentage: 44.4,
        numDeals: 4,
      },
      {
        marketTagName: 'Enterprise',
        percentage: 22.2,
        numDeals: 2,
      },
      {
        marketTagName: 'Consumer',
        percentage: 11.1,
        numDeals: 1,
      },
      {
        marketTagName: 'Blockchain',
        percentage: 11.1,
        numDeals: 1,
      },
      {
        marketTagName: 'Future Tech',
        percentage: 11.1,
        numDeals: 1,
      },
      {
        marketTagName: 'SaaS',
        percentage: 0.0,
        numDeals: 0,
      },
    ]);
  });

  it('should return an empty array if no investments are provided', () => {
    const result = findMarketComposition([], markets);
    expect(result).toEqual([
      {
        marketTagName: 'Enterprise',
        percentage: 0.0,
        numDeals: 0,
      },
      {
        marketTagName: 'Consumer',
        percentage: 0.0,
        numDeals: 0,
      },
      {
        marketTagName: 'Finance',
        percentage: 0.0,
        numDeals: 0,
      },
      {
        marketTagName: 'SaaS',
        percentage: 0.0,
        numDeals: 0,
      },
      {
        marketTagName: 'Blockchain',
        percentage: 0.0,
        numDeals: 0,
      },
      {
        marketTagName: 'Future Tech',
        percentage: 0.0,
        numDeals: 0,
      },
    ]);
  });

  it('should return an empty array if no markets are provided', () => {
    const result = findMarketComposition(investments, []);
    expect(result).toEqual([]);
  });

  it('should sort the compositions by percentage in descending order', () => {
    const result = findMarketComposition(investments, markets);
    for (let i = 0; i < result.length - 1; i++) {
      expect(result[i].percentage).toBeGreaterThanOrEqual(
        result[i + 1].percentage,
      );
    }
  });
});

const mockMarkets = new Map<string, IMarket>([
  ['14', { id: '1', name: 'Ecommerce', parentId: '7' } as IMarket],
  ['3', { id: '2', name: 'Insurtech', parentId: '8' } as IMarket],
]);

const mockInvestments: IInvestment[] = [
  { id: '7', companyName: 'Rocketlabs', marketId: '14' },
  { id: '8', companyName: 'Salestech', marketId: '3' },
];

describe('findInvestments function', () => {
  it('should correctly map investment data with market names', () => {
    const result = findInvestments(mockInvestments, mockMarkets);

    expect(result).toEqual([
      {
        companyName: 'Rocketlabs',
        id: '7',
        marketId: '14',
        marketTagName: 'Ecommerce',
      },
      {
        companyName: 'Salestech',
        id: '8',
        marketId: '3',
        marketTagName: 'Insurtech',
      },
    ]);
  });
});

describe('portfolioInsights function', () => {
  it('should correctly compute the portfolio insights', () => {
    const result = portfolioInsights(investments, markets);
    expect(result).toEqual({
      investments: [
        {
          companyName: 'Hippo',
          id: '1',
          marketId: '2',
          marketTagName: 'Insurtech',
        },
        {
          companyName: 'Rhino',
          id: '2',
          marketId: '1',
          marketTagName: 'Ecommerce',
        },
        {
          companyName: 'Alphabetly',
          id: '3',
          marketId: '3',
          marketTagName: 'Enterprise',
        },
        {
          companyName: 'Chrono',
          id: '4',
          marketId: '4',
          marketTagName: 'Banking',
        },
        {
          companyName: 'Chase.io',
          id: '5',
          marketId: '6',
          marketTagName: 'Banking as a Service',
        },
        {
          companyName: 'Chase.io',
          id: '6',
          marketId: '6',
          marketTagName: 'Banking as a Service',
        },
        {
          companyName: 'Rocketlabs',
          id: '7',
          marketId: '14',
          marketTagName: 'Space',
        },
        {
          companyName: 'Salestech',
          id: '8',
          marketId: '3',
          marketTagName: 'Enterprise',
        },
        {
          companyName: 'Monkeycash',
          id: '9',
          marketId: '10',
          marketTagName: 'NFTs',
        },
      ],
      marketComposition: [
        {
          marketTagName: 'Finance',
          numDeals: 4,
          percentage: 44.4,
        },
        {
          marketTagName: 'Enterprise',
          numDeals: 2,
          percentage: 22.2,
        },
        {
          marketTagName: 'Consumer',
          numDeals: 1,
          percentage: 11.1,
        },
        {
          marketTagName: 'Blockchain',
          numDeals: 1,
          percentage: 11.1,
        },
        {
          marketTagName: 'Future Tech',
          numDeals: 1,
          percentage: 11.1,
        },
        {
          marketTagName: 'SaaS',
          numDeals: 0,
          percentage: 0,
        },
      ],
      topCompany: {
        companyName: 'Chase.io',
        numDeals: 2,
      },
      topMarket: {
        marketTagName: 'Enterprise',
        numDeals: 2,
      },
      totalInvested: {
        numDeals: 9,
        numMarkets: 7,
      },
    });
  });
});

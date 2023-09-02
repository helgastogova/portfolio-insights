export interface IMarket {
  id: string;
  name: string;
  parentId?: string;
}

export interface IInvestment {
  id: string;
  companyName: string;
  marketId: string;
}

export interface ITotalInvested {
  numMarkets: number;
  numDeals: number;
}

export interface ITopMarket {
  marketTagName: string;
  numDeals: number;
}

export interface ITopCompany {
  companyName: string;
  numDeals: number;
}

export interface IComposition {
  marketTagName: string;
  percentage: number;
  numDeals: number;
}

export interface IInsightInvestment extends IInvestment {
  companyName: string;
  marketTagName?: string;
}

export interface IPortfolioInsights {
  totalInvested: ITotalInvested;
  topMarket?: ITopMarket;
  topCompany?: ITopCompany;
  marketComposition: IComposition[];
  investments: IInsightInvestment[];
}

// ------------------------------------------------------------------------------
// AngelList Venture: Market Tags Take-Home Problem for Platform Engineering Role
// ------------------------------------------------------------------------------

// --- Background ---------------------------------------------------------------

// Investors like to know which markets they commonly invest in. They also like
// receiving invites to deals in the markets they are most interested in. To
// provide market analytics to investors, we tag each investment with a market
// tag.
//
// Our market tagging system is nested, with broad tags at the highest level and
// sub-markets infinitely nested underneath. Each investment gets tagged with
// the most specific tag possible.

// --- Data ---------------------------------------------------------------------

// We have a list of all market tags:
export interface IMarket {
  id: string;
  name: string;
  parentId?: string;
}

export const markets: IMarket[] = [
  { id: '1', name: 'Ecommerce', parentId: '7' },
  { id: '2', name: 'Insurtech', parentId: '8' },
  { id: '3', name: 'Enterprise' },
  { id: '4', name: 'Banking', parentId: '8' },
  { id: '5', name: 'Social', parentId: '7' },
  { id: '6', name: 'Banking as a Service', parentId: '4' },
  { id: '7', name: 'Consumer' },
  { id: '8', name: 'Finance' },
  { id: '9', name: 'Cloud Computing', parentId: '11' },
  { id: '10', name: 'NFTs', parentId: '12' },
  { id: '11', name: 'SaaS' },
  { id: '12', name: 'Blockchain' },
  { id: '13', name: 'DeFi', parentId: '12' },
  { id: '14', name: 'Space', parentId: '15' },
  { id: '15', name: 'Future Tech' },
];

// For each investor, we have a list of the investments in their portfolio:
export interface IInvestment {
  id: string;
  companyName: string;
  marketId: string;
}

export const investments: IInvestment[] = [
  { id: '1', companyName: 'Hippo', marketId: '2' },
  { id: '2', companyName: 'Rhino', marketId: '1' },
  { id: '3', companyName: 'Alphabetly', marketId: '3' },
  { id: '4', companyName: 'Chrono', marketId: '4' },
  { id: '5', companyName: 'Chase.io', marketId: '6' },
  { id: '6', companyName: 'Chase.io', marketId: '6' },
  { id: '7', companyName: 'Rocketlabs', marketId: '14' },
  { id: '8', companyName: 'Salestech', marketId: '3' },
  { id: '9', companyName: 'Monkeycash', marketId: '10' },
];

// --- Part 1: Algorithm --------------------------------------------------------

// Expected time: 45 mins

// We want to show this investor the composition of their portfolio in each
// market, along with some hero stats in the following format:
//
// Invested              Top Market              Top Company
//  5 markets             Finance                 Chase.io
//  9 deals               4 deals                 2 deals
// -----------------------------------------------------------------
// Finance  Enterprise  Future Tech  Consumer  Blockchain  SaaS
//  44.4%    22.2%       11.1%        11.1%     11.1%       0.0%
//  4 deals  2 deals     1 deal       1 deal    1 deal      0 deals
// -----------------------------------------------------------------
// Hippo                                                   Insurtech
// Rhino                                                   Ecommerce
// ...

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
  marketTagName?: string;
}

export interface IPortfolioInsights {
  totalInvested: ITotalInvested;
  topMarket?: ITopMarket;
  topCompany?: ITopCompany;
  marketComposition: IComposition[];
  investments: IInsightInvestment[];
}

// --- Part 2: Frontend ---------------------------------------------------------

// Expected time: 60 mins

// Build a lightweight React application to render an investor's portfolio
// composition. You can assume that your application would be embedded within an
// investor's dashboard as an analytics insight section. No need to build the
// rest of the page.

// Mocks can be viewed in the Figma file linked below:
// https://www.figma.com/file/py9CjXUbu7gbdxGYpOtGjh/CX-Interview
//
// password: angellist
//
// Note: If you're seeing an authorization error, try logging out of Figma.

// As part of this exercise, you should build at least two re-usable components:
// * `Stats` - responsible for rendering each of the individual insights
// * `Row` - responsible for rendering investments and their market tags

// The component does not need to accept any custom inputs.
// It should render the output of your `portfolioInsights` function when
// called with the `markets` and `investments` arrays provided above.

// --- Wrap-Up ------------------------------------------------------------------

// Expected time: 15 mins

// When you're done, please tidy up your code, zip it, and send it back to us
// with instructions about how to view the application live. Please also take a
// screenshot of the rendered application and include it in your zip file.

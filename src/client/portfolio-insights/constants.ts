import { IMarket, IInvestment } from './types';

// We have a list of all market tags:
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
  // { id: '16', name: 'Test' },
  // { id: '16', name: 'A Very long name Test, Like really long' },
  // {
  //   id: '17',
  //   name: 'A Very long name Test, Like really long, what is about more letters?',
  // },
  // {
  //   id: '18',
  //   name: 'A Very long name Test, Like really long, what is about more letters? One more',
  // },
];

// For each investor, we have a list of the investments in their portfolio:
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
  // { id: '10', companyName: 'Text', marketId: '16' },
  // {
  //   id: '11',
  //   companyName: 'A Very long name Test, Like really long',
  //   marketId: '17',
  // },
  // {
  //   id: '12',
  //   companyName:
  //     'A Very long name Test, Like really long, what is about more letters?',
  //   marketId: '18',
  // },
  // {
  //   id: '13',
  //   companyName:
  //     'A Very long name Test, Like really long, what is about more letters? One more',
  //   marketId: '19',
  // },
];

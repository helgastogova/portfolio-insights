import { IInsightInvestment } from '@client/portfolio-insights/types';
import { Table, Text } from '@ui';

import s from './table.module.css';

type StatsTableProps = {
  investments: IInsightInvestment[];
};

export const StatsTable = ({ investments }: StatsTableProps) => {
  return (
    <>
      <Table>
        <Text as="h3" variant="heading/small" className={s.title}>
          All investments
        </Text>
        {investments.map((item, index) => {
          const { companyName, marketTagName } = item;
          return (
            <Table.Row key={`${companyName}_${index}`}>
              <Table.Cell>
                <Text bold variant="body/base">
                  {companyName}
                </Text>
              </Table.Cell>
              <Table.Cell align="right">
                <Text variant="body/base">{marketTagName}</Text>
              </Table.Cell>
            </Table.Row>
          );
        })}
      </Table>
    </>
  );
};

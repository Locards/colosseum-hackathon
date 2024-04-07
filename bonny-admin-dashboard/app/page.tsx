'use client';
import { Card, Title } from '@tremor/react';
import DashboardTransactionsTable from './table';


export default function IndexPage() {
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Bonny Transactions</Title>
        <Card className="mt-6">
          <DashboardTransactionsTable />
        </Card> 
    </main>
  );
}

'use client';
import { Card, Title } from '@tremor/react';
import Transaction from './transaction';
import { useSearchParams } from 'next/navigation';


export default function Page() {
  const searchParams = useSearchParams();
  const hash = searchParams.get('hash');
  return (
    <main className="p-4 md:p-10 mx-auto max-w-3xl">
      <Title>Bonny Transaction</Title>
        <Card className="mt-6">
          <Transaction hash={hash} />
        </Card> 
    </main>
  );
}

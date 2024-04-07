import React, { useEffect, useState } from 'react';
import { DashboardTransactionItem } from '../table';
import dayjs from 'dayjs';
import { NumericFormat } from 'react-number-format';
import Link from 'next/link';

const TransactionCard = ({ trx }: {trx: DashboardTransactionItem }) => {
  return (
    <div className="w-full rounded overflow-hidden shadow-lg bg-white p-6">
      <table className="table-fixed w-full">
        <tbody>
          <tr>
            <td className="px-4 py-2 font-bold">Date</td>
            <td className="px-4 py-2">{dayjs(trx.receiptDate).format("DD.MM.YYYY")}</td>
          </tr>
          <tr>
            <td className="px-4 py-2 font-bold">Supplier</td>
            <td className="px-4 py-2">{trx.supplierName}</td>
          </tr>
          <tr>
            <td className="px-4 py-2 font-bold">Amount</td>
            <td className="px-4 py-2">
              <NumericFormat 
                value={trx.totalAmount.toFixed(2)} 
                displayType={'text'} 
                thousandSeparator={true} 
                suffix={' €'}
              />
            </td>
          </tr>
          <tr>
            <td className="px-4 py-2 font-bold">Blockchain Tx</td>
            <td className="px-4 py-2 underline">
              <Link href={"https://solscan.io/tx/" + trx.blockchainTxId + "?cluster=devnet"}>
                {trx.blockchainTxId.substring(0,22)}...
              </Link>
            </td>
          </tr>
          <tr>
            <td className="px-4 py-2 font-bold">Tokens</td>
            <td className="px-4 py-2">
              <NumericFormat 
                value={trx.tokens.toFixed(4)} 
                displayType={'text'} 
                thousandSeparator={true}
                suffix={' °B'}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};



export default function Transaction({ hash } : {hash:any}) {

    const item: DashboardTransactionItem = {
      hash: 'hash#',
      imageUrl: '',
      blockchainTxId: '',
      tokens: 0,
      totalAmount: 0,
      receiptDate: new Date(),
      supplierName: 'None'
    }
    const [dashboardTransactions, setDashboardTransactions] = useState<DashboardTransactionItem>(item);

    useEffect(() => {
      fetch('https://bonny-backend-xztrxgvneq-ey.a.run.app/admin/transactions')
        .then((res) => {
          console.log(res);
          return res.json();
        })
        .then((data) => {
          console.log(data);
          if(data.transactions != null) {
            const trx = data.transactions.find((trx:any) => trx.hash == hash)
            setDashboardTransactions(trx);
          }
        });
    }, []);
  
    return (
      <div className="flex justify-center bg-gray-100">
        <TransactionCard trx={dashboardTransactions!} />
      </div>
    );
  }
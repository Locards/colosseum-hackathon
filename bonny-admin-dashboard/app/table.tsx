import {
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Text
} from '@tremor/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { NumericFormat } from 'react-number-format';

export interface DashboardTransactionItem {
  imageUrl: string;
  supplierName: string;
  totalAmount: number;
  receiptDate: Date;
  hash: string;
  tokens: number;
  blockchainTxId: string; 
}



export default function DashboardTransactionsTable() {
  const [dashboardTransactions, setDashboardTransactions] = useState<DashboardTransactionItem[]>([]);

  useEffect(() => {
    fetch('https://bonny-backend-xztrxgvneq-ey.a.run.app/admin/transactions')
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        console.log(data);
        if(data.transactions != null) {
          setDashboardTransactions(data.transactions);
        }
      });
  }, []);

  

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Date</TableHeaderCell>
          <TableHeaderCell>Supplier</TableHeaderCell>
          <TableHeaderCell>Total Amount</TableHeaderCell>
          <TableHeaderCell>Tokens</TableHeaderCell>
          <TableHeaderCell>Blockchain Transaction</TableHeaderCell>
          <TableHeaderCell>Receipt Hash</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {dashboardTransactions.map((dashboardTx) => (
          <TableRow key={dashboardTx.imageUrl}>
            <TableCell>
              <Text>{dayjs(dashboardTx.receiptDate).format("DD.MM.YYYY")}</Text>
            </TableCell>
            <TableCell>
              <Text>{dashboardTx.supplierName}</Text>
            </TableCell>
            <TableCell>
              <NumericFormat value={dashboardTx.totalAmount.toFixed(2)} displayType={'text'} suffix={' €'} />
            </TableCell>
            <TableCell>
              <NumericFormat value={dashboardTx.tokens.toFixed(4)} displayType={'text'} suffix={' °B'} />
            </TableCell>
            <TableCell>
              <Link className='underline' href={"https://solscan.io/tx/" + dashboardTx.blockchainTxId + "?cluster=devnet"}>{dashboardTx.blockchainTxId.substring(0, 22)}...</Link>
            </TableCell>
            <TableCell>
              <Text>{dashboardTx.hash}</Text>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

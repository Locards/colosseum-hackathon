import { Transaction } from "src/model/transaction/transaction.entity";
import { Receipt } from "src/model/receipt/receipt.entity";

export class DashboardTransactions {
    transactions: DashboardTransactionItem[];

    constructor(transactions: DashboardTransactionItem[]) {
        this.transactions = transactions;
    }
}

export class DashboardTransactionItem {

  imageUrl: string;
  supplierName: string;
  totalAmount: number;
  receiptDate: Date;
  hash: string;
  tokens: number;
  blockchainTxId: string;

  constructor(transaction: Transaction) {
    const receipt: Receipt = transaction.receipt;
    this.imageUrl = receipt.storageUrl;
    this.supplierName = receipt.supplierName;
    this.totalAmount = receipt.totalAmount;
    this.receiptDate = receipt.receiptDate;
    this.hash = receipt.hash;
    this.tokens = transaction.tokens;
    this.blockchainTxId = transaction.blockchainTxId;
  }
  
}

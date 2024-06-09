import { Injectable } from '@nestjs/common';
import { TransactionService } from 'src/model/transaction/transaction.service';
import { DashboardTransactionItem, DashboardTransactions } from './dashboard.entity'

@Injectable()
export class AdminService {

    constructor(
        private transactionService: TransactionService
        ) {}

    async loadDashboardTransactions() {
        const transactions = this.transactionService.getAll();        
        const dashboardTrxItems = (await transactions).filter(tx => tx.receipt).map(trx => new DashboardTransactionItem(trx));
        return new DashboardTransactions(dashboardTrxItems);
    }
}

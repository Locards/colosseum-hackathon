import { Receipt } from "./Receipt"

export interface Transaction {
    type: string,
    status: TransactionStatus,
    tokens: number,
    receipt: Receipt
}

export type TransactionStatus = "confirmed" | "pending" | "evaluating"
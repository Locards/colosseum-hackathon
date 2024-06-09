import { Receipt } from "./Receipt"

export interface Transaction {
    type: string,
    status: TransactionStatus,
    tokens: number,
    receipt: Receipt,
    questStatus: any,
    timestamp: string
}

export type TransactionStatus = "confirmed" | "pending" | "evaluating"
import { Transaction } from "./Transaction";

export interface History {
    timestamp: string,
    transactions: Transaction[]
}
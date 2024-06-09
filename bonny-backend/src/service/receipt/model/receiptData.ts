export interface ReceiptData {
    userId: string,
    entities: any,
    couponKey: string
    status: "successful" | "failed"
}
export interface SpecialOffer {
    id: number,
    title: string,
    description: string,
    imageUrl: string,
    externalUrl: string,
    type: "link" | "quest" | "display"
}
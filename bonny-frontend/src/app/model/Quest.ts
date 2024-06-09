import { Reclaim } from "./Reclaim";
import { Survey } from "./Survey";

export interface Quest {
    id: number;
    title: string;
    description: string;
    type: string;
    imageUrl: string;
    survey?: Survey;
    reclaim?: Reclaim;
    externalUrl: string;
}
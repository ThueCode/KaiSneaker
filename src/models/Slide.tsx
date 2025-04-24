import { UUID } from "crypto";

export interface Slide {
    slideId: UUID,
    imageUrl: string,
    description: string,
    order: number
}
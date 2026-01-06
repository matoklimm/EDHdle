export interface Card {
    id: number,
    name: string,
    cmc: number,
    colors: string[],
    types: string[],
    subtypes: string[],
    keywords: string[],
    tags: string[],
    imageUrl: string
}
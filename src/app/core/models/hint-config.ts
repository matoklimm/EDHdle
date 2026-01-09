export type HintLevel = 3 | 5 | 7;

export interface HintConfig {
    level: HintLevel;
    type: 'cmc' | 'colors' | 'oracle' | 'artwork' | 'custom';
}
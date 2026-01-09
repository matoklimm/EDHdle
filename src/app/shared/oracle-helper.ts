export function stripCardNameFromOracle(
    oracleText: string,
    cardName: string
): string {
    if (!oracleText || !cardName) return oracleText;

    let result = oracleText;

    const beforeComma = escapeRegExp(cardName.split(',')[0].trim());
    const firstWord = escapeRegExp(
        cardName.split(',')[0].trim().split(' ')[0]
    );

    const patterns = [
        `\\b${escapeRegExp(cardName)}\\b`,
        `\\b${beforeComma}\\b`,
        `\\b${firstWord}\\b`,
        `\\b${firstWord}'s\\b`,
        `\\b(named|name is)\\s+${firstWord}\\b`,
    ];

    for (const p of patterns) {
        result = result.replace(
            new RegExp(p, 'gi'),
            '[SEARCHED_CARD]'
        );
    }

    return result
        .replace(/\s{2,}/g, ' ')
        .replace(/\s+([.,;:])/g, '$1')
        .trim();
}

function escapeRegExp(str: string): string {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
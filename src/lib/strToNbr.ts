export function strToNbr(string: string): number {
    string.replace(",", ".");

    return Number(string);
}

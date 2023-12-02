export function strToNbr(string: string): number | undefined {
    const number = Number(string.replace(",", "."));

    if (!isNaN(number)) {
        return number;
    }
}

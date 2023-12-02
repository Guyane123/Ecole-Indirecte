export function addDays(date: Date, days: number) {
    var result = new Date(date);

    if (
        result.getDate() + days <=
        new Date(result.getFullYear(), result.getMonth(), 0).getDate()
    ) {
        result.setDate(result.getDate() + days);
        return result;
    } else {
        result.setMonth(result.getMonth());
        result.setDate(result.getDate() + days);
        return result;
    }
}
export function formatDate(date: Date) {
    return `${date.getFullYear()}-${formatMonth(date)}-${formatDay(date)}`;
}

export function formatDay(date: Date) {
    const formattedDay = format2Digits(String(date.getDate()));

    return formattedDay;
}
export function formatMonth(date: Date) {
    const formattedMonth =
        String(date.getMonth() + 1).length == 1
            ? `0${date.getMonth() + 1}`
            : date.getMonth() + 1;

    return formattedMonth;
}

export function formatMinutes(date: Date) {
    const formattedMinutes = format2Digits(String(date.getMinutes()));

    return formattedMinutes;
}

export function formatHours(date: Date) {
    const formattedHours = format2Digits(String(date.getHours()));

    return formattedHours;
}

export function format2Digits(string: string) {
    const formatted2Digits = string.length == 1 ? `0${string}` : string;

    return formatted2Digits;
}

export function startOfDay(date: Date | string) {
    let startday = date;
    if (startday.toString() == "Invalid Date !") {
        startday = new Date(startday);
    }

    startday = new Date(new Date(startday).setHours(0, 0, 0, 0));

    return startday;
}

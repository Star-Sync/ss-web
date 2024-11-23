export const formatToISOStringIgnoringTimezone = (date: Date | undefined): string | undefined => {
    if (!date) return undefined;
    return new Date(
        Date.UTC(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
            date.getHours(),
            date.getMinutes(),
            date.getSeconds(),
            date.getMilliseconds()
        )
    ).toISOString().slice(0, -5);
};
/*
    This function receives a Date object and returns a string in ISO format,
    while ignoring the timezone, to prevent unwanted offset changes.
    If the Date object is undefined, it returns undefined.
 */
export const formatToISOString = (date: Date | undefined): string | undefined => {
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
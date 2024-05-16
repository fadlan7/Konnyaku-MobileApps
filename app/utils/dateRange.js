export function dateRange(date1, date2) {
    const startDate = new Date(date1);
    const endDate = new Date(date2);

    const range = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;

    return range;
}

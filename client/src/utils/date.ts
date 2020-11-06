import moment, { Moment } from 'moment';

export const format = (date: Date) => {
    return moment(date).format('LLL');
}

export const getMonths = () => {
    const current = moment();
    return Array.from(Array(12).keys()).map((month) => {
        const item = {
            key: month,
            value: formatMonth(current)
        };
        current.add(1, 'month');
        return item;
    });
}

export const formatMonth = (date: Moment) => {
    return `${date.format('MMMM')} - ${date.year()}`
}

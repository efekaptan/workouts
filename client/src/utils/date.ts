import moment from 'moment';

export const format = (date: Date) => {
    return moment(date).format('LLL');
}

export const getMonths = () => {
    const monthList = [];
    const current = moment(new Date());
    for (let i = 0; i < 12; i++) {
        monthList.push({
            key: i,
            value: `${current.format('MMMM')} - ${current.year()}`
        });
        current.add(1, 'month');
    }
    return monthList;
}
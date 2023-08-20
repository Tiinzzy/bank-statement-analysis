import axios from "axios";
import { constants } from './constants';

const csv = require('csvtojson')
const context = '/backend';

export async function getDataFromPublic() {
    return axios(context + '/some-costs.csv').then(result => {
        if (result.status === 200) {
            return csv().fromString(result.data)
                .then((jCsv) => {
                    return jCsv;
                });
        } else {
            return null;
        }
    });
}

export function getColumns(row) {
    var defaultColumns = [];

    for (var c in row) {
        let col = { field: c, headerName: c.toUpperCase(), width: (c === 'DESC' ? 550 : 150) };
        if (col.field === 'AMOUNT') {
            col.type = 'number';
            col.align = 'right';
        }
        defaultColumns.push(col);
    }

    let columns = [];
    defaultColumns.forEach(c => {
        if (c.field === 'id') {
            columns.unshift(c);
        } else {
            columns.push(c);
        }
    });

    return columns;
}

export function getGridHeight() {
    let height = window.innerHeight - 220;
    if (height < 100) {
        height = 100;
    }
    return height;
}

export function getGridWidth() {
    let width = window.innerWidth - 40;
    if (width < 20) {
        width = 20;
    }
    return width;
}

export async function saveCsvFile(data) {
    return axios.post(context + '/save-csv-file', {}, { params: { data: data } })
        .then(response => {
            if (response.status === 200) {
                return response.data.success;
            } else {
                return false;
            }
        })
        .catch(error => {
            return false;
        });
}

export async function setNewCategory(query) {
    return axios.post(context + '/set-categories-for-csv-file', {}, { params: { query: query } })
        .then(response => {
            if (response.status === 200) {
                return response.data.success;
            } else {
                return false;
            }
        })
        .catch(error => {
            return false;
        });
}

export function stringWordsEqual(s1, s2, wordCount = 2) {
    let cleanS1 = s1.toLowerCase().split(' ').filter(e => e !== '');
    let cleanS2 = s2.toLowerCase().split(' ').filter(e => e !== '');

    if (cleanS1.length < wordCount || cleanS2.length < wordCount) {
        return false;
    }

    for (let i = 0; i < wordCount; i++) {
        if (cleanS1[i] !== cleanS2[i]) {
            return false;
        }
    }

    return true;
}

export async function getCsvFileFromBackend() {
    return axios.get(context + '/send-the-saved-csv-file', {}, { params: {} })
        .then(response => {
            if (response.status === 200) {
                return Object.values(response.data);
            } else {
                return false;
            }
        })
        .catch(error => {
            return false;
        });
}

export function getDailyAmount(data) {
    let dateSet = new Set(data.map(e => e.DATE));
    let dailyAmount = [...dateSet].map(e => { return { Date: e, AMOUNT: getDailyAmountSummary(data, e) } });
    return dailyAmount;
}

function getDailyAmountSummary(data, d) {
    let dateSummary = data.filter(e => e.DATE === d).map(e => e.AMOUNT * 1).reduce((a, b) => (a + b), 0);
    return dateSummary;
}

export function getWeekDaysAmount(data) {
    const nums = [0, 1, 2, 3, 4, 5, 6];
    return nums.map(wdId => { return { Date: constants.daysOfWeek[wdId], AMOUNT: getWeekDaySummary(data, wdId) } });
}

function getWeekDaySummary(data, wdId) {
    return data.filter(d => string2Date(d.DATE).getDay() === wdId).map(e => e.AMOUNT * 1).reduce((a, b) => (a + b), 0);
}

export function getDetailedtWeekDaysAmount(data) {
    let result = [0, 1, 2, 3, 4, 5, 6].map(d => getWeekDaysDetailedSummary(data, d));

    let title = [...constants.categories];
    title.shift()
    result.unshift(title);

    for (let i = 0; i < result.length; i++) {
        if (i === 0) {
            result[i].unshift('Day of weeks');
        } else {
            result[i].unshift(constants.daysOfWeek[i - 1]);
        }
    }

    return result;
}

function getWeekDaysDetailedSummary(data, d) {
    let dayOfWeekResult = [];
    constants.categories.filter(c => c !== 'All').forEach(c => {
        let sum = getDetailedAMount(data, d, c);
        dayOfWeekResult.push(sum);
    })
    return dayOfWeekResult;
}

function getDetailedAMount(data, day, category) {
    let result = data.filter(d => d.category === category && string2Date(d.DATE).getDay() === day).map(e => e.AMOUNT * 1).reduce((a, b) => (a + b), 0);
    return result;
}

function string2Date(dateStr) {
    let parts = dateStr.split('-');
    let d = new Date();
    d.setYear(parts[0] * 1);
    d.setMonth(parts[1] * 1 - 1);
    d.setDate(parts[2] * 1);
    d.setHours(0);
    d.setMinutes(0);
    d.setSeconds(0);
    return d;
}
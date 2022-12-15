import axios from "axios";

const csv = require('csvtojson')

export async function getDataFromPublic() {
    return axios('/some-costs.csv').then(result => {
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
    let height = window.innerHeight - 180;
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
    return axios.post('/save-csv-file', {}, { params: { data: data } })
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
    return axios.post('/set-categories-for-csv-file', {}, { params: { query: query } })
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
    return axios.get('/send-the-saved-csv-file', {}, { params: {} })
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
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
    console.log(data);
    console.log(1111111111);
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

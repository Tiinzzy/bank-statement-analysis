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
        let col = { field: c, headerName: c, width: (c === 'DESC' ? 600 : 200) };
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
import React from "react";

import { DataGrid } from '@mui/x-data-grid';

import { shared } from './shared';
import { getDataFromPublic, getColumns } from "./functions";

class ExpenceGrid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [],
            rows: []

        };
        this.callExpenceGrid = this.callExpenceGrid.bind(this);
        shared.callExpenceGrid = this.callExpenceGrid;
    }

    async componentDidMount() {
        let data = await getDataFromPublic();
        let columns = getColumns(data[0]);
     
        let id = 0;
        for (let r in data) {
            data[r].id = id;
            id += 1;
        }
        
        this.setState({ columns: columns, rows: data });

        shared.callBody({ data })
    }

    callExpenceGrid(message) {
        console.log(message);
        if (message.action === 'update-data') {
            console.log('now i have to update the whole grid data');
        } else if (message.action === 'filter-category') {
            console.log('now i have to just filter over the given category');
        }
    }


    render() {
        return (
            <div>
                <DataGrid
                    style={{ height: 700, width: '100%' }}
                    hideFooterPagination={true}
                    hideFooter={true}
                    rows={this.state.rows}
                    columns={this.state.columns} />
            </div>
        );
    }
}

export default ExpenceGrid;
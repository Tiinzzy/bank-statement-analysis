import React from "react";

import { DataGrid } from '@mui/x-data-grid';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";

import ChangeGridCategoryDialog from "./ChangeGridCategoryDialog";

import { shared } from './shared';
import { getColumns } from "./functions";

class ExpenceGrid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.data,
            columns: [],
            rows: [],
            openDialog: false,
            clickedRow: ''
        };
        this.callExpenceGrid = this.callExpenceGrid.bind(this);
        this.handleGridClick = this.handleGridClick.bind(this);
        this.handleCloseDialog = this.handleCloseDialog.bind(this);
        shared.callExpenceGrid = this.callExpenceGrid;
    }

    async componentDidMount() {
        let data = this.state.data;
        let columns = getColumns(data[0]);
        this.setState({ columns }, function () {
            this.refreshData(data);
        });
    }

    refreshData(data) {
        let id = 0;
        let category = 'None';
        for (let r in data) {
            data[r].id = id;
            id += 1;
            data[r].category = category;
        }

        this.setState({ rows: data });
    }

    callExpenceGrid(message) {
        if (message.action === 'show-less-than-100') {
            let data = this.state.data.filter(d => d.AMOUNT < 100)
            this.refreshData(data);
        }
    }

    handleGridClick(e) {
        this.setState({ openDialog: true, clickedRow: e.row });
    }

    handleCloseDialog() {
        this.setState({ openDialog: false })
    }


    render() {
        return (
            <div>
                <DataGrid
                    style={{ height: 700, width: '100%' }}
                    hideFooterPagination={true}
                    hideFooter={true}
                    rows={this.state.rows}
                    columns={this.state.columns}
                    onCellDoubleClick={(e) => this.handleGridClick(e)} />

                {this.state.openDialog && <Dialog
                    onClose={() => this.handleCloseDialog()}
                    open={this.state.openDialog}
                    maxWidth='sm' fullWidth={true}>
                    <DialogTitle>Details</DialogTitle>
                    <ChangeGridCategoryDialog clickedRow={this.state.clickedRow} close={this.handleCloseDialog} />
                </Dialog>}
            </div>
        );
    }
}

export default ExpenceGrid;
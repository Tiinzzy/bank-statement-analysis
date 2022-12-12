import React from "react";

import { DataGrid } from '@mui/x-data-grid';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";

import ChangeGridCategoryDialog from "./ChangeGridCategoryDialog";

import { shared } from './shared';
import { getDataFromPublic, getColumns } from "./functions";

class ExpenceGrid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
                    <ChangeGridCategoryDialog clickedRow={this.state.clickedRow} close={this.handleCloseDialog}/>
                </Dialog>}
            </div>
        );
    }
}

export default ExpenceGrid;
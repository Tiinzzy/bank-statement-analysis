import React from "react";

import { DataGrid } from '@mui/x-data-grid';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import Snackbar from '@mui/material/Snackbar';
import SnackbarContent from '@mui/material/SnackbarContent'

import ChangeGridCategoryDialog from "./ChangeGridCategoryDialog";

import { shared } from './shared';
import { getColumns, getGridHeight, getGridWidth } from "./functions";

class ExpenceGrid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.data,
            columns: [],
            rows: [],
            openDialog: false,
            clickedRow: '',
            height: getGridHeight(),
            width: getGridWidth(),
            openSnack: false
        };
        this.callExpenceGrid = this.callExpenceGrid.bind(this);
        this.handleGridClick = this.handleGridClick.bind(this);
        this.handleCloseDialog = this.handleCloseDialog.bind(this);
        this.handleScreenResize = this.handleScreenResize.bind(this);
        this.handleCloseSnack = this.handleCloseSnack.bind(this);
        shared.callExpenceGrid = this.callExpenceGrid;
    }

    async componentDidMount() {
        window.addEventListener("resize", this.handleScreenResize);
        let data = this.refreshData(this.state.data);
        let columns = getColumns(data[0]);
        this.setState({ columns });
    }

    handleScreenResize() {
        this.setState({ height: getGridHeight(), width: getGridWidth() });
    }

    refreshData(data) {
        let id = 1000;
        let category = 'None';
        for (let r in data) {
            data[r].id = id;
            id += 1;
            data[r].category = category;
        }
        this.setState({ rows: data });
        return data;
    }

    callExpenceGrid(message) {
        console.log(message)
        if (message.action === 'show-less-than-100') {
            let data = this.state.data.filter(d => d.AMOUNT < 100)
            this.refreshData(data);
        } else if (message.action === 'submit-sucessfull') {
            this.setState({ openSnack: true })
        }
    }

    handleGridClick(e) {
        this.setState({ openDialog: true, clickedRow: e.row });
    }

    handleCloseDialog() {
        this.setState({ openDialog: false })
    }

    handleCloseSnack() {
        this.setState({ openSnack: false, message: null });
    }

    render() {
        return (
            <div>
                <DataGrid
                    style={{ height: this.state.height, width: this.state.width }}
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

                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'center', }}
                    open={this.state.openSnack}
                    autoHideDuration={2000}
                    onClose={this.handleCloseSnack}>
                    <SnackbarContent style={{ backgroundColor: '#63A355', color: 'white', fontWeight: 'bold' }}
                        message={<div style={{ textAlign: 'center', width: 400 }}>Category Successfully Changed to {this.state.clickedRow.category}</div>} />
                </Snackbar>
            </div>
        );
    }
}

export default ExpenceGrid;
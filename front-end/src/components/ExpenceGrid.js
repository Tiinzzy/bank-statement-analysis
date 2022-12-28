import React from "react";

import { DataGrid } from '@mui/x-data-grid';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import Snackbar from '@mui/material/Snackbar';
import SnackbarContent from '@mui/material/SnackbarContent'

import ChangeGridCategoryDialog from "./ChangeGridCategoryDialog";

import { shared } from './shared';
import { getColumns, getGridHeight, getGridWidth } from "./functions";

import "./grid-style.css";

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
            openSnack: false,
            selectedCategory: 'All'
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
        this.setState({ rows: data });
        return data;
    }

    callExpenceGrid(message) {
        if (message.action === 'show-less-than-100') {
            let data = this.state.data.filter(d => d.AMOUNT < 100)
            this.refreshData(data);

        } else if (message.action === 'submit-sucessfull') {
            this.setState({ openSnack: true })

        } else if (message.action === 'new-uploaded-file-saved-successfuly') {
            var updatedData = Object.values(message.data);
            this.setState({ rows: this.refreshData(updatedData) })

        } else if (message.action === 'filter-over-category') {
            let rows = this.state.data.filter(e => message.category === 'All' || e.category === message.category);
            this.setState({ rows: rows, selectedCategory: message.category });

        } else if (message.action === 'refresh-data') {
            this.setState({ data: message.data, rows: message.data.filter(e => this.state.selectedCategory === 'All' || e.category === this.state.selectedCategory) });

        } else if (message.action === 'category-changed-to-new-one') {
            this.setState({ category: message.category })
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
                    sx={{ color: '#303030', bgcolor: '#f5f5f5'}}
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
                    <ChangeGridCategoryDialog clickedRow={this.state.clickedRow} close={this.handleCloseDialog} data={this.state.rows} />
                </Dialog>}

                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'center', }}
                    open={this.state.openSnack}
                    autoHideDuration={2000}
                    onClose={this.handleCloseSnack}>
                    <SnackbarContent style={{ backgroundColor: '#63A355', color: 'white', fontWeight: 'bold' }}
                        message={<div style={{ textAlign: 'center', width: 400 }}>Category Successfully Changed to {this.state.category}</div>} />
                </Snackbar>
            </div>
        );
    }
}

export default ExpenceGrid;
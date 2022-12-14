import React from "react";

import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import DialogActions from "@mui/material/DialogActions";

import { getColumns } from "./functions";

class UploadFileDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.data,
            columns: [],
            rows: [],
            close: props.close
        };
    }

    componentDidMount() {
        let data = this.refreshData(this.state.data);
        let columns = getColumns(data[0]);
        this.setState({ columns });
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

    save(e) {
        this.state.close();
    }

    cancelAndClose(e) {
        this.state.close();
    }

    render() {
        return (
            <Box>
                <DialogTitle>Would You Like to Save the Following Data?</DialogTitle>
                <Divider />
                <Box style={{ paddingTop: 10, paddingBottom: 10, paddingLeft: 10, paddingRight: 10 }}>
                    <DataGrid
                        style={{ height: 400, width: 1335 }}
                        hideFooterPagination={true}
                        hideFooter={true}
                        rows={this.state.rows}
                        columns={this.state.columns} />
                </Box>
                <Divider />
                <DialogActions>
                    <Button onClick={(e) => this.cancelAndClose(e)} variant="outlined" color="error"> Cancel </Button>
                    <Button onClick={(e) => this.save(e)} variant="outlined" color="success">Save</Button>
                </DialogActions>
            </Box >
        );
    }
}

export default UploadFileDialog;
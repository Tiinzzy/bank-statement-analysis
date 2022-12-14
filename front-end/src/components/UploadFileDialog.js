import React from "react";

import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import DialogActions from "@mui/material/DialogActions";
import Typography from "@mui/material/Typography";

import { getColumns, saveCsvFile } from "./functions";
import { shared } from "./shared";

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
        let data = this.refreshData(Object.values(this.state.data));
        let columns = getColumns(data[0]);
        this.setState({ columns });
        console.log(this.state.data)
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

    async save() {
        let storedSuccessfully = await saveCsvFile(this.state.data);
        this.state.close();
        shared.callBody({ action: storedSuccessfully ? 'new-uploaded-file-saved' : 'problem-uploading-data' })
    }

    cancelAndClose(e) {
        this.state.close();
    }

    render() {
        return (
            <Box>
                {this.state.rows.length > 100 ? <DialogTitle>Can't Save the selected CSV file!</DialogTitle>
                    : <DialogTitle>Would You Like to Save the Following Data?</DialogTitle>}
                <Divider />
                <Box style={{ paddingTop: 10, paddingBottom: 10, paddingLeft: 25, paddingRight: 10 }}>
                    {this.state.rows.length > 100 ?
                        <Box p={2}>
                            <Typography variant="body1" component="div" style={{ lineHeight: '160%' }}>
                                Number of rows of the file  you have uploaded is <span style={{ color: "red" }}> {this.state.rows.length}</span>.
                                <br />
                                PLease upload a file with less than 100 rows to be able to save it.
                            </Typography>
                        </Box> :
                        <DataGrid
                            style={{ height: 400, width: 1320 }}
                            hideFooterPagination={true}
                            hideFooter={true}
                            rows={this.state.rows}
                            columns={this.state.columns} />}
                </Box>

                {this.state.rows.length > 100 ? null :
                    <Box variant="body1" style={{ marginLeft: 25, marginTop: 10, marginBottom: 10 }}>
                        <Box> * Number of Rows in Uploaded Data: <span style={{ fontWeight: 'bold' }}>{this.state.rows.length}</span></Box>
                        <br />
                        <Box> * Saving the New File Will Remove any Pre-existing Data.</Box>
                    </Box>}

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
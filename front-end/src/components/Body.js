import React from "react";

import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";

import ExpenceGrid from "./ExpenceGrid";
import UploadFileDialog from "./UploadFileDialog";
import Snackbar from '@mui/material/Snackbar';
import SnackbarContent from '@mui/material/SnackbarContent'

import { shared } from './shared';
import { constants } from './constants';
import { getCsvFileFromBackend } from "./functions";


class Body extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            openDialog: false,
            openSnack: false,
            showHelp: true
        };
        this.callBody = this.callBody.bind(this);
        this.handleCloseDialog = this.handleCloseDialog.bind(this);
        this.handleCloseSnack = this.handleCloseSnack.bind(this);
        shared.callBody = this.callBody;
    }

    async componentDidMount() {
        let data = await getCsvFileFromBackend();
        this.setState({ data });
        shared.callChartsAndFilters({ action: 'getting-data', data: data })
    }

    async callBody(message) {
        if (message.action === 'new-file-uploaded-successfully') {
            this.setState({ openDialog: true, newData: message.data })

        } else if (message.action === 'new-uploaded-file-saved') {
            this.setState({ openSnack: true })

        } else if (message.action === 'new-uploaded-file-saved-successfuly') {
            this.setState({ data: message.data }, function () {
                shared.callExpenceGrid({ action: 'refresh-data', data: message.data, showHelp: false });
            });

        } else if (message.action === 'read-data-again') {
            let data = await getCsvFileFromBackend();
            this.setState({ data: data }, function () {
                shared.callExpenceGrid({ action: 'refresh-data', data: data, showHelp: false });
            });
        }


    }

    handleCloseDialog() {
        this.setState({ openDialog: false })
    }

    handleCloseSnack() {
        this.setState({ openSnack: false, message: null });

    }
    render() {
        return (
            <Box style={{ padding: 15 }}>
                {this.state.data.length > 0 ?
                    <ExpenceGrid data={this.state.data} />
                    : <Box pb={10}>
                        <ol>
                            {constants.help.map((e, i) => (
                                <li key={i}>{e}</li>
                            ))}
                        </ol>
                    </Box>}

                {this.state.openDialog && <Dialog
                    onClose={() => this.handleCloseDialog()}
                    open={this.state.openDialog}
                    maxWidth='lg' fullWidth={true}>
                    <UploadFileDialog close={this.handleCloseDialog} data={this.state.newData} />
                </Dialog>}

                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'center', }}
                    open={this.state.openSnack}
                    autoHideDuration={2000}
                    onClose={this.handleCloseSnack}>
                    <SnackbarContent style={{ backgroundColor: '#63A355', color: 'white', fontWeight: 'bold' }}
                        message={<div style={{ textAlign: 'center', width: 400 }}>New File Successfully Uploaded</div>} />
                </Snackbar>
            </Box>
        );
    }
}

export default Body;
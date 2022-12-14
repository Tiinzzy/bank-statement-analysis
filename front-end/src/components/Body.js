import React from "react";

import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";

import ExpenceGrid from "./ExpenceGrid";
import UploadFileDialog from "./UploadFileDialog";

import { shared } from './shared';
import { constants } from './constants';
import { getDataFromPublic } from "./functions";


class Body extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            openDialog: false
        };
        this.callBody = this.callBody.bind(this);
        this.handleCloseDialog = this.handleCloseDialog.bind(this);
        shared.callBody = this.callBody;
    }

    async componentDidMount() {
        let data = await getDataFromPublic();
        this.setState({ data });
    }

    callBody(message) {
        if (message.action === 'new-file-uploaded-successfully') {
            this.setState({ openDialog: true })
        }
        else {
            this.setState({ data: message.data })
        }
    }

    handleCloseDialog() {
        this.setState({ openDialog: false })
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
                    maxWidth='xl' fullWidth={true}>
                    <UploadFileDialog close={this.handleCloseDialog} data={this.state.data}/>
                </Dialog>}

            </Box>);
    }
}

export default Body;
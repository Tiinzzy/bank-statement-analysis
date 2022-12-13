import React from "react";

import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Divider from "@mui/material/Divider";
import DialogActions from "@mui/material/DialogActions";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

import { shared } from './shared';
import { constants } from './constants';

class ChangeGridCategoryDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clickedRow: props.clickedRow,
            close: props.close,
            checkBox: false,
            category: props.clickedRow.category
        };
        this.callGridDialog = this.callGridDialog.bind(this);
        this.cancelAndClose = this.cancelAndClose.bind(this);
        this.saveEditCategory = this.saveEditCategory.bind(this);
        this.handleCheckBox = this.handleCheckBox.bind(this);
        this.handleChangeCategory = this.handleChangeCategory.bind(this);
        shared.callGridDialog = this.callGridDialog;
    }
    componentDidMount() {
    }

    callGridDialog(message) {

    }

    cancelAndClose(e) {
        this.state.close(e);
    }

    saveEditCategory() {
        this.state.close();
        shared.callExpenceGrid({ action: 'submit-sucessfull' })

    }

    handleCheckBox(e) {
        this.setState({ checkBox: e.target.checked })
    }

    handleChangeCategory(e) {
        this.setState({ category: e.target.value });
    }

    render() {
        return (
            <>
                <Divider />
                <Box style={{ display: 'flex', flexDirection: 'column', margin: '20px 0 20px 30px', }}>
                    <Typography variant="body1">
                        <span className="GridDialogText">Id:</span> {this.state.clickedRow.id}
                    </Typography>

                    <Typography sx={{ mt: 1 }} variant="body1">  Date: {this.state.clickedRow.DATE}</Typography>

                    <Typography sx={{ mt: 1 }} variant="body1">  Description: {this.state.clickedRow.DESC}</Typography>

                    <Typography sx={{ mt: 1 }} variant="body1">  Amount: ${this.state.clickedRow.AMOUNT}</Typography>

                    <Box style={{ display: 'flex', alignItems: 'center', margin: '15px 0 10px 0' }}>
                        <Typography variant="body1"> Category:</Typography>
                        <Select
                            size='small'
                            style={{ width: 300, marginLeft: 10 }}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={this.state.category}
                            onChange={(e) => this.handleChangeCategory(e)}>
                            {constants.categories.map((e, i) => (<MenuItem key={i} value={e}>{e}</MenuItem>))}
                        </Select>
                    </Box>

                    <Box style={{ display: 'flex'}}>
                        <FormControlLabel
                            control={<Checkbox checked={this.state.checkBox} onChange={(e) => this.handleCheckBox(e)} />}
                            label={'Apply ' + this.state.category + ' category for similar descriptions?'} />
                    </Box>
                    <br />
                    <Divider />

                    <DialogActions style={{ marginTop: 20, marginRight: 20 }}>
                        <Button size='small' onClick={(e) => this.cancelAndClose(e)} variant="outlined" color="error"> Cancel </Button>
                        <Button size='small' disabled={this.state.category === 'None'} onClick={() => this.saveEditCategory()} variant="outlined" color="success">Update</Button>
                    </DialogActions>
                </Box>
            </>
        );
    }
}

export default ChangeGridCategoryDialog;
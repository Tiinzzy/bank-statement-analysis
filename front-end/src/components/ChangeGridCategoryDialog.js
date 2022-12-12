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
            close: props.close
        };
        this.callGridDialog = this.callGridDialog.bind(this);
        this.cancelAndClose = this.cancelAndClose.bind(this);
        this.saveEditCategory = this.saveEditCategory.bind(this);
        shared.callGridDialog = this.callGridDialog;
    }

    callGridDialog() {

    }

    cancelAndClose(e) {
        this.state.close(e);
    }

    saveEditCategory() {
        this.state.close();
    }

    render() {
        return (
            <>
                <Divider />
                <Box>
                    <Typography variant="body1">
                        <span className="GridDialogText">Id:</span> {this.state.clickedRow.id}
                    </Typography>

                    <Typography sx={{ mt: 1 }} variant="body1">  <span>Date:</span> {this.state.clickedRow.DATE}</Typography>

                    <Typography sx={{ mt: 1 }} variant="body1">  <span >Description:</span> {this.state.clickedRow.DESC}</Typography>

                    <Typography sx={{ mt: 1 }} variant="body1">  <span >Amount:</span>  ${(this.state.clickedRow.AMOUNT * 1).toFixed(2)}</Typography>

                    <Box >
                        <Typography variant="body1"> <span >Category:</span> </Typography>
                        <Select
                            size='small'
                            style={{ width: 300, marginLeft: 10 }}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={this.state.CATEGORY}
                            onChange={(e) => this.handleChangeCategory(e)}>
                            {constants.categories.map((e, i) => (<MenuItem key={i} value={e}>{e}</MenuItem>))}
                        </Select>
                    </Box>

                    <Box >
                        <FormControlLabel
                            control={<Checkbox checked={this.state.checkBox} onChange={(e) => this.handleCheckBox(e)} />}
                            label={'Apply ' + this.state.CATEGORY + ' category for similar descriptions?'} />
                    </Box>

                    <Divider />

                    <DialogActions style={{ marginTop: 20, marginRight: 20 }}>
                        <Button size='small' onClick={(e) => this.cancelAndClose(e)} variant="outlined" color="error"> Cancel </Button>
                        <Button size='small' disabled={this.state.CATEGORY === 'None'} onClick={() => this.saveEditCategory()} variant="outlined" color="success">Update</Button>
                    </DialogActions>
                </Box>
            </>
        );
    }
}

export default ChangeGridCategoryDialog;
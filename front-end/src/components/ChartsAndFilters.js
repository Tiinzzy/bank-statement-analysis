import React from "react";

import Box from "@mui/material/Box";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from "@mui/material/Divider";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import Popover from '@mui/material/Popover';

import GraphDialogDisplay from "./GraphDialogDisplay";

import { shared } from './shared';
import { constants } from './constants';
import { getDailyAmount, getWeekDaysAmount } from './functions';

const MAX_BAR_WIDTH = 800;

class ChartsAndFilters extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            toggleValue: 'All',
            data: null,
            distribution: null,
            openMenu: false,
            anchorEl: null,
            graphDialog: false,
            openPopover: false,
            popoverAnchorEl: null
        };
        this.callChartsAndFilters = this.callChartsAndFilters.bind(this);
        this.handleChangeToggle = this.handleChangeToggle.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleOpenCharts = this.handleOpenCharts.bind(this);
        this.handleCloseCharts = this.handleCloseCharts.bind(this);
        this.handleClosePopover = this.handleClosePopover.bind(this);
        shared.callChartsAndFilters = this.callChartsAndFilters;
    }

    componentDidMount() {

    }

    callChartsAndFilters(message) {
        if (message.action === 'getting-data') {
            this.setState({ data: message.data }, function () {
                let distribution = {};

                constants.categories.forEach(c => {
                    let count = this.state.data.filter(d => d.category === c).length;
                    let sum = this.state.data.filter(d => d.category === c).map(e => e.AMOUNT * 1).reduce((a, b) => a + b, 0)
                    distribution[c] = { sum, count };
                });

                distribution['All'] = {
                    sum: this.state.data.map(e => e.AMOUNT * 1).reduce((a, b) => a + b, 0),
                    count: this.state.data.length
                };

                this.setState({ distribution: null, data: message.data }, function () {
                    this.setState({ distribution: distribution, data: message.data });
                });

                let dailyAmountSummaryData = getDailyAmount(message.data);
                dailyAmountSummaryData = dailyAmountSummaryData.map(function (e) {
                    return Object.keys(e).map(g => e[g])
                });

                // let weeklySummaryData = getWeekDaysAmount(message.data);
                // console.log(weeklySummaryData);
                
                dailyAmountSummaryData.unshift(['DATE', 'AMOUNT']);

                this.setState({ dailyAmountSummaryData })
            })
        }
    }

    handleChangeToggle(e) {
        this.setState({ toggleValue: e.target.value })
        shared.callExpenceGrid({ action: 'filter-over-category', category: e.target.value })
    }

    handleClick(e) {
        this.setState({ toggleValue: e.target.value })
    }

    handleOpenCharts(e) {
        this.setState({ openMenu: true, anchorEl: e.target })
    }

    handleCloseCharts(index) {
        if (index === 1) {
            this.setState({ openMenu: false, graphIndex: 1, graphDialog: true });
        } else if (index === 2) {
            this.setState({ openMenu: false, graphIndex: 2, graphDialog: true });
        } else if (index === 3) {
            this.setState({ openMenu: false, graphIndex: 3, graphDialog: true });
        } else {
            this.setState({ openMenu: false, graphIndex: 0, graphDialog: false });
        }
    }

    handleClosePopover() {
        this.setState({ openPopover: false, popoverAnchorEl: null, rowsSum: this.state.data.map(e => e.AMOUNT * 1).reduce((a, b) => a + b, 0) })
    }

    render() {
        return (
            <Box style={{ display: 'flex' }}>
                <Box style={{ padding: 14, display: 'flex' }}>
                    <ToggleButtonGroup
                        size="small"
                        color="secondary"
                        value={this.state.toggleValue}
                        exclusive
                        onChange={(e) => this.handleChangeToggle(e)}
                        aria-label="Platform">
                        {this.state.distribution !== null && constants.categories.map((e, i) =>
                            <ToggleButton
                                onMouseEnter={(e) => this.setState({ openPopover: true, popoverAnchorEl: e.target })}
                                onMouseLeave={(e) => this.handleClosePopover()}
                                key={i} value={e}
                                onClick={(e) => this.handleClick(e)}>
                                {e + ' (' + this.state.distribution[e].count + ') '}
                            </ToggleButton>)}
                    </ToggleButtonGroup>
                </Box>
                <Box flexGrow={1} style={{ display: 'flex', justifyContent: 'right', padding: 11 }} >
                    <Button onClick={(e) => this.handleOpenCharts(e)} variant="contained">Charts</Button>
                    <Menu
                        size='small'
                        style={{ width: 200 }}
                        anchorEl={this.state.anchorEl}
                        open={this.state.openMenu}
                        value={1}
                        onClose={() => this.handleCloseCharts(0)}>
                        <Box style={{ padding: 4 }}>
                            <MenuItem onClick={() => this.handleCloseCharts(1)} >Daily Graph</MenuItem>
                            <Divider />
                            <MenuItem onClick={() => this.handleCloseCharts(2)}> Weekly Graph</MenuItem>
                            <Divider />
                            <MenuItem onClick={() => this.handleCloseCharts(3)}> Detailed Graph</MenuItem>
                        </Box>
                    </Menu>
                </Box>
                <Dialog
                    onClose={() => this.setState({ graphDialog: false })}
                    open={this.state.graphDialog} maxWidth='lg' fullWidth={true}>
                    <DialogTitle>Expenses Chart</DialogTitle>
                    <GraphDialogDisplay
                        graphIndex={this.state.graphIndex} data={this.state.dailyAmountSummaryData}/>
                </Dialog>

                <Popover
                    sx={{ pointerEvents: 'none', }}
                    open={this.state.openPopover}
                    anchorEl={this.state.popoverAnchorEl}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                    onClose={this.handleClosePopover}
                    disableRestoreFocus>
                    {this.state.popoverAnchorEl && <Box style={{ display: 'flex', flexDirection: 'column', paddingTop: 15, paddingLeft: 10, paddingRight: 10 }}>
                        {constants.categories.filter(e => e !== 'All').map((e, i) =>
                            <Box key={i} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', fontSize: '75%', marginBottom: '10px', borderBottom: 'solid 1px #eaeaea' }}>
                                <Box display='flex'>
                                    <Box> {e} </Box>
                                    <Box flexGrow={1} />
                                    <Box>{'$ ' + this.state.distribution[e].sum.toFixed(2)} </Box>
                                </Box>
                                <Box style={{
                                    width: ((this.state.distribution[e].sum * 1) / (this.state.rowsSum) * MAX_BAR_WIDTH),
                                    border: 'solid 2px ' + (e === this.state.popoverAnchorEl.value ? 'darkred' : 'steelblue')
                                }}></Box>
                            </Box>)}
                    </Box>}
                </Popover>
            </Box>
        );
    }
}

export default ChartsAndFilters;

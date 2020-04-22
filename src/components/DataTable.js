import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import ExportIcon from '@material-ui/icons/ImportExport';
import ToolTip from '@material-ui/core/Tooltip';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(3),
        overflowX: 'auto',
        height: 500
    },
    table: {
        minWidth: 650,
    },
}));

// this function checks the debt objects description
// field to see if it matches the search/filter string
// via a greedy regular exression. returns a bool for the filter
const filterStr = (obj, str) => {
    const { desc } = obj;
    let pattern = new RegExp(str, 'ig');
    
    if ( desc.match(pattern) ) {
        obj.filtered = true;
        return obj.filtered;
    }
    obj.filtered = false;
    return obj.filtered;
}

export default ({ debts, itemSelected, search }) => {
    const classes = useStyles();

    const exportList = (debts) => {
        const items = debts.filter(debt => debt.filtered);
        itemSelected(items);
    }

    return (
        <Grid container>
            
            <Grid container justify="space-between">
                <Typography variant="h4" style={{color: 'white'}}>Parsed Items: {debts.length}</Typography>
                <ToolTip title="Export List">
                    <Fab color="primary" aria-label="add" size="small" style={{float: "right"}}>
                        <ExportIcon onClick={() => exportList(debts)}/>
                    </Fab>
                </ToolTip>
            </Grid>
            
            <Paper className={classes.root}>
                <Table stickyHeader className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell align="right">Type</TableCell>
                            <TableCell align="right">Description</TableCell>
                            <TableCell align="right">Amount</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            debts.filter(debt => filterStr(debt, search) )
                                .map((debt, i) => (
                                    <TableRow hover key={i} onClick={() => itemSelected([debt])}>
                                        <TableCell component="th" scope="row">
                                            {debt.date}
                                        </TableCell>
                                        <TableCell align="right">{debt.type}</TableCell>
                                        <TableCell align="right">{debt.desc}</TableCell>
                                        <TableCell align="right">{debt.amount}</TableCell>
                                    </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </Paper>
        </Grid>
    );
}

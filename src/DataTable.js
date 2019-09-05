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

// const handleClick = (debt) => {
//     console.log("Clicked:",debt);
//     //close();
// }

export default ({debts, close}) => {
    const classes = useStyles();
    return (
        <Grid container>
            <Typography variant="h4" style={{color: 'white'}}>Parsed Items: {debts.length}</Typography>
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
                        {debts.map( (debt, i) => (
                            <TableRow hover key={i} onClick={() => close(debt)}>
                                <TableCell component="th" scope="row">
                                    {debt.date}
                                </TableCell>
                                <TableCell align="right">{debt.type}</TableCell>
                                <TableCell align="right">{debt.desc}</TableCell>
                                <TableCell align="right">{debt.amount}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        </Grid>
    );
}

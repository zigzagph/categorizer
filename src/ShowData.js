import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableHead from '@material-ui/core/TableHead';
// import TableRow from '@material-ui/core/TableRow';
// import Paper from '@material-ui/core/Paper';
import { Grid } from '@material-ui/core';
import DataTable from './DataTable';
import DataHeader from './DataHeader';
import { ToastContainer, toast } from 'react-toastify';

const useStyles = makeStyles(theme => ({
    root: {
        // width: '100%',
        // marginTop: theme.spacing(3),
        // overflowX: 'auto',
    },
    // table: {
    //     minWidth: 650,
    // },
}));

export default ({docObj}) => {
    const classes = useStyles();
    
    toast.success('Successfully parsed...')

    return (
        <Grid container className={classes.root}>
            <ToastContainer />
            <DataHeader docObj={docObj}/>
            <DataTable debts={docObj.debts} />
        </Grid>
        
        /* <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell align="right">Type</TableCell>
                        <TableCell align="right">Description</TableCell>
                        <TableCell align="right">Amount</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {docObj.debts.map( (debt, i) => (
                        <TableRow key={i}>
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
        </Paper> */
    );
}

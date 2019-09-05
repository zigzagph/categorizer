import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import DataTable from './DataTable';
import DataHeader from './DataHeader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useStyles = makeStyles(theme => ({
    root: {
        //backgroundColor: "red",
    },
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
    );
}

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import DataTable from './DataTable';
import DataHeader from './DataHeader';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import ItemDialog from './ItemDialog';

const useStyles = makeStyles(theme => ({
    root: {
        //backgroundColor: "red",
    },
}));

export default ({docObj}) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    
    //toast.success('Successfully parsed...')

    // open/close the dialog
    const setDialog = (debt) => {
        console.log("setDialog:", debt);
        setOpen(!open);
    }

    return (
        <Grid container className={classes.root}>
            {/* <ToastContainer /> */}
            <ItemDialog open={open} close={setDialog}/>
            <DataHeader docObj={docObj}/>
            <DataTable debts={docObj.debts} close={(obj) => setDialog(obj)} />
        </Grid>
    );
}

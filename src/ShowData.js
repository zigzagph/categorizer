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
    const [selected, setSelected] = React.useState({});
    
    //toast.success('Successfully parsed...')

    // open/close the dialog
    const setDialog = () => {
        //console.log("setDialog");
        // close the dialog
        setOpen(!open);
    }

    // handles table items that are selected
    const itemSelected = (debt) => {
        console.log("itemSelected:", debt);
        setOpen(!open);
        setSelected(debt);
    }

    // handles the ok from the item dialog
    const handleDeduction = (obj) => {
        console.log("handleDeduction:", obj);
        setDialog();
    }

    return (
        <Grid container className={classes.root}>
            {/* <ToastContainer /> */}
            <DataHeader docObj={docObj}/>
            <DataTable debts={docObj.debts} itemSelected={itemSelected} />
            <ItemDialog open={open} close={setDialog} selected={selected} handleDeduction={handleDeduction}/>
        </Grid>
    );
}

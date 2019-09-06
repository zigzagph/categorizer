import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import DataTable from './DataTable';
import DataHeader from './DataHeader';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import ItemDialog from './ItemDialog';
import Travel from './Travel';
import MandE from './MandE';
import Other from './Other';

const useStyles = makeStyles(theme => ({
    root: {
        //backgroundColor: "red",
    },
}));

export default ({docObj}) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [selected, setSelected] = React.useState({});
    const [travel, setTravel] = React.useState([]);
    const [other, setOther] = React.useState([]);
    const [mande, setMande] = React.useState([]);
    
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

        switch( obj.deduction ) {
            case 'other':
                console.log("Other");
                setOther([...other, obj]);
                break;
            case 'mande':
                console.log('Meals & Entertainment');
                setMande([...mande, obj]);
                break;
            case 'travel':
                setTravel([...travel, obj]);
                break;
            default:
                console.log("Unknown Deduction");
        }
    }

    return (
        <Grid container className={classes.root}>
            {/* <ToastContainer /> */}
            <DataHeader docObj={docObj}/>
            <DataTable debts={docObj.debts} itemSelected={itemSelected} />
            <ItemDialog open={open} close={setDialog} selected={selected} handleDeduction={handleDeduction}/>
            <Travel travel={travel}/>
            <MandE mande={mande}/>
            <Other other={other}/>
        </Grid>
    );
}

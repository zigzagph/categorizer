import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import DataTable from './DataTable';
import DataCard from './DataCard';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import ItemDialog from './ItemDialog';
import Travel from './summaries/Travel';
import MandE from './summaries/MandE';
import Other from './summaries/Other';

const useStyles = makeStyles(theme => ({
    root: {
        //backgroundColor: "red",
    },
}));

const testME = {
    comment: "Magazine",
    amount: "-9.26",
    date: '02/06/17',
    desc: 'CHECKCARD  0205 NEWS AND GIFTS PHI PHILADELPHIA PA 24224437037105010352431',
    type: 'debit'
}

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
        // console.log("itemSelected:", debt);
        setOpen(!open);
        setSelected(debt);
    }

    // handles the ok from the item dialog
    const handleDeduction = (obj) => {
        // console.log("handleDeduction:", obj);
        setDialog();

        // destructure to get the fields I need
        const { comment, item } = obj;
        // add comment to the item object
        const sumItem = {
            comment: comment,
            ...item
        }

        switch( obj.deduction ) {
            case 'other':
                setOther([...other, obj]);
                break;
            case 'mande':
                // setMande([...mande, obj]);
                setMande([...mande, sumItem]);
                break;
            case 'travel':
                setTravel([...travel, obj]);
                break;
            default:
                console.log("Unknown Deduction");
        }
    }

    // returns the statement period
    function period() {
        return docObj.startMonth + "-" + docObj.endMonth;
    }

    //console.log(docObj);

    return (
        <Grid container justify="center" className={classes.root}>
            {/* <ToastContainer /> */}
            <DataCard docObj={docObj}/>
            <DataTable debts={docObj.debts} itemSelected={itemSelected} />
            <ItemDialog open={open} close={setDialog} selected={selected} handleDeduction={handleDeduction}/>
            
            <Travel travel={travel}/>
            
            <Grid item xs={10}>
                <MandE period={() => period()} mande={mande}/>
            </Grid>
            
            <Other other={other}/>
        </Grid>
    );
}

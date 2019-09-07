import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import DataTable from './DataTable';
import DataCard from './DataCard';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import ItemDialog from './ItemDialog';
// import Travel from './summaries/Travel';
// import MandE from './summaries/MandE';
// import Other from './summaries/Other';
import Summary from './summaries/Summary';

const useStyles = makeStyles(theme => ({
    root: {
        //backgroundColor: "red",
        marginTop: 40
    },
}));

// const testME = {
//     comment: "Magazine",
//     amount: "-9.26",
//     date: '02/06/17',
//     desc: 'CHECKCARD  0205 NEWS AND GIFTS PHI PHILADELPHIA PA 24224437037105010352431',
//     type: 'debit'
// }

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
        let sumItem = {
            comment: comment,
            ...item
        };
        //console.log(comment, item);

        switch( obj.deduction ) {
            case 'other':
                // sumItem.type = "Other";
                setOther([...other, sumItem]);
                break;
            
            case 'mande':
                // sumItem.type = "Meals & Entertainment";
                setMande([...mande, sumItem]);
                break;
            
            case 'travel':
                // sumItem.type = "Travel";
                setTravel([...travel, sumItem]);
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
            <ItemDialog open={open} close={setDialog} selected={selected} handleDeduction={handleDeduction}/>
            <DataTable debts={docObj.debts} itemSelected={itemSelected} />
            <DataCard docObj={docObj}/>
            
            <Grid item xs={10}>
                <Summary period={() => period()} deductions={travel} title="Travel"/>
            </Grid>
            <Grid item xs={10}>
                <Summary period={() => period()} deductions={mande} title="Meals & Entertainment"/>
            </Grid>
            <Grid item xs={10}>
                <Summary period={() => period()} deductions={other} title="Other"/>
            </Grid>
        </Grid>
    );
}

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import DataTable from './DataTable';
import DataCard from './DataCard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ItemDialog from './ItemDialog';
import Summary from './summaries/Summary';
import Search from './SearchCard';
import Box from '@material-ui/core/Box';

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
    const [search, setSearch] = React.useState("");
    const { debts } = docObj;
    
    //toast.success('Successfully parsed...')

    // open/close the dialog
    const setDialog = () => {
        // close the dialog
        setOpen(!open);
    }

    // handles the table item that is selected
    const itemSelected = (debt) => {
        setOpen(!open);
        setSelected(debt);
    }

    // handles the ok from the item dialog
    const handleDeduction = (obj) => {
        setDialog();

        toast.success('Deduction added...');

        // destructure to get the fields I need
        const { comment, item } = obj;
        let sumItem = {
            comment: comment,
            ...item
        };

        switch( obj.deduction ) {
            case 'other':
                setOther([...other, sumItem]);
                break;
            
            case 'mande':
                setMande([...mande, sumItem]);
                break;
            
            case 'travel':
                setTravel([...travel, sumItem]);
                break;
            default:
                toast.error("Unknown Deduction");
        }
    }

    // returns the statement period
    function period() {
        return docObj.startMonth + "-" + docObj.endMonth;
    }

    return (
        <Grid container justify="center" className={classes.root}>
            <ToastContainer />
            <ItemDialog open={open} close={setDialog} selected={selected} handleDeduction={handleDeduction}/>
            
            {/* <DataTable debts={debts} itemSelected={itemSelected} search={search}/> */}
            <Box display="block" displayPrint="none">
                <DataTable 
                    debts={debts}
                    // debts={
                    //     debts.filter(d => {
                    //         //console.log( travel.indexOf(d) );
                    //         //console.log( other.indexOf(d) );
                    //         //console.log(d);

                    //         if ( mande.find(t => t.desc !== d.desc ) ) console.log("FOUND");


                    //         //console.log(mande);
                    //         //console.log( mande.indexOf(d.item) );
                    //         /* if ( travel.indexOf(d) ) {
                    //             console.log("Travel")
                    //         } */

                    //         /* if ( other.indexOf(d) ) {
                    //             console.log("Other")
                    //         } */

                    //         /* if ( mande.indexOf(d) ) {
                    //             console.log("Mande")
                    //         } */
                    //         return d;
                    //     })
                    // } 
                    itemSelected={itemSelected} 
                    search={search}
                />
            </Box>
            
            {/* Data and Search/Filter Cards */}
            <Box display="block" displayPrint="none">
                <Grid container item justify="space-around" direction="row">
                    <Grid item xs={6}>
                        <DataCard docObj={docObj}/>
                    </Grid>
                    <Grid item xs={6}>
                        <Search setSearch={(s) => setSearch(s)}/>    
                    </Grid>
                </Grid>
            </Box>
            
            {/* Summaries */}
            <Grid container justify="center">
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
        </Grid>
    );
}

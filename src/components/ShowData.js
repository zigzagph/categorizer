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

const useStyles = makeStyles(theme => ({
    root: {
        //backgroundColor: "red",
        marginTop: 40
    },
}));

export default ({docObj}) => {
    const classes = useStyles();

    // future : consolidate to a state object
    const [open, setOpen] = React.useState(false);
    const [selected, setSelected] = React.useState({});
    const [travel, setTravel] = React.useState([]);
    const [other, setOther] = React.useState([]);
    const [mande, setMande] = React.useState([]);
    const [search, setSearch] = React.useState("");
    const { debts } = docObj;

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

        toast.success('Deduction added...', {autoClose: 1500});

        // destructure to get the fields I need
        const { comment, item, adjustment, adjustmentComment } = obj;
        let sumItem = {
            comment: comment,
            adjustment: adjustment,
            adjustmentComment: adjustmentComment,
            ...item
        };

        // future : convert this to a reducer hook
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

    // Array of the current summaries
    const dSummaries = [
        {
            title: "Travel",
            deduction: travel
        },
        {
            title: "Meals & Entertainment",
            deduction: mande
        },
        {
            title: "Other",
            deduction: other
        }
    ]

    return (
        <Grid container justify="center" className={classes.root}>
            <ToastContainer />
            
            <ItemDialog open={open} close={setDialog} selected={selected} handleDeduction={handleDeduction}/>
            
            <DataTable 
                debts={debts}
                itemSelected={itemSelected} 
                search={search}
            />

            <Grid container item justify="space-around" direction="row">
                <Grid item xs={6}>
                    <DataCard docObj={docObj}/>
                </Grid>
                <Grid item xs={6}>
                    <Search setSearch={(s) => setSearch(s)}/>    
                </Grid>
            </Grid>

            <Grid container justify="center">
                {
                    dSummaries && dSummaries.map((d, i) => {
                        return (
                            <Grid key={i} item xs={10}>
                                <Summary period={() => period()} deductions={d.deduction} title={d.title}/>
                            </Grid>
                        )
                    })
                }
            </Grid>

        </Grid>
    );
}

import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import DeductionButtons from './DeductionButtons';
import Typography from '@material-ui/core/Typography';
import { Grid, TextField } from '@material-ui/core';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

// initial State
const initState = {
    comment: "",
    deduction: "mande",
    adjustment: "",
    adjustmentComment: ""
};

export default ({open, close, selected, handleDeduction}) => {
    const [{ comment, deduction, adjustment, adjustmentComment }, setState] = React.useState(initState);

    const resetState = () => {
        setState({ ...initState });
    }

    const handleOk = () => {
        handleDeduction({
            item: selected,
            comment: comment,
            deduction: deduction,
            adjustment: adjustment,
            adjustmentComment: adjustmentComment
        });

        resetState();
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setState( prevState => ({ ...prevState, [name]:value }) )
    }

    return (
        <div>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={close}
            >
                <DialogTitle>Select the appropriate deduction type below</DialogTitle>
                <DialogContent>
                    <Grid container spacing={3}>
                        <Grid container item justify="space-around">
                            <Typography variant="body2">
                                <strong>Date:</strong> {selected.date}
                            </Typography>
                            <Typography variant="body2">
                                <strong>Type:</strong> {selected.type}
                            </Typography>
                            <Typography variant="body2">
                                <strong>Amount:</strong> {selected.amount}
                            </Typography> 
                        </Grid>
                        <Grid container item justify="center">
                            <Typography variant="body2">
                                <strong>Description:</strong> {selected.desc}
                            </Typography> 
                        </Grid>
                        <DeductionButtons deduction={deduction} handleChange={handleChange}/>
                        <Grid container item justify="center" style={{padding: 0}}>
                            <TextField
                                label="Comment"
                                name="comment"
                                value={comment}
                                onChange={handleChange}
                                margin="normal"
                                variant="outlined"
                                multiline
                                fullWidth
                                autoFocus
                            />
                        </Grid>
                        <Grid container item justify="center">
                            <TextField
                                label="Adjustment"
                                name="adjustment"
                                value={adjustment}
                                onChange={handleChange}
                                margin="normal"
                                variant="outlined"
                                style={{marginRight: 20, width: 150}}
                            />
                            <TextField
                                label="Adjustment Comment"
                                name="adjustmentComment"
                                value={adjustmentComment}
                                onChange={handleChange}
                                margin="normal"
                                variant="outlined"
                                style={{marginRight: 20, width: 300}}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={close} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleOk} color="primary">
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

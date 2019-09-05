import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import DeductionButtons from './DeductionButtons';
import Typography from '@material-ui/core/Typography';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

export default ({open, close}) => {
    return (
        <div>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={close}
            >
                <DialogTitle>Select the appropriate deduciton type below</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        
                    </DialogContentText>
                    <DeductionButtons />
                </DialogContent>
                <DialogActions>
                    <Button onClick={close} color="primary">
                        Disagree
                    </Button>
                    <Button onClick={close} color="primary">
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

import React from 'react';
import Paper from '@material-ui/core/Paper';
import Heading from './Heading';
import Header from './Header';
import LineItem from './LineItem';
import Total from './Total';
import ReactToPrint from 'react-to-print';
import ToolTip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Box from '@material-ui/core/Box';

const styles = {
    paper: {
        padding: 30,
        margin: "10px 0px 40px 0px",
    }
}

class Deduction extends React.Component {
    render() {
        return (
            <Paper id="paper" style={styles.paper}>
                <Heading period={this.props.period} title={this.props.title} save={this.props.save}/>
                <Header />
                { this.props.deductions.map((item, i) => <LineItem item={item} key={i} removeItem={this.props.removeItem}/>) }
                <Total items={this.props.deductions}/>
            </Paper>
        )
    }
}

export default ({deductions, period, title, removeItem}) => {
    const componentRef = React.useRef();

    // Button used to trigger the react-to-print
    // of the summary component
    const saveBtn = () => {
        return (
            <Box display="block" textAlign="right" displayPrint="none">
                <ToolTip title="Save">
                    <Fab color="primary" size="medium" style={{}}>
                        <SaveAlt />
                    </Fab>
                </ToolTip>
            </Box>
        )
    }

    return (
        deductions.length > 0 ? 
            <>
                <ReactToPrint
                    trigger={saveBtn}
                    content={() => componentRef.current}
                />
                <Deduction deductions={deductions} period={period} title={title} ref={componentRef} removeItem={removeItem}/>
            </> 
        : 
            null 
    )
}

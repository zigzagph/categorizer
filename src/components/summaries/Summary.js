import React from 'react';
import Paper from '@material-ui/core/Paper';
import Heading from './Heading';
import Header from './Header';
import LineItem from './LineItem';
import Total from './Total';
// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';
// import html2pdf from 'html2pdf-fix-jspdf';
import ReactToPrint from 'react-to-print';
import ToolTip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Box from '@material-ui/core/Box';

const styles = {
    paper: {
        padding: 30,
        margin: "40px 0px 40px 0px",
    }
}

class Deduction extends React.Component {
    render() {
        return (
            <Paper id="paper" style={styles.paper}>
                <Heading period={this.props.period} title={this.props.title} save={this.props.save}/>
                <Header />
                { this.props.deductions.map((item, i) => <LineItem item={item} key={i}/>) }
                <Total items={this.props.deductions}/>
            </Paper>
        )
    }
}

export default ({deductions, period, title}) => {
    const componentRef = React.useRef();

    /* const Deduction = () => {

        const save = () => {
            console.log("save");
    
            // var element = document.getElementById('paper');
            // console.log(element);
            // html2pdf().from(element).save();

            var content = document.getElementById("paper");
            console.log(content);
            var pri = document.getElementById("stupid").contentWindow;
            pri.document.open();
            pri.document.write(content.innerHTML);
            pri.document.close();
            pri.focus();
            pri.print();
    
            html2canvas(document.querySelector('paper'))
                .then(canvas => {
                    document.body.appendChild(canvas);
                    
                    // //document.body.appendChild(canvas);
                    // const imgData = canvas.toDataURL('image/png');
    
                    // const pdf = new jsPDF();
                    // pdf.addImage(imgData, 'PNG', 0, 0);
                    // pdf.save("download.pdf"); 
                })
        }

        return (
            <div id="summary">
                <Paper id="paper" style={styles.paper}>
                    <Heading period={period} title={title} save={save}/>
                    <Header />
                    { deductions.map((item, i) => <LineItem item={item} key={i}/>) }
                    <Total items={deductions}/>
                </Paper>
            </div>
        )
    } */

    const save = () => {
        console.log("Save");
        /* return (
            <Box display="block" displayPrint="none">
                <ToolTip title="Save">
                    <Fab color="primary" size="medium" style={{}}>
                        <SaveAlt />
                    </Fab>
                </ToolTip>
            </Box>
        ) */
    }

    const saveBtn = () => {
        return (
            <Box display="block" displayPrint="none">
                <ToolTip title="Save">
                    <Fab color="primary" size="medium" style={{}}>
                        <SaveAlt />
                    </Fab>
                </ToolTip>
            </Box>
        )
    }

    return <div>{ deductions.length > 0 ? 
        <div>
            <ReactToPrint
                // trigger={() => <button>Print this out!</button>}
                trigger={saveBtn}
                content={() => componentRef.current}
            />
            <Deduction deductions={deductions} period={period} title={title} ref={componentRef} save={save}/>
        </div> 
    : null }</div>
}

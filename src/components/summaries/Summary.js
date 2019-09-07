import React from 'react';
import Paper from '@material-ui/core/Paper';
import Heading from './Heading';
import Header from './Header';
import LineItem from './LineItem';
import Total from './Total';

const styles = {
    paper: {
        padding: 30,
        margin: "40px 0px 40px 0px",
    }
}

export default ({deductions, period, title}) => {
    const Deduction = () => {
        return (
            <Paper style={styles.paper}>
                <Heading period={period} title={title}/>
                <Header />
                { deductions.map((item, i) => <LineItem item={item} key={i}/>) }
                <Total items={deductions}/>
            </Paper>
        )
    }
    return <div>{ deductions.length > 0 ? <Deduction/> : null }</div>
}

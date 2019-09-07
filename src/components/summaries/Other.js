import React from 'react';
import Paper from '@material-ui/core/Paper';
import Heading from './Heading';
import Header from './Header';
import LineItem from './LineItem';

const styles = {
    paper: {
        padding: 30,
        margin: "40px 0px 40px 0px",
    }
}

export default ({other, period}) => {
    const Deduction = () => {
        return (
            <Paper style={styles.paper}>
                <Heading period={period} title="Other"/>
                <Header />
                { other.map((item, i) => <LineItem item={item} key={i}/>) }
            </Paper>
        )
    }
    return <div>{ other.length > 0 ? <Deduction/> : null }</div>
}

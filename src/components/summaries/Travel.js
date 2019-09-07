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

export default ({travel, period}) => {
    const Deduction = () => {
        return (
            <Paper style={styles.paper}>
                <Heading period={period} title="Travel"/>
                <Header />
                { travel.map((item, i) => <LineItem item={item} key={i}/>) }
            </Paper>
        )
    }
    return <div>{ travel.length > 0 ? <Deduction/> : null }</div>
}
